import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../Screens/WelcomeScreen';
import RegistroAlmacenamiento from '../Screens/ResgistroAlmacenamiento';
import EditarEliminar from '../Screens/EditarEliminar';
import ApiScreen from '../Screens/ApiScreen';
import PersonaScreen from '../Screens/PersonaSreem';
import InformacionScreen from '../Screens/Informacion';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen name="Persona" component={PersonaStack} />
    <BottomTab.Screen name="EditarEliminar" component={EditarEliminar} />
    <BottomTab.Screen name="Api" component={ApiScreen} />
    <BottomTab.Screen name='Informacion' component={InformacionScreen}/>
  </BottomTab.Navigator>
);

const PersonaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Persona" component={PersonaScreen} />
    <Stack.Screen name="Informacion" component={InformacionScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Registro" component={RegistroAlmacenamiento} />
      <Stack.Screen name="Persona" component={PersonaScreen} />
      <Stack.Screen name="Informacion" component={InformacionScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
