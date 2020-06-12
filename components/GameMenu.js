import * as React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import theme from '../modules/theme';

const GameMenu = ({isVisible, closeMenu, onExitPress}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={closeMenu}>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="music" size={30} />
          <Text style={styles.title}>Music</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="restart" size={30} />
          <Text style={styles.title}>Restart</Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.row} onPress={onExitPress}>
          <MaterialCommunityIcons name="door" size={30} />
          <Text style={styles.title}>Exit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: theme.layout.paddingM,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
  },
  border: {
    borderWidth: 0.5,
    borderColor: theme.color.textGray,
  },
  menu: {
    padding: 30,
    alignSelf: 'center',
    width: 250,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default GameMenu;
