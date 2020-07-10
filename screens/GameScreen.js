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
  const {game, players} = props.route.params;
  const [turnMessage, setTurnMessage] = React.useState(false);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [board, setBoard] = React.useState(game.boardDefault);
  const [activePlayerIndex, setActivePlayerIndex] = React.useState(0);
  const [activeScore, setActiveScore] = React.useState([0, 0]);
  const {socket} = props.socket;
  const gameboardRef = React.useRef();

  React.useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
    );
    setActivePlayerIndex(Math.floor(Math.random() * game.players));
  }, [game.players]);

  React.useEffect(() => {
    setTurnMessage(`${players[activePlayerIndex]}, it's your turn !`);
    setTimeout(() => {
      setTurnMessage('');
    }, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlayerIndex]);

  React.useEffect(() => {
    socket.on('player_receive_new_board', (data) => {
      setBoard(data.board);
      if (handleResultValidation(data.board)) {
        let score = activeScore;
        score[activePlayerIndex] += 1;
        setActiveScore(score);
        socket.emit('send_player_win', {
          gameboardID: data.user.gameboardID,
          activePlayerIndex,
        });
        setBoard(game.boardDefault);
        setActivePlayerIndex(Math.floor(Math.random() * game.players));
      } else if (handleCheckDraw(data.board)) {
        socket.emit('send_player_draw', {
          gameboardID: data.user.gameboardID,
          activePlayerIndex,
        });
        setBoard(game.boardDefault);
        setActivePlayerIndex(Math.floor(Math.random() * game.players));
      } else {
        socket.off('player_receive_new_board');
        if (activePlayerIndex < game.players - 1) {
          setActivePlayerIndex((prevIndex) => prevIndex + 1);
        } else {
          setActivePlayerIndex(0);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, activePlayerIndex, game.players]);

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

  const handleCheckDraw = (newBoard) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === 9) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <View style={styles.screen}>
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
      <GameScore players={Object.values(players)} activeScore={activeScore} />
      <GameBoard
        ref={gameboardRef}
        board={board}
        socket={socket}
        activePlayerIndex={activePlayerIndex}
      />
      <GameMenu
        isVisible={isMenuVisible}
        closeMenu={() => setIsMenuVisible(false)}
        onExitPress={handleExitPress}
      />
      <GameTimer isActive={true} />
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
