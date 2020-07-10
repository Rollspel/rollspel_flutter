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
import axios from 'axios';

import theme from '../modules/theme';
import Button from '../components/Button';

const ScoreScreen = (props) => {
  const background = require('../modules/images/background.jpg');
  const logo = require('../modules/images/logo_white.png');
  const [parties, setParties] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://afternoon-forest-61554.herokuapp.com/party/getAll')
      .then((res) => {
        setParties(res.data.party);
      });
  }, []);

  return (
    <View style={styles.screen}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <Image source={logo} style={styles.logo} />
        {parties.length > 0 &&
          parties.map((party, index) => {
            if (!party.players || !party.winner) {
              return;
            }
            return (
              <View style={styles.partyContainer} key={index}>
                <Text style={styles.players}>
                  {party.players[0]} - {party.players[1]}
                </Text>
                <Text style={styles.party}>Winner : {party.winner}</Text>
                <Text style={styles.party}>
                  Score : {party.rounds[0]} - {party.rounds[1]}
                </Text>
                <Text style={styles.party}>Date : {party.createdAt}</Text>
              </View>
            );
          })}
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
  players: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
    paddingTop: 30,
  },
  partyContainer: {
    flexDirection: 'column',
    margin: theme.layout.paddingM,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: theme.layout.paddingM,
    borderRadius: theme.layout.radius,
  },
  party: {
    color: '#000',
  },
});

export default ScoreScreen;
