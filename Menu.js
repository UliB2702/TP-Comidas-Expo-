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
import LoadingAnimation from "./LoadingAnimation.js";


const Menu = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
      const response = fetch(
        `https://api.spoonacular.com/recipes/716426/information?includeNutrition=false&apiKey=d1b25ab4f2944ccd93f22ec43d4431b1`,
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
      `https://api.spoonacular.com/recipes/782585/information?includeNutrition=false&apiKey=d1b25ab4f2944ccd93f22ec43d4431b1`,
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
    `https://api.spoonacular.com/recipes/795751/information?includeNutrition=false&apiKey=d1b25ab4f2944ccd93f22ec43d4431b1`,
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
    `https://api.spoonacular.com/recipes/715415/information?includeNutrition=false&apiKey=d1b25ab4f2944ccd93f22ec43d4431b1`,
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

function Eliminar(id){
  console.log("A eliminar")
  const nuevoMenu = contextState.menu.filter((item) => item.id !== id)
  setContextState({
    newValue: nuevoMenu,
    type: ActionTypes.removeMenu,
  });

}

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
        onPress={() => {Eliminar(id)}}
        style={[styles.button, styles.buttonDelete]}
      >
        <Text style={styles.buttonText}>Eliminar plato</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return contextState.menu ? (
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
        <Text style={styles.totalPrice}>Total: ${sum.toFixed(2)}</Text>
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
  ) : (
    <View style={styles.loadingContainer}>
    <LoadingAnimation/>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7e638c", // Preserve the previous background color
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 30,
  },
  container2: {
    backgroundColor: "#fffad3", // White background
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
    fontFamily: 'Lobster-Regular'
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
    fontFamily: 'Lobster-Regular'
  },
  item: {
    backgroundColor: "#d6dd90",
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
    backgroundColor: "#d6496c",
  },
  buttonAdd: {
    backgroundColor: "#7db8a2",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Lobster-Regular'
  },
});




export default Menu;
