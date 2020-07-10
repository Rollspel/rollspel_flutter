import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../modules/theme';

const GameScore = ({players, activeScore}) => (
  <View style={styles.gameScore}>
    {players.map((player, index) => (
      <View style={styles.row} key={index}>
        <Text style={styles.playerName}>{player}</Text>
        <Text style={styles.playerScore}>{activeScore[index]}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  gameScore: {
    position: 'absolute',
    top: '50%',
    left: theme.layout.paddingL,
  },
  playerName: {
    width: 100,
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
    color: theme.color.textGray,
    textAlign: 'center',
  },
  playerScore: {
    width: 100,
    color: theme.color.gray,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default GameScore;
