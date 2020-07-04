import * as React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import theme from '../modules/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const GameBoard = React.forwardRef((props, ref) => {
  const {board, activePlayerIndex, socket} = props;
  let view = React.useRef(View);

  React.useImperativeHandle(ref, () => ({
    bounceCase() {
      view.swing(500);
    },
  }));

  const handleCasePress = (rowIndex, columnIndex) => {
    if (board[rowIndex][columnIndex] === 9) {
      board[rowIndex][columnIndex] = activePlayerIndex;
      const result = handleResultValidation();
      if (result) {
        socket.emit('player_win', {
          gameboardID: '12345',
          activePlayerIndex: activePlayerIndex,
        });
      } else {
        socket.emit('player_tap', {gameboardID: '12345', board: board});
      }
    } else {
      socket.emit('player_tap_not_empty', {gameboardID: '12345'});
    }
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

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = board[winCondition[0][0]][winCondition[0][1]];
      let b = board[winCondition[1][0]][winCondition[1][1]];
      let c = board[winCondition[2][0]][winCondition[2][1]];
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
  }

  return (
    <Animatable.View
      style={styles.boardContainer}
      animation="fadeIn"
      ref={(refView) => (view = refView)}>
      {board.map((row, rowIndex) => (
        <View style={styles.boardGame} key={rowIndex}>
          {row.map((column, columnIndex) => {
            return (
              <TouchableOpacity
                key={columnIndex}
                style={styles.boardCase}
                onPress={() => handleCasePress(rowIndex, columnIndex)}>
                {column === 0 ? (
                  <MaterialCommunityIcons
                    name="power-off"
                    size={80}
                    color={theme.color.textGray}
                  />
                ) : column === 1 ? (
                  <MaterialCommunityIcons
                    name="close"
                    size={80}
                    color={theme.color.textGray}
                  />
                ) : undefined}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </Animatable.View>
  );
});

const styles = StyleSheet.create({
  boardContainer: {
    zIndex: 2,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: '10%',
  },
  boardGame: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boardCase: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 100,
    height: 100,
    borderWidth: 5,
    borderRadius: theme.layout.radius,
    borderColor: theme.color.primary,
  },
});

export default GameBoard;
