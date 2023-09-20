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

const Menu = ({ navigation }) => {

return(
    <View style={styles.container}></View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#634fe3",
        alignItems: "center",
        justifyContent: "center",
    },
    container2: {
        backgroundColor: "#634fe3",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: StatusBar.currentHeight || 0,
        flex: 1,
    },
    title: {
        fontSize: 24,
    },
    price: {
        fontSize: 18,
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
    score: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default Menu
