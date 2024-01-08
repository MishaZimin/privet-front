import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Image
                resizeMode="contain"
                style={styles.back}
                source={require("./img/return.png")}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: 25,
        left: 20,
        alignItems: "left",
        width: "100%",
    },
    back: {
        width: 25,
        height: 25,
    },
});

export default BackButton;
