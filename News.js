import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Linking, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import {NEWS_URL} from '@env'


export default function News(){
    
    const [data, setData] = useState([]);
  
   
    const fetchData =  () => {
      fetch(`${NEWS_URL}`)
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
                <TouchableOpacity style={styles.button}   onPress={() => Linking.openURL(item.url)}>
                   {item.name}
                   <Text style={styles.buttontext}>Read full article</Text>

                </TouchableOpacity>
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
        button: {
        alignItems: "center",
        backgroundColor: "beige",
        padding: 15
        },
        buttontext: {
          fontWeight: 'bold'
        }
      });