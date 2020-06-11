
import * as React from 'react';
import { NavigationContainer, Link } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import LinkScreen from './screens/LinkScreen';
import HomeScreen from './screens/HomeScreen';
import SelectPlayerScreen from './screens/SelectPlayerScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLinked, setIsLinked] = React.useState(false);

  handleSubmitPress = (isValid) => {
    if(isValid){
      setIsLinked(true);
    }
  }

  return (
    <NavigationContainer>
      {!isLinked ?
        <Stack.Navigator>
          <Stack.Screen name="LinkScreen" options={{ headerShown: false }}>
            {props => <LinkScreen {...props} onSubmitPress={handleSubmitPress} />}
          </Stack.Screen>
        </Stack.Navigator>
        : 
        <Stack.Navigator>
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="SelectPlayerScreen" 
            component={SelectPlayerScreen}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

export default App;