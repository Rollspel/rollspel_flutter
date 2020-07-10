import * as React from 'react';
import {View, StyleSheet, FlatList, ImageBackground, Image} from 'react-native';

import GameBox from '../components/GameBox';
import {withSocketContext} from '../components/SocketProvider';
import {dataGameBox} from '../modules/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const background = require('../modules/images/background.jpg');
const logo = require('../modules/images/logo_white.png');
const crown = require('../modules/images/crown.png');

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
  
  const handleScorePress = () => {
    props.navigation.navigate('ScoreScreen');
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.row}>
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity
            style={styles.crownButton}
            onPress={handleScorePress}>
            <Image source={crown} style={styles.crown} />
          </TouchableOpacity>
        </View>
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
  row: {
    flexDirection: 'row',
  },
  logo: {
    height: 80,
    flex: 1,
  },
  crownButton: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  crown: {
    marginRight: 20,
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 1000,
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

export default withSocketContext(HomeScreen);
