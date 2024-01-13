//2.2.1. Выбор языка

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import BackButton from "../../back-button.jsx";

const ChangeLanguageScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(userData.language);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        console.log("--------------------");
        console.log(language);
        userData.language = language;
    };
    console.log("=====", userData);
    const handleContinue = () => {
        console.log("selctor language:", userData.language);

        //проверка на IS/Buddy
        if (userData.user == 1) {
            navigation.navigate("LoadingSettingISScreen");
        } else {
            navigation.navigate("LoadingSettingBuddyScreen");
        }
    };

    return (
        <SafeAreaView style={languageStyles.main}>
            <View style={languageStyles.main}>
                <View style={languageStyles.form}>
                    {/* <BackButton /> */}
                    {/* <Text style={languageStyles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            "Chainge Language",
                            "Сменить язык"
                        )}
                    </Text> */}
                    <Text style={languageStyles.textHeader}>
                        Выберите язык{"\n"}Select language
                    </Text>
                    <View style={languageStyles.welcomeTextForm}>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={[
                                    languageStyles.button,
                                    selectedLanguage === "ru"
                                        ? languageStyles.selectedButton
                                        : {},
                                ]}
                                onPress={() => handleLanguageChange("ru")}
                            >
                                <Text style={languageStyles.buttonText}>
                                    Русский
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    languageStyles.button,
                                    selectedLanguage === "en"
                                        ? languageStyles.selectedButton
                                        : {},
                                ]}
                                onPress={() => handleLanguageChange("en")}
                            >
                                <Text style={languageStyles.buttonText}>
                                    English
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={languageStyles.buttonNext}
                            onPress={handleContinue}
                        >
                            <Text style={languageStyles.buttonTextNext}>
                                {languageTranslate(
                                    userData.language,
                                    "Next",
                                    "Далее"
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export const languageStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
    },
    form: {
        flex: 1,
        gap: 0,
        backgroundColor: "white",
    },

    textHeader: {
        flex: 3,
        paddingLeft: "10%",
        paddingTop: "10%",

        marginTop: 10,
        fontWeight: "800",
        fontSize: 30,
    },

    buttons: {
        flex: 1,
        marginTop: "6%",
        width: "100%",
        marginLeft: "0%",
        borderRadius: 0,
        textAlign: "center",
        alignItems: "center",
    },
    button: {
        width: "100%",

        display: "flex",
        paddingHorizontal: "auto",
        // flexDirection: "row",
        textAlign: "center",
        padding: "5%",
        alignItems: "center",
    },
    buttonNext: {
        padding: "5%",
        alignItems: "center",
        padding: "4%",
        margin: "2%",
        // marginBottom: "20%",

        width: "50%",
        marginLeft: "25%",
        alignItems: "center",
        backgroundColor: "rgb(122, 60, 227)",

        color: "white",
        borderRadius: 28,
        shadowColor: "grey",
    },
    buttonText: {
        fontWeight: "700",
    },

    selectedButton: {
        padding: "5%",
        alignItems: "center",

        backgroundColor: "rgb(230, 230, 230)",

        borderRadius: 0,
    },

    welcomeTextForm: {
        flex: 1.5,
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

    buttonTextNext: {
        color: "white",
        fontSize: 20,
        fontWeight: "700",
    },
});

export default ChangeLanguageScreen;
