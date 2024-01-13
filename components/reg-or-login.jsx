//2.2.2. Приветственный экран

import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { styles } from "./main.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from "./Utils.jsx";
import BackButton from "./back-button.jsx";

const RegOrLogInScreen = ({ navigation }) => {
    const handleRegister = () => {
        navigation.navigate("RegistrationISScreen");
    };
    const handleLogIn = () => {
        navigation.navigate("LogInForm");
    };
    const handleBuddy = () => {
        navigation.navigate("RegistrationBuddyScreen");
    };

    return (
        <SafeAreaView style={welcome.main}>
            <View style={welcome.main}>
                <View style={welcome.form}>
                    {/* <BackButton /> */}

                    <Image
                        resizeMode="contain"
                        style={welcome.img}
                        source={require("./3d-fluency-graduation-cap.png")}
                    />
                    <View style={welcome.welcomeTextForm}>
                        <View>
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                        </View>
                        <TouchableOpacity
                            style={welcome.button}
                            title=""
                            onPress={handleRegister}
                        >
                            <Text style={welcome.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Sign In",
                                    "Регистрация"
                                )}
                            </Text>

                            {/* components/right-arrows.png */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={welcome.button1}
                            title=""
                            onPress={handleLogIn}
                        >
                            <Text style={welcome.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Log In",
                                    "Войти"
                                )}
                            </Text>

                            {/* components/right-arrows.png */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={welcome.buttonMini}
                            title=""
                            onPress={handleBuddy}
                        >
                            <Text style={welcome.textButtonMini}>
                                {languageTranslate(
                                    userData.language,
                                    "I am Buddy",
                                    "Я сопровождающий"
                                )}
                            </Text>

                            {/* components/right-arrows.png */}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export const welcome = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
    },
    form: {
        flex: 1,
        gap: 0,
        backgroundColor: "white",
    },

    welcomeTextForm: {
        flex: 5,
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: "grey",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },

    welcomeText: {
        width: "90%",
        marginLeft: "5%",
    },

    textHeader: {
        width: "60%",
        paddingTop: "15%",
        paddingLeft: "10%",
        paddingBottom: "2%",
        fontWeight: "700",
        fontSize: 30,
    },

    text: {
        width: "80%",
        paddingLeft: "10%",
        paddingBottom: "20%",
        fontWeight: "300",
        fontSize: 20,
    },

    img: {
        flex: 7,
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "white",
        width: "50%",
        marginLeft: "25%",
        marginBottom: "10%",
    },

    button: {
        padding: "4%",
        margin: "2%",
        width: "75%",
        marginLeft: "12.5%",
        alignItems: "center",
        backgroundColor: "rgb(122, 60, 227)",
        color: "grey",
        borderRadius: 28,
        shadowColor: "grey",
    },
    buttonImg: {
        height: 50,
        width: "60%",
    },
    textButton: {
        width: "100%",
        color: "white",
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
    },
    button1: {
        padding: "4%",
        margin: "2%",
        width: "75%",
        marginLeft: "12.5%",
        alignItems: "center",
        backgroundColor: "black",
        color: "grey",
        borderRadius: 28,
        shadowColor: "grey",
    },
    buttonMini: {
        padding: "4%",
        margin: "2%",
        width: "75%",
        marginLeft: "12.5%",
        alignItems: "center",

        borderRadius: 28,
    },
    textButtonMini: {
        // width: "100%",
        color: "black",
        // textDecorationLine: "underline",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
        padding: "5%",
        borderWidth: 2,
        borderRadius: 15,
    },
});

export default RegOrLogInScreen;
