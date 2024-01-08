//2.2.3. Регистрация ИС

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { getJSONFromServer, sendJSONToServer } from './serverUtils.js';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendDataToServer,
    sendChangePasswordToServer,
    userData,
} from "../Utils.jsx";
import { form } from "../registration/registration-IS.jsx";

import BackButton from "../back-button.jsx";
import { styles } from "../main.jsx";

let correctPassword = true;
let correctPasswords = true;

const SetNewPasswordScreen = ({ navigation }) => {
    // var newPasswordData = {
    //     newPassword: '',
    //     SetNewPasswordScreenasswordConfirm: '',
    // }

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [passwordCorrect, setPasswordCorrect] = useState(null);
    const [passwordsCorrect, setPasswordsCorrect] = useState(null);

    correctPassword = password.length >= 8 ? true : false;
    correctPasswords =
        password === passwordConfirm && password.length >= 8 ? true : false;

    const handleSetNewPassword = async () => {
        setPasswordCorrect(
            correctPassword
                ? null
                : languageTranslate(
                      userData.language,
                      "Password does not meet requirements",
                      "Пароль не соответствует требованиям"
                  )
        );

        setPasswordsCorrect(
            correctPasswords
                ? null
                : languageTranslate(
                      userData.language,
                      "Password mismatch",
                      "Пароли не совпадают"
                  )
        );

        if (correctPassword && correctPasswords) {
            setPasswordCorrect(null);
            setPasswordsCorrect(null);

            if (password === passwordConfirm) {
                console.log("----------newPasswordData---------");

                // const data = {
                //     "old_password": password,
                //     "new_password": passwordConfirm,
                // };

                const data = {
                    email: registrationData.email,
                    new_password: password,
                };

                const newPassword = await sendChangePasswordToServer(
                    data,
                    "/auth/forgot-password",
                    "/json"
                );
                console.log("newPasswordData:", newPassword);
                registrationData.password = password;
                registrationData.passwordConfirm = passwordConfirm;

                //output newPasswordData on backend

                navigation.navigate("LogInForm");
            } else {
                console.log("--------------------");
                console.log(password, "and", passwordConfirm, "not match");
            }
        }
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            "Setting a new password",
                            "Установка нового пароля"
                        )}
                    </Text>
                    <View style={styles.textInputs}>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Password",
                                "Пароль"
                            )}
                        </Text>

                        <TextInput
                            style={
                                correctPassword
                                    ? styles.textInput
                                    : styles.unCorrectTextInput
                            }
                            secureTextEntry
                            placeholder=""
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Text>{correctPassword ? null : passwordCorrect}</Text>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Password confirm",
                                "Подтверждение пароля"
                            )}
                        </Text>

                        <TextInput
                            style={
                                correctPasswords
                                    ? styles.textInput
                                    : styles.unCorrectTextInput
                            }
                            secureTextEntry
                            placeholder=""
                            value={passwordConfirm}
                            onChangeText={(text) => setPasswordConfirm(text)}
                        />
                        <Text>
                            {correctPasswords ? null : passwordsCorrect}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        title="Готово"
                        onPress={handleSetNewPassword}
                    >
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Ready",
                                "Готово"
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SetNewPasswordScreen;
