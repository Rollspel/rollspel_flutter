import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet, TextInput} from 'react-native';

import theme from '../modules/theme';
import Button from '../components/Button';
import {withSocketContext} from '../components/SocketProvider';

const background = require('../modules/images/background.jpg');

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
  }, [socket]);

  const handleSubmitPress = () => {
    socket.emit('player_link_gameboard', gameboardID);
  };

  return (
    <View>
      <ImageBackground source={background} style={styles.background}>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    position: 'relative',
  },
  box: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
    backgroundColor: theme.color.white,
    padding: theme.layout.paddingL,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: theme.layout.paddingL,
  },
  textInput: {
    borderWidth: 1,
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
