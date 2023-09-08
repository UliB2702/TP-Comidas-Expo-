import { React, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Button,
}from "react-native";
import { useContextState } from "./contextState";

const Lista = () => {
  const { contextState, setContextState } = useContextState();
  const [buscador, setBuscador] = useState('');


  useEffect(() => {
    if(buscador.length > 1){
    const response = fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${buscador}&maxFat=25&number=20&apiKey=012e92b2a7d64c6b951c150fbddf774a&includeNutrition=true.`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setContextState({
          newValue: responseJson.results,
          type: "SET_RECEPIES",
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
        console.log(responseJson)
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
}}, [buscador]);
  

  const Item = ({ title, image }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{uri: image}} />
      <Button title="Mas detalle"/>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text>Ingrese el plato que desea buscar</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese..."
        onChangeText={setBuscador}
        id="nombre"
        value={buscador}
      />
      <FlatList
        data={contextState?.allRecepies ?? []}
        renderItem={({ item }) => <Item title={item.title} image={item.image} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#634fe3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#ccc2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Lista;
