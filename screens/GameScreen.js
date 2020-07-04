import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import theme from '../modules/theme';
import GameMiddleMessage from '../components/GameMiddleMessage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GameBoard from '../components/GameBoard';
import GameMenu from '../components/GameMenu';
import GameTimer from '../components/GameTimer';
import {withSocketContext} from '../components/SocketProvider';
import GameScore from '../components/GameScore';

const GameScreen = (props) => {
  const [beginTimer, setBeginTimer] = React.useState(5);
  const [beginTimerActive, setBeginTimerActive] = React.useState(true);
  const [gameTimerActive, setGameTimerActive] = React.useState(false);
  const [turnMessage, setTurnMessage] = React.useState(false);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [board, setBoard] = React.useState([]);
  const [activePlayerIndex, setActivePlayerIndex] = React.useState(0);
  const {socket} = props.socket;
  const {game, players} = props.route.params;
  const gameboardRef = React.useRef();

  React.useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
    );
    setActivePlayerIndex(Math.floor(Math.random() * game.players));
    setBoard(game.boardDefault);
  }, [game.players, game.boardDefault]);

  React.useEffect(() => {
    let interval = null;
    if (beginTimerActive) {
      if (beginTimer <= 0) {
        setBeginTimerActive(false);
        clearInterval(interval);
        setTurnMessage(`${players[activePlayerIndex]}, it's your turn !`);
        setTimeout(() => {
          setTurnMessage('');
          setGameTimerActive(true);
        }, 2000);
      }
      interval = setInterval(() => {
        setBeginTimer((prevBeginTimer) => prevBeginTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [beginTimerActive, beginTimer, turnMessage, players, activePlayerIndex]);

  React.useEffect(() => {
    socket.on('player_receive_new_board', (data) => {
      console.log(data);
      setBoard(data.board);
      if (handleResultValidation(data.board)) {
        setTurnMessage('');
        setTurnMessage(`${players[activePlayerIndex]} won the game !`);
        setTimeout(() => {
          socket.emit('send_player_win', {
            gameboardID: data.user.gameboardID,
            activePlayerIndex,
          });
          setBoard(game.boardDefault);
          setTurnMessage('');
        }, 3000);
      }
    });
  }, [activePlayerIndex, game.boardDefault, players, socket]);

  React.useEffect(() => {
    if (gameTimerActive) {
      if (activePlayerIndex < game.players - 1) {
        setActivePlayerIndex((prevIndex) => prevIndex + 1);
      } else {
        setActivePlayerIndex(0);
      }
      setTurnMessage(`${players[activePlayerIndex]}, it's your turn !`);
      setTimeout(() => {
        setTurnMessage('');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, gameTimerActive]);

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleExitPress = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    props.navigation.popToTop();
  };

  const winningConditions = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const handleResultValidation = (newBoard) => {
    console.warn(newBoard);
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = newBoard[winCondition[0][0]][winCondition[0][1]];
      let b = newBoard[winCondition[1][0]][winCondition[1][1]];
      let c = newBoard[winCondition[2][0]][winCondition[2][1]];
      if (a === 9 || b === 9 || c === 9) {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      return roundWon;
    }
  };

  return (
    <View style={styles.screen}>
      {beginTimer > 0 && (
        <GameMiddleMessage
          text={`Game will start in ${beginTimer}`}
          animation="fadeIn"
        />
      )}
      <GameMiddleMessage text={turnMessage} animation="slideInUp" />
      <View style={styles.menu}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.settings} onPress={handleMenuPress}>
            <MaterialCommunityIcons
              name="settings"
              size={30}
              color={theme.color.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <GameScore players={Object.values(players)} />
      {beginTimer === 0 && (
        <GameBoard
          ref={gameboardRef}
          board={board}
          socket={socket}
          activePlayerIndex={activePlayerIndex}
        />
      )}
      <GameMenu
        isVisible={isMenuVisible}
        closeMenu={() => setIsMenuVisible(false)}
        onExitPress={handleExitPress}
      />
      <GameTimer isActive={gameTimerActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    padding: 2 * theme.layout.paddingL,
    backgroundColor: theme.color.white,
  },
  row: {
    flexDirection: 'row',
  },
  menu: {
    zIndex: 5,
    flexDirection: 'column',
  },
  settings: {
    backgroundColor: theme.color.primary,
    padding: theme.layout.paddingS,
    borderRadius: theme.layout.radius,
    overflow: 'hidden',
  },
});

export default withSocketContext(GameScreen);
