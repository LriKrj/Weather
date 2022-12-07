import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, Alert, ScrollView} from 'react-native';
import * as Location from 'expo-location';
import {API_URL} from '@env'

export default function LocalWeather() {
  const [forecast, setForecast] = useState(null);

  //lupa sijaintitiedon hakemiselle
  const getWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to get location");
      return
    }
    //nykyinen sijainti
    let current = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
    let lat = current.coords.latitude
    let lon = current.coords.longitude
    //API:sta nykyiselle sijainnille säätiedot
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
    <ScrollView style={styles.container}>
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
            data={forecast.hourly.slice(1,10)}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={(time) => {
              //api antaa ajan unixaikana joka on sekunteja
              let unixTime = time.item.dt
              //javascript määrittää aikaa millisekunteina sekuntien sijaan joten kerrotaan tuhannella
              let fixedTime = new Date(unixTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) //ios jättää sekunnit pois android ei?
              return <View style={styles.time}>
                <Text>{fixedTime}</Text>
                <Image
                  style={styles.smallPicture}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${time.item.weather[0].icon}.png`,
                  }}
                />
                <Text>{Math.round(time.item.temp)}°C</Text>
                <Text>{time.item.weather[0].main}</Text>
              </View>
            }}
          />
        </View>
    </ScrollView>
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

