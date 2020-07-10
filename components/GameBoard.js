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
    const updatedBoard = [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ];
    updatedBoard[rowIndex][columnIndex] = activePlayerIndex;
    socket.emit('player_tap', {gameboardID: '12345', board: updatedBoard});
  };

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
