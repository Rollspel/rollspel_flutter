import * as React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import theme from '../modules/theme';
import GameBox from '../components/GameBox';

const dataGameBox = [
  {
    id: '1',
    title: 'Morpion',
    cover: require('../modules/images/background.jpg'),
    description:
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 2,
  },
  {
    id: '2',
    title: 'Picollo',
    cover: require('../modules/images/picollo.jpeg'),
    description:
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 4,
  },
  {
    id: '3',
    title: 'Echec',
    cover: require('../modules/images/echec.jpg'),
    description:
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 1,
  },
];

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
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={dataGameBox}
        renderItem={renderGameBox}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 50,
    flex: 1,
    backgroundColor: theme.color.white,
  },
  flatlist: {
    flexGrow: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: theme.color.gray,
    marginHorizontal: theme.layout.paddingL,
  },
});

export default HomeScreen;
