import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../modules/theme';

const Button = ({text, color, textColor, onPress}) => {
    return (
        <TouchableOpacity 
            style={[{backgroundColor: color}, styles.container]}
            onPress={onPress}
        >
            <Text style={[{color: textColor}, styles.text]}>{text}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.layout.radius,
        marginVertical: theme.layout.paddingM,
    },
    text: {
        textAlign: 'center',
        padding: theme.layout.paddingM,
    }
});

export default Button;
  