import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, Alert} from 'react-native';
import * as Location from 'expo-location';
import {API_URL} from '@env'

export default function LocalWeather() {
  const [forecast, setForecast] = useState(null);

  const getWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to get location");
      return
    }

    let current = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
    let lat = current.coords.latitude
    let lon = current.coords.longitude
    
    fetch( `${API_URL}&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(responseJson => setForecast(responseJson))

    .catch(error => { 
      Alert.alert('Error', error); 
  });
    console.log(forecast)
  }

  useEffect(() => {
    getWeather();
  }, [])

  if (!forecast) {
    return <Text>
      Getting weather data
    </Text>
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Weather at your location</Text>
        <View style={styles.current}>
          <Image
            style={styles.bigPicture}
            source={{uri: `http://openweathermap.org/img/wn/${forecast.current.weather[0].icon}@2x.png`}}
          />
          <Text style={styles.temperature}>{Math.round(forecast.current.temp)}°C</Text>
        </View>
        <Text style={styles.description}>{forecast.current.weather[0].main}</Text>
        <View>
          <Text style={styles.forecast}>Next hours</Text>
          <FlatList 
            data={forecast.hourly.slice(1,7)}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              let dt = new Date(hour.item.dt * 1000);
              return <View style={styles.time}>
                <Text>{dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                <Image
                  style={styles.smallPicture}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${hour.item.weather[0].icon}.png`,
                  }}
                />
                <Text>{Math.round(hour.item.temp)}°C</Text>
                <Text>{hour.item.weather[0].main}</Text>
              </View>
            }}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
    forecast: {
      fontSize: 30,
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 10,
      color: 'blue',
      textAlign: 'center'
    },
    title: { 
      textAlign: 'center',
      fontSize: 36,
      fontWeight: 'bold',
      color: 'blue',
      marginTop: 10
    },
    current: {
      alignItems: 'center',
    },
    temperature: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
    },  
    description: {
      textAlign: 'center',
      fontSize: 24,
    },
    time: {
      alignItems: 'center',
    },
    bigPicture: {
      width: 300,
      height: 300,
    },
    smallPicture: {
        width: 100,
        height: 120,
      },
    
    
  });

