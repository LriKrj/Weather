import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons';  
import News from './News';
import Weather from './Weather'

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({color, size }) => {
    let iconImage;

    if (route.name === 'Weather') {
      iconImage = 'md-cloudy-night-outline';
    } else if (route.name === 'News') {
      iconImage = 'newspaper-outline';
    }
    //palauttaa ikonikomponentin
    return <Ionicons name={iconImage} size={size} color={color} />;
  }
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}> 
        <Tab.Screen name="Weather" component={Weather} />
        <Tab.Screen name="News" component={News} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});