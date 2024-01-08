//2.2.3. Регистрация Сопровождающего

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    LogInData,
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendDataToServer,
    getTokenToServer,
    userData,
    sendRequest,
} from "../Utils.jsx";
import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";
import { form } from "../registration/registration-IS.jsx";
let isCorrectPassword = true;
let isCorrectEmail = true;
let isCorrectUser = true;

const LogInForm = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordCorrect, setPasswordCorrect] = useState(null);
    const [emailCorrect, setEmailCorrect] = useState(null);
    const [correctUser, setCorrectUser] = useState(null);

    isCorrectEmail = email.split("@").length === 2 ? true : false;
    isCorrectPassword = password.length >= 8 ? true : false;

    const handleLogIn = async () => {
        setCorrectUser(null);

        setEmailCorrect(
            isCorrectEmail
                ? null
                : languageTranslate(
                      userData.language,
                      "Email does not meet requirements",
                      "Почта не соответствует требованиям"
                  )
        );

        setPasswordCorrect(
            isCorrectPassword
                ? null
                : languageTranslate(
                      userData.language,
                      "Password does not meet requirements",
                      "Пароль не соответствует требованиям"
                  )
        );

        if (isCorrectPassword && isCorrectEmail) {
            setPasswordCorrect(null);
            setEmailCorrect(null);

            LogInData.email = email;
            LogInData.password = password;

            console.log("----------LogIn-Data---------");

            try {
                const data1 = {
                    grant_type: "",
                    username: LogInData.email,
                    password: LogInData.password,
                    scope: "",
                    client_id: "",
                    client_secret: "",
                };
                console.log(data1);

                const response1 = await sendDataToServer(
                    data1,
                    "/login",
                    "/x-www-form-urlencoded"
                );
                console.log("fasdas");

                if (response1.detail == "Password is incorrect") {
                    isCorrectUser = false;

                    setCorrectUser("Почта или пароль введены неверно");
                } else if (response1.detail == "This user does not exist") {
                    isCorrectUser = false;
                    setCorrectUser("Почта или пароль введены неверно");
                } else if (response1.access_token) {
                    await AsyncStorage.setItem(
                        "access_token",
                        response1.access_token
                    );

                    const dataUserBD = await getTokenToServer(
                        response1.access_token,
                        "/auth/me",
                        "/json"
                    );

                    userData.access_token = response1.access_token;
                    userData.user = dataUserBD.role_id;
                    userData.email = dataUserBD.email;
                    userData.id = dataUserBD.id;

                    console.log("--userData--");

                    for (var key in userData) {
                        console.log(key + ": " + userData[key]);
                    }

                    // Mikhail.zimin.2004@bk.ru
                    // 11111111

                    if (userData.email) {
                        switch (userData.user) {
                            case 1:
                                navigation.navigate("LoadingSettingISScreen");
                                break;
                            case 2:
                                navigation.navigate(
                                    "LoadingSettingBuddyScreen"
                                );
                                break;
                        }
                    } else {
                        isCorrectUser = false;
                        console.log("no user in bd");
                    }
                }
            } catch (error) {
                console.log("Error logging in:", error);
            }
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate("PasswordRecoveryScreen");
    };

    return (
        <SafeAreaView style={form.main}>
            <ScrollView style={form.main}>
                <View style={form.form}>
                    {/* <BackButton /> */}
                    <Text style={form.textHeader}>
                        {languageTranslate(userData.language, "Log In", "Вход")}
                    </Text>
                    <View style={form.textInputs}>
                        <Text style={form.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Email",
                                "Email"
                            )}
                        </Text>
                        <TextInput
                            style={
                                isCorrectEmail
                                    ? form.textInput
                                    : form.unCorrectTextInput
                            }
                            placeholder=""
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />

                        <Text style={form.inputProblem}>
                            {isCorrectEmail ? null : emailCorrect}
                        </Text>

                        <Text style={form.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Password",
                                "Пароль"
                            )}
                        </Text>
                        <TextInput
                            style={
                                isCorrectPassword
                                    ? form.textInput
                                    : form.unCorrectTextInput
                            }
                            placeholder=""
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <Text style={form.inputProblem}>
                            {isCorrectPassword ? null : passwordCorrect}
                        </Text>

                        <Text style={form.inputProblem}>
                            {isCorrectUser ? null : correctUser}
                        </Text>

                        <TouchableOpacity
                            style={login.buttonMini}
                            title="Забыли пароль?"
                            onPress={handleForgotPassword}
                        >
                            <Text style={login.textButtonMini}>
                                {languageTranslate(
                                    userData.language,
                                    "Forgot your password?",
                                    "Забыли пароль?"
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={form.button}
                        title="Вход"
                        onPress={handleLogIn}
                    >
                        <Text style={form.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Log In",
                                "Войти"
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const login = StyleSheet.create({
    buttonMini: {
        padding: "2%",

        width: "75%",
        marginLeft: "27%",
        marginTop: "1%",
        alignItems: "center",

        borderRadius: 28,
    },
    textButtonMini: {
        width: "100%",
        color: "silver",
        textDecorationLine: "underline",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "right",
    },
});

export default LogInForm;
