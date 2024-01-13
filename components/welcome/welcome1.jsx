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
import { styles } from "../main.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from "../Utils.jsx";
import BackButton from "../back-button.jsx";

const WelcomeTwoScreen = ({ navigation }) => {
    const handleRegister = () => {
        // navigation.navigate('RegistrationISScreen');
        navigation.navigate("WelcomeThreeScreen");
    };

    return (
        <SafeAreaView style={welcome.main}>
            <View style={welcome.main}>
                <View style={welcome.form}>
                    <BackButton />

                    <Image
                        resizeMode="contain"
                        style={welcome.img}
                        source={require("./3d-fluency-star-struck.png")}
                    />
                    <View style={welcome.welcomeTextForm}>
                        <View style={welcome.welcomeText}>
                            <Text style={welcome.textHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Privet👋",
                                    "С нашим приложением ты можешь:"
                                )}
                            </Text>

                            <Text style={welcome.text}>
                                {languageTranslate(
                                    userData.language,
                                    "this is an application for foreign students that will help you settle in Russia without any problems",
                                    "это приложение для иностранных студентов, которое поможет без проблем обосноваться в России"
                                )}
                            </Text>
                        </View>
                        <View style={welcome.buttonForm}>
                            <TouchableOpacity
                                style={welcome.button}
                                title="2-3 sec"
                                onPress={handleRegister}
                            >
                                <Image
                                    // resizeMode="contain"
                                    style={welcome.buttonImg}
                                    source={require("./right-arrows.png")}
                                />

                                {/* components/right-arrows.png */}
                            </TouchableOpacity>
                        </View>
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
        paddingTop: "15%",
        paddingLeft: "10%",
        paddingBottom: "2%",
        fontWeight: "700",
        fontSize: 30,
    },

    text: {
        width: "80%",
        paddingLeft: "10%",
        // paddingBottom: '2%',

        fontWeight: "300",
        fontSize: 20,
    },

    img: {
        flex: 4,
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "white",
        width: "50%",
        marginLeft: "25%",
    },

    button: {
        alignItems: "center",
        color: "grey",
        borderRadius: 30,
        width: "25%",
        marginLeft: "65%",
        borderWidth: 8,
        borderColor: "rgb(234, 51, 111)",
    },
    buttonImg: {
        height: 50,
        width: "60%",
    },
    textButton: {
        color: "white",
        fontSize: 24,
        fontWeight: "600",
    },

    buttonForm: {
        position: "absolute",
        width: "100%",
        bottom: "10%",
    },
});

export default WelcomeTwoScreen;
