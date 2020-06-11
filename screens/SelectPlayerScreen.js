import * as React from 'react';
import {ScrollView, View, Image, StyleSheet, Text, TextInput } from 'react-native';

import theme from '../modules/theme';
import Button from '../components/Button';

const SelectPlayerScreen = (props) => {

    const { game } = props.route.params;
    return (
      <View style={styles.screen}>
            <Image source={game.cover} style={styles.cover} />
            <Text style={styles.title}>LIST OF PLAYERS</Text>
            <ScrollView style={styles.content}>
                {[...Array(game.players)].map((player, index) => (
                    <View style={styles.playerContainer}>
                        <Text style={styles.playerTitle}>Player {index + 1}</Text>
                        <TextInput style={styles.textInput} />      
                    </View>  
                ))}
            </ScrollView>
            <Button style={styles.button} 
                color={theme.color.black} 
                text="LAUNCH" 
                textColor={theme.color.white} 
            />
        </View>
    );
}

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
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        paddingVertical: theme.layout.paddingL,
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
    content: {
        paddingHorizontal: theme.layout.paddingL,
    },
    button: {
        marginHorizontal: theme.layout.paddingM,
    }
});

export default SelectPlayerScreen;
  