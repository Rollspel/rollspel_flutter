import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../modules/theme';
import GameMiddleMessage from '../components/GameMiddleMessage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GameBoard from '../components/GameBoard';
import GameMenu from '../components/GameMenu';
import GameTimer from '../components/GameTimer';


const board = 
[
    [1, 0, 0],
    [1, 1, 0],
    [0, 2, 0],
]

const GameScreen = (props) => {
    const [beginTimer, setBeginTimer] = React.useState(10);
    const [beginTimerActive, setBeginTimerActive] = React.useState(true);
    const [gameTimerActive, setGameTimerActive] = React.useState(false);

    const [turnMessage, setTurnMessage] = React.useState(false);
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    React.useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    });

    React.useEffect(() => {
        let interval = null;
        if (beginTimerActive) {
            if(beginTimer <= 0){
                setBeginTimerActive(false);
                clearInterval(interval);   
                setTurnMessage(true);   
                setTimeout(() => {
                    setTurnMessage(false);
                    setGameTimerActive(true);
                }, 2000);    
            }
            interval = setInterval(() => {  
                setBeginTimer(beginTimer => beginTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
      }, [beginTimerActive, beginTimer, turnMessage]);

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
            {turnMessage && <GameMiddleMessage text={`${beginTimer}, it's your turn !`} animation='slideInUp'/>}
            <View style={styles.menu}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.settings} onPress={handleMenuPress}>
                        <MaterialCommunityIcons name="settings" size={30} color={theme.color.white}  />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.gameScore}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.playerName}>Tristan </Text>
                        <Text style={styles.playerScore}>2</Text>
                    </View>
                    <View>
                        <Text style={styles.playerName}>Paul</Text>
                        <Text style={styles.playerScore}>0</Text>
                    </View>
                </View>
            </View>
            {beginTimer === 0 && <GameBoard board={board}/>}
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

export default GameScreen;
  