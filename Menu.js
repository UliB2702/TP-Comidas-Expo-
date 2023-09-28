import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity, 
  Animated,
} from "react-native";
import { ActionTypes, useContextState } from "./contextState";


const Menu = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [fadeAnim] = useState(new Animated.Value(0));

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
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false, // Required for shadow animation
        }).start();
    
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
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false, // Required for shadow animation
      }).start();
  
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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Required for shadow animation
    }).start();

}, []);



const sum = contextState.menu.reduce((accumulator, value) => {
  return accumulator + value.pricePerServing;
}, 0);

const hPrice = contextState.menu.reduce((accumulator, value) => {
  return accumulator + value.healthScore;
}, 0);


  const Item = ({ title, image, id }) => (
    <Animated.View // Apply fade animation to the item container
      style={[styles.item, { opacity: fadeAnim }]}
    >
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{ uri: image }} />
      <TouchableOpacity
        onPress={() => navigation.navigate("verdetalle", { id })}
        style={[styles.button, styles.buttonDetail]}
      >
        <Text style={styles.buttonText}>Mas detalle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          
        }}
        style={[styles.button, styles.buttonDelete]}
      >
        <Text style={styles.buttonText}>Eliminar plato</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.container2, styles.shadow]}>
        <Text style={styles.title}>Menú</Text>
        <FlatList
          data={contextState?.menu ?? []}
          renderItem={({ item }) => (
            <Item title={item.title} image={item.image} id={item.id} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        <Text style={styles.totalPrice}>Total: ${sum}</Text>
        <Text style={styles.totalPrice}>Puntaje de salud total: {hPrice}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("buscador")}
          style={[styles.button, styles.buttonAdd]}
          activeOpacity={0.7} // Controls the opacity on press
        >
          <Text style={styles.buttonText}>Agregar Plato</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#634fe3", // Preserve the previous background color
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 30,
  },
  container2: {
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24, // Larger title
    fontWeight: "bold",
    marginBottom: 20, // More spacing below title
    color: "#333333", // Darker text color
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10, // Slightly rounded corners
  },
  totalPrice: {
    fontSize: 20, // Slightly smaller font
    fontWeight: "bold",
    marginTop: 20, // More spacing above total
    color: "#333333",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    maxWidth: 300,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDetail: {
    backgroundColor: "#007AFF",
  },
  buttonDelete: {
    backgroundColor: "#ff0000",
  },
  buttonAdd: {
    backgroundColor: "#007AFF",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});




export default Menu;
