import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, Button, } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../modules/theme';
import GameMiddleMessage from '../components/GameMiddleMessage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GameBoard from '../components/GameBoard';
import GameMenu from '../components/GameMenu';
import GameTimer from '../components/GameTimer';
import { withSocketContext } from '../components/SocketProvider';
import GameScore from '../components/GameScore';
import { set } from 'react-native-reanimated';


const boardDefault = 
[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

const GameScreen = (props) => {
    const [beginTimer, setBeginTimer] = React.useState(10);
    const [beginTimerActive, setBeginTimerActive] = React.useState(true);
    const [gameTimerActive, setGameTimerActive] = React.useState(false);
    const [turnMessage, setTurnMessage] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);
    const [board, setBoard] = React.useState(boardDefault);
    const [activePlayerIndex, setActivePlayerIndex] = React.useState(0);
    const {socket} = props.socket;
    const { game, players } = props.route.params;


    React.useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        setActivePlayerIndex(Math.floor(Math.random() * game.players)); 
    }, []);

    React.useEffect(() => {
        let interval = null;
        if (beginTimerActive) {
            if(beginTimer <= 0){
                setBeginTimerActive(false);
                clearInterval(interval);   
                setTurnMessage(`${players[activePlayerIndex]}, it's your turn !`);   
                setTimeout(() => {
                    setTurnMessage('');
                    setGameTimerActive(true);
                }, 2000);   
            }
            interval = setInterval(() => {  
                setBeginTimer(beginTimer => beginTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
      }, [beginTimerActive, beginTimer, turnMessage]);

      React.useEffect(() => {
          console.warn('test');
        socket.on('player_receive_new_board', newBoard => {
            console.warn(activePlayerIndex);
            setBoard(newBoard);
            if(activePlayerIndex === game.players.length < -1){
                setActivePlayerIndex(0);
            } else {
                setActivePlayerIndex(prevIndex => prevIndex + 1);
            }
            setTurnMessage(`${players[activePlayerIndex]}, it's your turn !`);   
            setTimeout(() => {
                setTurnMessage('');
            });
        });
      }, [socket]);

    const handleMenuPress = () => {
        setIsMenuVisible(true);
    };

    const handleExitPress = () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
        props.navigation.popToTop()
    };

    return (
        <View style={styles.screen}>
            {beginTimer > 0 && <GameMiddleMessage text={`Game will start in ${beginTimer}`} animation='fadeIn' />}
            {turnMessage.length > 0 && <GameMiddleMessage text={turnMessage} animation='slideInUp'/>}
            <View style={styles.menu}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.settings} onPress={handleMenuPress}>
                        <MaterialCommunityIcons name="settings" size={30} color={theme.color.white}  />
                    </TouchableOpacity>
                </View>
            </View>
            <GameScore players={Object.values(players)} />
            {beginTimer === 0 && <GameBoard board={board} socket={socket} activePlayerIndex={activePlayerIndex} />}
            <GameMenu 
                isVisible={isMenuVisible} 
                closeMenu={() => setIsMenuVisible(false)}
                onExitPress={handleExitPress}
            />
            <GameTimer isActive={gameTimerActive} />

      </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        position: 'relative',
        padding: 2*theme.layout.paddingL,
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
  