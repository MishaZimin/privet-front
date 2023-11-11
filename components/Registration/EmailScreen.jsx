import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendDataToServer,
    userData,
} from '../Utils.jsx';
import { styles } from '../main.jsx';



let correctEmail = true;

const EmailScreen = ({ navigation }) => {
    const [emailCode, setEmailCode] = useState('');

    correctEmail = emailCode.length === 4 ? true : false;

    const handleEmailScreen = async () => {
        try {
            console.log('----------EmailCode----------');
            // console.log('EmailCodeOutput:', randomCode);
            // console.log('EmailCodeInput: ', emailCode);

            const data = {
                "email": registrationData.email,
                "token": emailCode,
            };

            const response = await sendDataToServer(data, "/verify-email", "/json");

            console.log("Response:", response.detail);

            let isCorrectToken = (response.detail == "Token is incorrect") ? false : true;


            console.log("isCorrectToken:", isCorrectToken);

            if (isCorrectToken) {
                console.log('код верный');
                Alert.alert('код верный');

                userData.email = registrationData.email;
                userData.language = registrationData.language;
                userData.user = registrationData.user;

                if (registrationData.isNewPassword) {
                    navigation.navigate('SetNewPasswordScreen')
                }
                else {
                    const data1 = {
                        'grant_type': "",
                        'username': registrationData.email,
                        'password': registrationData.password,
                        'scope': "",
                        'client_id': "",
                        'client_secret': "",
                    };

                    console.log("data1: ", data1);

                    // Выполнение первого запроса
                    const response1 = await sendDataToServer(data1, "/login", "/x-www-form-urlencoded");
                    console.log('Response from server 1:', response1);

                    await AsyncStorage.setItem('access_token', response1.access_token);

                    switch (registrationData.user) {
                        case 1: navigation.navigate('LoadingSettingISScreen');
                        case 2: navigation.navigate('LoadingSettingBuddyScreen');
                    }

                    // if (registrationData.user === 1) {
                    //     navigation.navigate('LoadingSettingISScreen');
                    // }
                    // if (registrationData.user === 2) {
                    //     navigation.navigate('LoadingSettingBuddyScreen');
                    // }
                }
            } else {
                console.log('код неверный');
                Alert.alert('код неверный');
            }

            console.log('user:', registrationData.user);
            console.log('recovery?:', registrationData.isNewPassword);
        }
        catch (e) {
            console.log(e);
        }
    };

    const handleNotEmailCode = () => {
        Alert.alert(languageTranslate(
            userData.language,
            'Did not get the email?',
            'Не получили письмо?'), '', [
            {
                text: languageTranslate(
                    userData.language,
                    'Send the code again',
                    'Отправить код еще раз'),

                onPress: () => sendCodeAgain(),
            },
            {
                text: languageTranslate(
                    userData.language,
                    'Contact support',
                    'Связаться с поддержкой'),
                onPress: () => contactSupport(),
            },
            {
                text: languageTranslate(
                    userData.language,
                    'Close',
                    'Закрыть'),
                onPress: () => console.log('Закрыть Pressed'),
                style: 'cancel',
            },
        ]);
    }

    const sendCodeAgain = async () => {
        sendDataToServer(0, "/send-verification-token/" + registrationData.email, "/json");
    };

    const contactSupport = () => {
        navigation.navigate('SupportScreen');
    }

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.text}>
                    {languageTranslate(
                        userData.language,
                        'We have sent a confirmation code to your email',
                        'Мы отправили код подтверждения на вашу электронную почту')}
                </Text>
                <Text style={styles.text}>
                    {languageTranslate(
                        userData.language,
                        'Enter the code in the field below:',
                        'Введите код в поле ниже:')}
                </Text>
                <View style={styles.textInputs}>
                    <TextInput
                        style={correctEmail ? styles.textInput : styles.unCorrectTextInput}
                        placeholder="код подтверждения"
                        secureTextEntry
                        value={emailCode}
                        onChangeText={text => setEmailCode(text)} />

                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="Далее"
                        onPress={handleEmailScreen}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Next',
                                'Далее')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Не получили письмо?"
                        onPress={handleNotEmailCode}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Did not get the email?',
                                'Не получили письмо?')}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

export default EmailScreen;
