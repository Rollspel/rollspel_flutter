import * as React from 'react';
import {View, StyleSheet, FlatList, ImageBackground, Image} from 'react-native';

import theme from '../modules/theme';
import GameBox from '../components/GameBox';

const dataGameBox = [
  {
    id: '1',
    title: 'Morpion',
    cover: require('../modules/images/morpion.jpg'),
    description:
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 2,
    boardDefault: [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ],
  },
  {
    id: '2',
    title: 'Picollo',
    cover: require('../modules/images/picollo.jpeg'),
    description:
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 4,
    boardDefault: [
      [9, 9, 9, 9],
      [9, 9, 9, 9],
      [9, 9, 9, 9],
    ],
  },
  {
    id: '3',
    title: 'Echec',
    cover: require('../modules/images/echec.jpg'),
    description:
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 1,
    boardDefault: [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ],
  },
];

const background = require('../modules/images/background.jpg');
const logo = require('../modules/images/logo_white.png');

const HomeScreen = (props) => {
  const renderGameBox = ({item, index}) => (
    <View style={index < dataGameBox.length - 1 && styles.border}>
      <GameBox
        title={item.title}
        description={item.description}
        cover={item.cover}
        players={item.players}
        onPress={() => handleGamePress(item)}
      />
    </View>
  );

  const handleGamePress = (game) => {
    props.navigation.navigate('SelectPlayerScreen', {game});
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <Image source={logo} style={styles.logo} />
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={dataGameBox}
          renderItem={renderGameBox}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  logo: {
    height: 80,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
    paddingTop: 30,
  },
  flatlist: {
    flexGrow: 1,
  },
});

export default HomeScreen;
