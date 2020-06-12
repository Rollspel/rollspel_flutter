import * as React from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import theme from '../modules/theme';
import Button from '../components/Button';

const SelectPlayerScreen = (props) => {
  const {game} = props.route.params;
  const [players, setPlayers] = React.useState({});

  const handleLaunchGamePress = () => {
    if (Object.keys(players).length === game.players) {
      props.navigation.navigate('GameScreen', {game, players});
    }
  };

  const handleChangePlayer = (index, value) => {
    setPlayers({...players, [index]: value});
  };

  const background = require('../modules/images/background.jpg');
  const logo = require('../modules/images/logo_white.png');

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <Image source={logo} style={styles.logo} />
        <Image source={game.cover} style={styles.cover} />
        <ScrollView style={styles.content}>
          {[...Array(game.players)].map((player, index) => (
            <Animatable.View
              style={styles.playerContainer}
              animation="slideInDown"
              key={index}>
              <Text style={styles.playerTitle}>Player {index + 1}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => handleChangePlayer(index, value)}
              />
            </Animatable.View>
          ))}
        </ScrollView>
        <Button
          style={styles.button}
          color={theme.color.whiteDarker}
          text="LAUNCH"
          textColor={theme.color.black}
          onPress={handleLaunchGamePress}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.color.white,
    paddingBottom: theme.layout.paddingL,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
    paddingTop: 30,
  },
  cover: {
    alignSelf: 'center',
    width: '93%',
    borderRadius: theme.layout.radius,
    height: 350,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: theme.color.whiteDarker,
  },
  content: {
    paddingTop: theme.layout.paddingL,
    paddingHorizontal: theme.layout.paddingL,
    marginHorizontal: theme.layout.paddingL,
  },
  playerContainer: {
    marginBottom: theme.layout.paddingM,
  },
  playerTitle: {
    fontSize: 15,
    color: theme.color.whiteDarker,
    fontWeight: '600',
    paddingBottom: theme.layout.paddingS,
  },
  textInput: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: theme.layout.paddingM,
    borderRadius: theme.layout.radius,
    paddingVertical: theme.layout.paddingM,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '10%',
    width: '85%',
    marginHorizontal: theme.layout.paddingL,
  },
});

export default SelectPlayerScreen;
