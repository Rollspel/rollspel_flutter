import * as React from 'react';
import { View, Image } from 'react-native';

import theme from '../modules/theme';
import GameBox from '../components/GameBox';

const SelectPlayerScreen = (props) => {

    const { game } = props.route.params;

    return (
      <View style={styles.screen}>


      </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.color.white
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

export default SelectPlayerScreen;
  