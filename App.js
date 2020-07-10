import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import io from 'socket.io-client';

import LinkScreen from './screens/LinkScreen';
import HomeScreen from './screens/HomeScreen';
import SelectPlayerScreen from './screens/SelectPlayerScreen';
import GameScreen from './screens/GameScreen';
import ScoreScreen from './screens/ScoreScreen';

import {SocketProvider} from './components/SocketProvider';

const Stack = createStackNavigator();

const App = () => {
  const [isLinked, setIsLinked] = React.useState(false);
  const [socket, setSocket] = React.useState({});

  React.useEffect(() => {
    const initSocket = {
      socket: io.connect('http://afternoon-forest-61554.herokuapp.com', {
        transports: ['websocket'],
        reconnectionAttempts: 10,
        reconnection: true,
        reconnectionDelay: 15000,
      }),
    };
    initSocket.socket.on('receive_socket_id', (socketID) => {
      // AppStore.updateSocketID(socketID);
      console.warn(socketID);
    });
    setSocket(initSocket);
  }, []);

  const handleSubmitPress = (isValid) => {
    if (isValid) {
      setIsLinked(true);
    }
  };

  return (
    <SocketProvider socket={socket}>
      <NavigationContainer>
        {!isLinked ? (
          <Stack.Navigator>
            <Stack.Screen name="LinkScreen" options={{headerShown: false}}>
              {(props) => (
                <LinkScreen {...props} onSubmitPress={handleSubmitPress} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SelectPlayerScreen"
              component={SelectPlayerScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GameScreen"
              component={GameScreen}
              options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
              name="ScoreScreen"
              component={ScoreScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SocketProvider>
  );
};

export default App;
