import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../modules/theme';
import * as Animatable from 'react-native-animatable';


const GameMiddleMessage = ({text, animation}) => {
    return (
      <Animatable.View style={styles.container} animation={animation}>
        <Text style={styles.text}>{text}</Text>
      </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 3,
        position: 'absolute',
        top: '50%',
        right: 0,
        left: 0,
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
    }
});

export default GameMiddleMessage;
  