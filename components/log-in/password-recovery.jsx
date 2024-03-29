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
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendDataToServer,
    getUserByEmailFromServer,
    userData,
} from "../Utils.jsx";
import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";
import { form } from "../registration/registration-IS.jsx";

let isCorrectEmail = false;
let isEmailInBD = false;

const PasswordRecoveryScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [emailCorrect, setEmailCorrect] = useState(null);
    const [noEmail, setNoEmail] = useState(null);

    isCorrectEmail = email.split("@").length === 2 ? true : false;

    const handlePasswordRecovery = async () => {
        try {
            setNoEmail(null);
            setEmailCorrect(
                isCorrectEmail
                    ? null
                    : languageTranslate(
                          userData.language,
                          "Email does not meet requirements",
                          "Почта не соответствует требованиям"
                      )
            );

            if (isCorrectEmail) {
                setEmailCorrect(null);

                registrationData.email = email;
                registrationData.isNewPassword = true;

                let response1 = await getUserByEmailFromServer(
                    "/auth/get-user/" + email,
                    "/json"
                );
                let response2 = await sendDataToServer(
                    email,
                    "/send-verification-token/" + email,
                    "/json"
                );

                // console.log('response1:', response1);
                // console.log('response1:', response1);

                if (response1.detail) {
                    setNoEmail("Пожалуйста, введите верный адрес");
                    // console.log('нет такой почты')
                } else {
                    //send registrationData on backend
                    //get userEmailInBD: true/false, user: IS/Buddy

                    let userEmailInBD = "true";
                    let user = "Buddy";

                    registrationData.user = user;

                    // console.log('---------registration-Data---------');
                    // console.log(registrationData);

                    if (userEmailInBD == "true") {
                        navigation.navigate("EmailScreen");
                    } else {
                        console.log("no user in bd");
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleForgotPassword = () => {
        console.log("Forgot Password");
    };

    return (
        <SafeAreaView style={form.main}>
            <ScrollView style={form.main}>
                <View style={form.form}>
                    {/* <BackButton /> */}
                    <Text style={form.textHeader}>
                        {languageTranslate(
                            userData.language,
                            "Password recovery screen",
                            "Экран восстановления пароля"
                        )}
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

                        {isCorrectEmail ? null : <Text>{emailCorrect}</Text>}
                        {isEmailInBD ? null : <Text>{noEmail}</Text>}
                    </View>

                    <TouchableOpacity
                        style={form.button}
                        title="Далее"
                        onPress={handlePasswordRecovery}
                    >
                        <Text style={form.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                "Next",
                                "Далее"
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PasswordRecoveryScreen;
