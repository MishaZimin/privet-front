//2.2.3. Регистрация ИС

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { getJSONFromServer, sendJSONToServer } from './serverUtils.js';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendDataToServer
} from '../Utils.jsx';


import { styles } from '../main.jsx';


const SetNewPasswordScreen = ({ navigation }) => {
    // var newPasswordData = {
    //     newPassword: '',
    //     SetNewPasswordScreenasswordConfirm: '',
    // }

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    let correctPassword = (
        password.length > 0 &&
        password === passwordConfirm
    ) ? true : false;

    const handleSetNewPassword = () => {
        if (correctPassword) {

            if (password === passwordConfirm) {
                console.log('----------newPasswordData---------');

                const data = {
                    "old_password": password,
                    "new_password": passwordConfirm,
                };

                const newPassword = sendChaingePasswordToServer(data);
                console.log('newPasswordData:', newPassword);
                registrationData.password = password;
                registrationData.passwordConfirm = passwordConfirm;

                //output newPasswordData on backend

                navigation.navigate('LogInForm');
            } else {
                console.log('--------------------');
                console.log(password, 'and', passwordConfirm, 'not match');
            }
        }
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>
                    {languageTranslate(
                        registrationData.language,
                        'Setting a new password',
                        'Установка нового пароля')}
                </Text>
                <View style={styles.textInputs}>
                    <TextInput
                        style={correctPassword ? styles.textInput : styles.unCorrectTextInput}

                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TextInput
                        style={correctPassword ? styles.textInput : styles.unCorrectTextInput}

                        placeholder="Password confirm"
                        secureTextEntry
                        value={passwordConfirm}
                        onChangeText={text => setPasswordConfirm(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    title="Готово"
                    onPress={handleSetNewPassword}>
                    <Text style={styles.textButton}>
                        {languageTranslate(
                            registrationData.language,
                            'Ready',
                            'Готово')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const sendChaingePasswordToServer = async (data) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com/users/me/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        const responseData = await res.json();
        console.log('responseData new password:', responseData);
        return responseData;
    } catch (err) {
        console.log('err token new password:', err);
        throw err;
    }
}

export default SetNewPasswordScreen;
