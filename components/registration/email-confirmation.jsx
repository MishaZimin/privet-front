import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendDataToServer,
    userData,
} from "../Utils.jsx";
import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";
import { form } from "../registration/registration-IS.jsx";

let correctEmailCode = true;
let isCorrectCode = true;

const EmailScreen = ({ navigation }) => {
    const [emailCode, setEmailCode] = useState("");
    const [correctCode, setCorrectCode] = useState(null);

    correctEmailCode = emailCode.length === 6 ? true : false;

    const handleEmailScreen = async () => {
        try {
            setCorrectCode(null);
            console.log("----------EmailCode----------");

            const data = {
                email: registrationData.email,
                token: emailCode,
            };

            const response = await sendDataToServer(
                data,
                "/verify-email",
                "/json"
            );
            console.log("Response:", response.detail);

            let isCorrectToken =
                response.detail == "Token is incorrect" ? false : true;
            console.log("isCorrectToken:", isCorrectToken);

            if (isCorrectToken) {
                console.log("код верный");
                // Alert.alert('код верный');

                userData.email = registrationData.email;
                userData.language = registrationData.language;
                userData.user = registrationData.user;

                if (registrationData.isNewPassword) {
                    navigation.navigate("SetNewPasswordScreen");
                } else {
                    const data1 = {
                        grant_type: "",
                        username: registrationData.email,
                        password: registrationData.password,
                        scope: "",
                        client_id: "",
                        client_secret: "",
                    };

                    console.log("data1: ", data1);

                    const response1 = await sendDataToServer(
                        data1,
                        "/login",
                        "/x-www-form-urlencoded"
                    );
                    console.log("Response from server 1:", response1);

                    await AsyncStorage.setItem(
                        "access_token",
                        response1.access_token
                    );

                    switch (registrationData.user) {
                        case 1:
                            navigation.navigate("LoadingSettingISScreen");
                        case 2:
                            navigation.navigate("LoadingSettingBuddyScreen");
                    }

                    // if (registrationData.user === 1) {
                    //     navigation.navigate('LoadingSettingISScreen');
                    // }
                    // if (registrationData.user === 2) {
                    //     navigation.navigate('LoadingSettingBuddyScreen');
                    // }
                }
            } else {
                console.log("код неверный");
                // Alert.alert('код неверный');

                isCorrectCode = false;
                setCorrectCode("Код неверный");
            }

            console.log("user:", registrationData.user);
            console.log("recovery?:", registrationData.isNewPassword);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNotEmailCode = () => {
        Alert.alert(
            languageTranslate(
                userData.language,
                "Did not get the email?",
                "Не получили письмо?"
            ),
            "",
            [
                {
                    text: languageTranslate(
                        userData.language,
                        "Send the code again",
                        "Отправить код еще раз"
                    ),
                    onPress: () => sendCodeAgain(),
                },
                {
                    text: languageTranslate(
                        userData.language,
                        "Contact support",
                        "Связаться с поддержкой"
                    ),
                    onPress: () => contactSupport(),
                },
                {
                    text: languageTranslate(
                        userData.language,
                        "Close",
                        "Закрыть"
                    ),
                    onPress: () => console.log("Закрыть Pressed"),
                    style: "cancel",
                },
            ]
        );
    };

    const sendCodeAgain = async () => {
        sendDataToServer(
            0,
            "/send-verification-token/" + registrationData.email,
            "/json"
        );
    };

    const contactSupport = () => {
        navigation.navigate("SupportScreen");
    };

    return (
        <SafeAreaView style={form.main}>
            <ScrollView style={form.main}>
                <View style={form.form}>
                    {/* <BackButton /> */}
                    <Text style={confirm.textHeader}>
                        {languageTranslate(
                            userData.language,
                            "Подтверждение почты",
                            "Подтверждение почты"
                        )}
                    </Text>
                    <Text style={confirm.text}>
                        {languageTranslate(
                            userData.language,
                            "We have sent a confirmation code to your email",
                            "Мы отправили код подтверждения на вашу электронную почту"
                        )}
                    </Text>

                    <View style={form.textInputs}>
                        <Text style={form.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Введите код в поле ниже",
                                "Введите код в поле ниже"
                            )}
                        </Text>
                        <TextInput
                            style={
                                correctEmailCode
                                    ? form.textInput
                                    : form.unCorrectTextInput
                            }
                            placeholder=""
                            secureTextEntry
                            value={emailCode}
                            onChangeText={(text) => setEmailCode(text)}
                        />
                        {isCorrectCode ? null : <Text>{correctCode}</Text>}
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={confirm.buttonMini}
                            title="Не получили письмо?"
                            onPress={handleNotEmailCode}
                        >
                            <Text style={confirm.textButtonMini}>
                                {languageTranslate(
                                    userData.language,
                                    "Did not get the email?",
                                    "Не получили письмо?"
                                )}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={form.button}
                            title="Далее"
                            onPress={handleEmailScreen}
                        >
                            <Text style={form.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Next",
                                    "Отправить"
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const confirm = StyleSheet.create({
    textHeader: {
        width: "80%",
        paddingLeft: "10%",
        paddingBottom: "20%",
        fontWeight: "700",
        fontSize: 30,
    },

    text: {
        width: "80%",
        marginLeft: "10%",
        marginBottom: "10%",
        color: "grey",
    },

    buttonMini: {
        padding: "2%",

        borderRadius: 28,
        marginBottom: "40%",
        marginTop: "-20%",
    },

    textButtonMini: {
        width: "80%",
        marginLeft: "10%",
        color: "silver",
        textDecorationLine: "underline",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "left",
    },
});

export default EmailScreen;
