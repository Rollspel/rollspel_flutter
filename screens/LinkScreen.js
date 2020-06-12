import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import { Video } from 'expo-av';
import theme from '../modules/theme';
import Button from '../components/Button';
import {withSocketContext} from '../components/SocketProvider';

const {height} = Dimensions.get('window');
const backgroundVideo = require('../modules/images/background_intro.mp4');

const LinkScreen = (props) => {
  const {onSubmitPress} = props;
  const {socket} = props.socket;
  const [gameboardID, setGameboardID] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (socket) {
      socket.on('player_link_gameboard_success', () => {
        onSubmitPress(true);
      });
      socket.on('player_link_gameboard_fail', () => {
        setError('Wrong gameboard ID');
        setTimeout(() => setError(''), 2000);
      });
    }
  }, [socket, onSubmitPress]);

  const handleSubmitPress = () => {
    socket.emit('player_link_gameboard', gameboardID);
  };

  return (
    <View style={styles.container}>
      <Video
        source={backgroundVideo}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay={true}
        isLooping={true}
        style={styles.backgroundVideo}
      />
      <View style={styles.box}>
        <Text style={styles.title}>Enter your gameboard ID to continue</Text>
        <TextInput
          onChangeText={(value) => setGameboardID(value)}
          editable
          maxLength={40}
          style={styles.textInput}
        />
        {error ? <Text style={styles.textError}>{error}</Text> : null}
        <Button
          text="SUBMIT"
          color={theme.color.black}
          textColor={theme.color.white}
          onPress={handleSubmitPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  box: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: theme.layout.paddingL,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.color.white,
    marginBottom: theme.layout.paddingL,
  },
  textInput: {
    borderWidth: 1,
    color: theme.color.white,
    paddingHorizontal: theme.layout.paddingM,
    borderColor: theme.color.gray,
    borderRadius: theme.layout.radius,
    paddingVertical: theme.layout.paddingM,
  },
  textError: {
    paddingVertical: theme.layout.paddingS,
    color: theme.color.error,
  },
});

export default withSocketContext(LinkScreen);
