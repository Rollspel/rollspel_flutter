import * as React from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
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

  return (
    <View style={styles.screen}>
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
        color={theme.color.black}
        text="LAUNCH"
        textColor={theme.color.white}
        onPress={handleLaunchGamePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.color.white,
    paddingBottom: theme.layout.paddingL,
  },
  cover: {
    width: '100%',
    height: 350,
  },
  content: {
    paddingTop: theme.layout.paddingL,
    paddingHorizontal: theme.layout.paddingL,
  },
  playerContainer: {
    marginBottom: theme.layout.paddingM,
  },
  playerTitle: {
    fontSize: 15,
    color: theme.color.textGray,
    fontWeight: '600',
    paddingBottom: theme.layout.paddingS,
  },
  textInput: {
    paddingHorizontal: theme.layout.paddingM,
    borderWidth: 1,
    borderColor: theme.color.gray,
    borderRadius: theme.layout.radius,
    paddingVertical: theme.layout.paddingM,
  },
  button: {
    marginHorizontal: theme.layout.paddingL,
  },
});

export default SelectPlayerScreen;
