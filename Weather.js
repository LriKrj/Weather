import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, ScrollView, FlatList, Alert, RefreshControl, Dimensions } from 'react-native';
import * as Location from 'expo-location';



const openWeatherKey = `bf8879e23b85ac1c63278161ccb8412c`;
let URL = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;



export default function LocalWeather() {
  const [forecast, setForecast] = useState(null);
  

  const getWeather = async () => {
   

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("No permission to get location");
    }

    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
    fetch( `${URL}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
    .then(response => response.json())
    .then(responseJson => setForecast(responseJson))
    

    
  }

  useEffect(() => {
    getWeather();
  }, [])

  if (!forecast) {
    return <Text>
      Getting weather data
    </Text>
  }
  

  const weatherNow = forecast.current.weather[0];

  
  return (
    <SafeAreaView style={styles.container}>
      
      
        <Text style={styles.title}>Weather at your location</Text>
        
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${weatherNow.icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>{Math.round(forecast.current.temp)}°C</Text>
        </View>
        <Text style={styles.currentDescription}>{weatherNow.description}</Text>
        
          <View style={styles.info}>
            
            
          
          
        </View>
          
        <View>
          <Text style={styles.forecast}>Next hours</Text>
          <FlatList horizontal
            data={forecast.hourly.slice(0,6)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              
              return <View style={styles.hour}>
                <Text>{dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                
                <Text>{Math.round(hour.item.temp)}°C</Text>
                <Image
                  style={styles.smallIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weather.icon}.png`,
                  }}
                />
                <Text>{weather.description}</Text>
              </View>
            }}
          />
        </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    title: {
      
      textAlign: 'center',
      fontSize: 36,
      fontWeight: 'bold',
      color: 'blue',
      marginTop: 10
    },
    forecast: {
      fontSize: 40,
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 10,
      color: 'blue',
    },
    container: {
      flex: 1,
      backgroundColor: '#FFFBF6',
      
    },
    
    current: {
      
      alignItems: 'center',
      
    },
    currentTemp: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
    },  
    currentDescription: {
      width: '100%',
      textAlign: 'center',
      fontWeight: '200',
      fontSize: 24,
      marginBottom: 5
    },
    hour: {
      
      
      alignItems: 'center',
    },
    largeIcon: {
      width: 300,
      height: 250,
    },
    smallIcon: {
        width: 100,
        height: 120,
      },
    
    
  });

