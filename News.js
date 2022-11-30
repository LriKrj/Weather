import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Linking, Image, SafeAreaView, Button } from 'react-native';


export default function News(){
    const URL = "https://newsapi.org/v2/everything?q=s%C3%A4%C3%A4&title&searchIn=title&sortBy=publishedAt&title&apiKey=1f5c080c29d94a01b48c6d2b4f36759f"
    const [data, setData] = useState([]);
  
    //fetch news related to weather from api sorted by publishing date
    const fetchData =  () => {
      fetch(URL)
      .then(response => response.json())
      .then(responseJson => setData(responseJson.articles))
    };
    useEffect(() => {
        fetchData();
      }, []);


     
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <View style={styles.news}>
                <Text style={styles.title}>
                  {item.title}
                </Text>
                <Image style={styles.image} source={{ uri: item.urlToImage }} />
                <Button style={styles.button} title='SHOW'  onPress={() => Linking.openURL(item.url)}>
                   {item.name}
                </Button>
              </View>
            }}
           />
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
        },
        title: {
          color: '#121212',
          fontSize: 20,
          fontWeight: 'bold'
        },
        news: {
          borderWidth: 1,         
          padding: 10,
          
        },
        
        image: {
          height: 220,
          flex: 1,
        },
       


      });