import * as React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import theme from '../modules/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const GameBoard = ({board, socket, activePlayerIndex}) => {
  const handleCasePress = (rowIndex, columnIndex) => {
    board[rowIndex][columnIndex] = activePlayerIndex;
    socket.emit('player_tap', {gameboardID: '12345', board: board});
  };

  return (
    <Animatable.View style={styles.boardContainer} animation="fadeIn">
      {board.map((row, rowIndex) => (
        <View style={styles.boardGame}>
          {row.map((column, columnIndex) => {
            return (
              <TouchableOpacity
                style={styles.boardCase}
                onPress={() => handleCasePress(rowIndex, columnIndex)}>
                {column === 1 ? (
                  <MaterialCommunityIcons
                    name="power-off"
                    size={80}
                    color={theme.color.textGray}
                  />
                ) : column === 2 ? (
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
};

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
