import * as React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import theme from '../modules/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const GameBox = ({title, description, cover, players, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animatable.View style={styles.container} animation="fadeInLeft">
        <Image source={cover} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <MaterialCommunityIcons
              name="account"
              size={15}
              color={theme.color.black}
            />
            <Text style={styles.players}>{players}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: theme.layout.paddingM,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: theme.layout.paddingM,
    borderRadius: theme.layout.radius,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: theme.layout.radius,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.layout.paddingM,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    marginBottom: theme.layout.paddingM,
  },
  description: {
    textAlign: 'justify',
    color: theme.color.black,
  },
  players: {
    fontSize: 12,
    marginLeft: theme.layout.paddingS,
  },
});

export default GameBox;
