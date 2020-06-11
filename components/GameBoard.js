import * as React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import theme from '../modules/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const GameBoard = ({ board }) => {
    return (
        <Animatable.View style={styles.boardContainer} animation="fadeIn">
        {board.map(row => (
            <View style={styles.boardGame}>
            {row.map(column => {
                return (
                    <View style={styles.boardCase}>
                        {column === 1 ? <MaterialCommunityIcons name="power-off" size={80} color={theme.color.textGray} />
                        : column === 2 ? <MaterialCommunityIcons name="close" size={80} color={theme.color.textGray} /> : undefined}
                    </View>
                )
            })}
            </View>
        ))}
        </Animatable.View>
    );
}

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
    }
});

export default GameBoard;
  