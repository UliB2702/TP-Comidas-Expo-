import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
} from "react-native";
import { ActionTypes, useContextState } from "./contextState";

const Menu = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();

  useEffect(() => {
      const response = fetch(
        `https://api.spoonacular.com/recipes/716426/information?includeNutrition=false&apiKey=383fc80d46654b08912b0ff16ae73bab`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(async (response) => {
          const resetas = await response.json();
          setContextState({
            newValue: resetas,
            type: ActionTypes.setMenu,
          });
          setContextState({ newValue: false, type: "SET_LOADING" });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.error(error);
        });
    
  }, []);

  // falta hacer por Id para que me de los datos del precio y puntaje de salud
  useEffect(() => {
    const response = fetch(
      `https://api.spoonacular.com/recipes/782585/information?includeNutrition=false&apiKey=383fc80d46654b08912b0ff16ae73bab`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(async (response) => {
        const resetas = await response.json();
        setContextState({
          newValue: resetas,
          type: ActionTypes.setMenu,
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  
}, []);

useEffect(() => {
  const response = fetch(
    `https://api.spoonacular.com/recipes/702313/information?includeNutrition=false&apiKey=383fc80d46654b08912b0ff16ae73bab`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then(async (response) => {
      const resetas = await response.json();
      setContextState({
        newValue: resetas,
        type: ActionTypes.setMenu,
      });
      setContextState({ newValue: false, type: "SET_LOADING" });
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });

}, []);

useEffect(() => {
  const response = fetch(
    `https://api.spoonacular.com/recipes/702413/information?includeNutrition=false&apiKey=383fc80d46654b08912b0ff16ae73bab`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then(async (response) => {
      const resetas = await response.json();
      setContextState({
        newValue: resetas,
        type: ActionTypes.setMenu,
      });
      setContextState({ newValue: false, type: "SET_LOADING" });
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });

}, []);

const sum = contextState.menu.reduce((accumulator, value) => {
    return accumulator + value.pricePerServing;
}, 0);

const hPrice = contextState.menu.reduce((accumulator, value) => {
    return accumulator + value.healthScore;
}, 0);


  const Item = ({ title, image, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: image}} />
      <Button
        title="Mas detalle"
        onPress={() => navigation.navigate("verdetalle", {id})}
      />
      <Button
        title="Eliminar plato"
        color= "#ff0000"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Menú</Text>
        <FlatList
        data={contextState?.menu ?? []}
        renderItem={({ item }) => (
          <Item title={item.title} image={item.image} id={item.id} />
        )}
        keyExtractor={(item) => item.id}
        />
        <Text style={styles.totalPrice}>Total: ${sum}</Text>
        <Text style={styles.totalPrice}>Puntaje de salud total: {hPrice}</Text>
        <Button title="Agregar Plato" onPress={() => navigation.navigate("buscador")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#634fe3",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 30,
  },
  container2: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
  },
  score: {
    fontSize: 18,
    marginTop: 10,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alerta: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#ff634f",
  }
});


export default Menu;
