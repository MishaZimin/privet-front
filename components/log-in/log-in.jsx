//2.2.3. Регистрация Сопровождающего

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendDataToServer,
    getTokenToServer,

    userData,
    sendRequest,
} from '../Utils.jsx';
import { styles } from '../main.jsx';
import BackButton from '../back-button.jsx';

let isCorrectPassword = true;
let isCorrectEmail = true;
let isCorrectUser = true;

const LogInForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [passwordCorrect, setPasswordCorrect] = useState(null);
    const [emailCorrect, setEmailCorrect] = useState(null);
    const [correctUser, setCorrectUser] = useState(null);


    isCorrectEmail = email.split('@').length === 2 ? true : false;
    isCorrectPassword = (password.length >= 8) ? true : false;

    const handleLogIn = async () => {
        setCorrectUser(null);

        setEmailCorrect(isCorrectEmail ? null : languageTranslate(
            userData.language,
            'Email does not meet requirements',
            'Почта не соответствует требованиям'));

        setPasswordCorrect(isCorrectPassword ? null : languageTranslate(
            userData.language,
            'Password does not meet requirements',
            'Пароль не соответствует требованиям'));


        if (isCorrectPassword && isCorrectEmail) {
            setPasswordCorrect(null);
            setEmailCorrect(null);

            LogInData.email = email;
            LogInData.password = password;

            console.log('----------LogIn-Data---------');

            try {
                const data1 = {
                    'grant_type': "",
                    'username': LogInData.email,
                    'password': LogInData.password,
                    'scope': "",
                    'client_id': "",
                    'client_secret': "",
                };

                const response1 = await sendDataToServer(data1, "/login", "/x-www-form-urlencoded");

                if (response1.detail == "Password is incorrect") {
                    isCorrectUser = false;

                    setCorrectUser('Почта или пароль введены неверно');
                    // Alert.alert('ошибка в пароле');
                }
                else if (response1.detail == "This user does not exist") {
                    isCorrectUser = false;
                    setCorrectUser('Почта или пароль введены неверно');


                    // Alert.alert('ошибка в почте');
                }
                else if (response1.access_token) {
                    await AsyncStorage.setItem('access_token', response1.access_token);

                    const dataUserBD = await getTokenToServer(response1.access_token, "/auth/me", "/json");

                    userData.access_token = response1.access_token;
                    userData.user = dataUserBD.role_id;
                    userData.email = dataUserBD.email;
                    userData.id = dataUserBD.id;

                    console.log("--userData--");

                    for (var key in userData) {
                        console.log(key + ': ' + userData[key]);
                    }

                    // Mikhail.zimin.2004@bk.ru
                    // 11111111

                    if (userData.email) {
                        switch (userData.user) {
                            case 1:
                                navigation.navigate('StudentsScreen');
                                break;
                            case 2:
                                navigation.navigate('LoadingSettingBuddyScreen');
                                break;
                        }
                    } else {
                        isCorrectUser = false;
                        console.log('no user in bd');
                    }
                }
            } catch (error) {
                console.log('Error logging in:', error);
            }
        }
    };


    const handleForgotPassword = () => {
        navigation.navigate('PasswordRecoveryScreen');
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <Text style={styles.textHeader}>
                        {languageTranslate(userData.language, 'Log In', 'Вход')}
                    </Text>
                    <View style={styles.textInputs}>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Email',
                                'Email')}</Text>
                        <TextInput
                            style={isCorrectEmail ? styles.textInput : styles.unCorrectTextInput}

                            placeholder=""
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <Text>{isCorrectEmail ? null : emailCorrect}</Text>
                        {isCorrectEmail ? null : <Text>{emailCorrect}</Text>}

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Password',
                                'Пароль')}</Text>
                        <TextInput
                            style={isCorrectPassword ? styles.textInput : styles.unCorrectTextInput}

                            placeholder=""
                            secureTextEntry
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />

                        {isCorrectPassword ? null : <Text>{passwordCorrect}</Text>}
                        {isCorrectUser ? null : <Text>{correctUser}</Text>}
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            title="Вход"
                            onPress={handleLogIn}>
                            <Text style={styles.textButton}>
                                {languageTranslate(userData.language, 'Log In', 'Вход')}

                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="Забыли пароль?"
                            onPress={handleForgotPassword}>
                            <Text style={styles.textButton}>
                                {languageTranslate(userData.language, 'Forgot your password?', 'Забыли пароль?')}

                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView></SafeAreaView>
    );
};

const sendJSONLogInToServer = async (data) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: 'include',
            body: new URLSearchParams(data).toString()
        });
        const responseData = await res.json();
        console.log(responseData);
        return responseData;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const getUserDataServer = async (token) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com/users/me", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer" + token,
            },
            credentials: 'include',
            body: new URLSearchParams(data).toString()
        });
        const userData = await res.json();
        console.log(userData);
        return userData;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default LogInForm;
