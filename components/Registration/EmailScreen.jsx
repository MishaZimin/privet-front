import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendDataToServer
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

                if (registrationData.isNewPassword) {
                    console.log('jfksldjfsklj');
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

                    // switch (registrationData.user) {
                    //     case 1: registrationData.isNewPassword ? navigation.navigate('SetNewPasswordScreen') : navigation.navigate('LoadingSettingISScreen');
                    //     case 2: registrationData.isNewPassword ? navigation.navigate('SetNewPasswordScreen') : navigation.navigate('LoadingSettingBuddyScreen');
                    // }

                    if (registrationData.user === 1) {
                        registrationData.isNewPassword ? navigation.navigate('SetNewPasswordScreen') : navigation.navigate('LoadingSettingISScreen');
                    }
                    if (registrationData.user === 2) {
                        registrationData.isNewPassword ? navigation.navigate('SetNewPasswordScreen') : navigation.navigate('LoadingSettingBuddyScreen');
                    }
                }
            } else {
                console.log('код неверный');
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
            registrationData.language,
            'Did not get the email?',
            'Не получили письмо?'), '', [
            {
                text: languageTranslate(
                    registrationData.language,
                    'Send the code again',
                    'Отправить код еще раз'),

                onPress: () => sendCodeAgain(),
            },
            {
                text: languageTranslate(
                    registrationData.language,
                    'Contact support',
                    'Связаться с поддержкой'),
                onPress: () => contactSupport(),
            },
            {
                text: languageTranslate(
                    registrationData.language,
                    'Close',
                    'Закрыть'),
                onPress: () => console.log('Закрыть Pressed'),
                style: 'cancel',
            },
        ]);
    }

    const sendCodeAgain = () => {
        //send "sendCodeAgain" on backend
        //get randomCode from backend

        const randomCode = Math.floor(1000 + Math.random() * 9000);
        registrationData.randomCode = randomCode;

        console.log(registrationData.randomCode)
    };

    const contactSupport = () => {
        console.log('Связаться с поддержкой');
        navigation.navigate('SupportScreen');


    }

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.text}>
                    {languageTranslate(
                        registrationData.language,
                        'We have sent a confirmation code to your email',
                        'Мы отправили код подтверждения на вашу электронную почту')}
                </Text>
                <Text style={styles.text}>
                    {languageTranslate(
                        registrationData.language,
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
                                registrationData.language,
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
                                registrationData.language,
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
