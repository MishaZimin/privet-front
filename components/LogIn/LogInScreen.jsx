//2.2.3. Регистрация Сопровождающего

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendDataToServer,

    userData,
    sendRequest,
} from '../Utils.jsx';
import { styles } from '../main.jsx';


let correctPassword = false;
let correctEmail = false;

const LogInForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    correctPassword = (password.length > 0) ? true : false;
    correctEmail = email.includes('@') ? true : false;

    const handleLogIn = async () => {
        if (correctPassword && correctEmail) {
            LogInData.email = email;
            LogInData.password = password;

            userData.email = email;
            userData.user = 'IS';

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

                // Выполнение первого запроса
                const response1 = await sendDataToServer(data1, "/login", "/x-www-form-urlencoded");
                console.log('Response from server 1:', response1);

                if (response1.detail) {
                    Alert.alert('ошибка где-то');
                } else if (response1.access_token) {
                    // Сохранение токена в AsyncStorage и выполнение следующего запроса
                    await AsyncStorage.setItem('access_token', response1.access_token);

                    // Выполнение второго запроса


                    userData.access_token = response1.access_token;

                    let userInBD = true;
                    let userType = 1;
                    userData.user = userType;

                    if (userInBD) {
                        switch (userType) {
                            case 1:
                                navigation.navigate('StudentsScreen');
                                break;
                            case 2:
                                navigation.navigate('BuddysScreen');
                                break;
                        }
                    } else {
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
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>
                    {languageTranslate(registrationData.language, 'Log In', 'Вход')}
                </Text>
                <View style={styles.textInputs}>
                    <TextInput
                        style={correctEmail ? styles.textInput : styles.unCorrectTextInput}

                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={correctPassword ? styles.textInput : styles.unCorrectTextInput}

                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="Вход"
                        onPress={handleLogIn}>
                        <Text style={styles.textButton}>
                            {languageTranslate(registrationData.language, 'Log In', 'Вход')}

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Забыли пароль?"
                        onPress={handleForgotPassword}>
                        <Text style={styles.textButton}>
                            {languageTranslate(registrationData.language, 'Forgot your password?', 'Забыли пароль?')}

                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
