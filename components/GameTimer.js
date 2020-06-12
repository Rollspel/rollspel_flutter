import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import theme from '../modules/theme';

const GameTimer = ({isActive}) => {
  const [gameTimerSeconds, setGameTimerSeconds] = React.useState(0);
  const [gameTimerMinutes, setGameTimerMinutes] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (gameTimerSeconds === 59) {
          setGameTimerSeconds(0);
          setGameTimerMinutes(
            (prevGameTimerMinutes) => prevGameTimerMinutes + 1,
          );
        } else {
          setGameTimerSeconds(
            (prevGameTimerSeconds) => prevGameTimerSeconds + 1,
          );
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, gameTimerSeconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {gameTimerMinutes < 10 ? '0' : ''}
        {gameTimerMinutes}:{gameTimerSeconds < 10 ? '0' : ''}
        {gameTimerSeconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 2 * theme.layout.paddingL,
    right: 2 * theme.layout.paddingL,
  },
  timer: {
    fontSize: 25,
  },
});

export default GameTimer;
