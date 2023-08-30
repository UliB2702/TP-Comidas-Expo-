import {React, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';

/*
const [data, setData] = useState([]);
function postData(nombre) {
  const response =  fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=fd84a84ef20c45ff89b371786e57ef04&includeNutrition=true/recipes/complexSearch?query=${nombre}number=2.`, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'}
  }).then((response) => response.json())
.then((responseJson) => {
  setData(responseJson.results);
})
.catch((error) => {
  alert(JSON.stringify(error));
  console.error(error);
});
}



useEffect(()=>{
  postData(nombre)
},[]);
*/

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];



const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FlatList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:12,
    flex: 1,
    backgroundColor: '#34813C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default FlatList