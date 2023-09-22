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
} from "react-native";

import { ActionTypes, useContextState } from "./contextState";

const Lista = ({navigation}) => {
  const { contextState, setContextState } = useContextState();
  const [buscador, setBuscador] = useState("");


  useEffect(() => {
    if (buscador.length > 1) {
      const response = fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${buscador}&maxFat=25&number=20&apiKey=383fc80d46654b08912b0ff16ae73bab&includeNutrition=true.`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(async (response) => {
          const resetas = await response.json();
          setContextState({
            newValue: resetas.results,
            type: ActionTypes.setRecepies,
          });
          setContextState({ newValue: false, type: "SET_LOADING" });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.error(error);
        });
    }
  }, [buscador]);

  useEffect(() => {
    console.log(contextState);
  }, [contextState.userToken]);

  const Item = ({ title, image, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: image}} />
      <Button
        title="Mas detalle"
        onPress={() => navigation.navigate("verdetalle", {id})}
      />
    </View>
  );
  return contextState.userToken ? (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese..."
        onChangeText={setBuscador}
        id="nombre"
        value={buscador}
      />
      <FlatList
        data={contextState?.allRecepies ?? []}
        renderItem={({ item }) => (
          <Item title={item.title} image={item.image} id={item.id} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.alerta}>
        Atencion! No se le permite usar el buscador debido a que no inicio
        sesion. Vaya a la pagina principal para hacerlo
      </Text>
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
  item: {
    backgroundColor: "#ccc2ff",
    paddingTop: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: 500,
    maxHeight: 500,
  },
  image: {
    width: 460,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  alerta: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Lista;
