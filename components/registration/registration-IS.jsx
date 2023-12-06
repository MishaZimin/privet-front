//2.2.3. Регистрация ИС

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendDataToServer,
    userData,
} from '../Utils.jsx';
import { styles } from '../main.jsx';
import BackButton from '../back-button.jsx';


let correctPassword = true;
let correctEmail = true;
let correctPasswords = true;


const RegistrationISScreen = ({ navigation }) => {
    // const [university, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [passwordCorrect, setPasswordCorrect] = useState(null);
    const [passwordsCorrect, setPasswordsCorrect] = useState(null);
    const [emailCorrect, setEmailCorrect] = useState(null);


    userData.fullName = '';
    userData.citizenship = '';
    userData.sex = '';
    userData.birthDate = '';

    userData.phone = '';
    userData.email = '';
    userData.telegram = '';
    userData.vk = '';
    userData.whatsApp = '';

    userData.nativeLanguage = '';
    userData.otherLanguage = '';
    userData.university = '';
    userData.escortIsPaid = '';

    correctEmail = email.split('@').length === 2 ? true : false;
    correctPassword = (password.length >= 8) ? true : false;
    correctPasswords = (password === passwordConfirm && password.length >= 8) ? true : false;


    const handleRegistration = async () => {
        setEmailCorrect(correctEmail ? null : languageTranslate(
            userData.language,
            'Email does not meet requirements',
            'Почта не соответствует требованиям'));

        setPasswordCorrect(correctPassword ? null : languageTranslate(
            userData.language,
            'Password does not meet requirements',
            'Пароль не соответствует требованиям'));

        setPasswordsCorrect(correctPasswords ? null : languageTranslate(
            userData.language,
            'Password mismatch',
            'Пароли не совпадают'));

        console.log(correctPasswords ? null : languageTranslate(
            userData.language,
            'Password mismatch',
            'Пароли не совпадают'))


        if (correctPassword && correctEmail && correctPasswords) {
            setPasswordCorrect(null);
            setPasswordsCorrect(null);
            setEmailCorrect(null);

            if (password === passwordConfirm) {
                console.log('--------IS-Registration---------');

                // registrationData.university = university;
                registrationData.email = email;
                registrationData.password = password;
                registrationData.passwordConfirm = passwordConfirm;
                registrationData.user = 1;
                registrationData.isNewPassword = false;

                try {
                    const data = {
                        "email": email,
                        "password": password,
                        "role_id": 1,
                    };

                    await sendDataToServer(data, "/register", "/json");
                    await sendDataToServer(0, "/send-verification-token/" + email, "/json");

                    console.log("--registration data--");
                    for (var key in registrationData) {
                        console.log(key + ': ' + registrationData[key]);
                    }

                    navigation.navigate('EmailScreen');
                }
                catch (err) {
                    console.log(err);
                }
            };
        };
    };

    const handleLogIn = () => {
        navigation.navigate('LogInForm');
    };

    const handleBuddy = () => {
        navigation.navigate('RegistrationBuddyScreen');
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Sign Up',
                            'Регистрация ИС')}
                    </Text>
                    <View style={styles.textInputs}>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Email',
                                'Email')}</Text>
                        <TextInput
                            style={correctEmail ? styles.textInput : styles.unCorrectTextInput}
                            placeholder=""
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <Text>{correctEmail ? null : emailCorrect}</Text>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Password',
                                'Пароль')}</Text>



                        <TextInput
                            style={correctPassword ? styles.textInput : styles.unCorrectTextInput}
                            secureTextEntry
                            placeholder=""
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        <Text>{correctPassword ? null : passwordCorrect}</Text>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Password confirm',
                                'Подтверждение пароля')}</Text>

                        <TextInput
                            style={correctPasswords ? styles.textInput : styles.unCorrectTextInput}
                            secureTextEntry
                            placeholder=""
                            value={passwordConfirm}
                            onChangeText={text => setPasswordConfirm(text)}
                        />
                        <Text>{correctPasswords ? null : passwordsCorrect}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            title="Зарегистрироваться"
                            onPress={handleRegistration}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Registration',
                                    'Зарегистрироваться')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="Я Сопровождающий"
                            onPress={handleBuddy}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'I am a Buddy',
                                    'Я Сопровождающий')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="Войти"
                            onPress={handleLogIn}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Log In',
                                    'Войти')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView></SafeAreaView>
    );
};

export default RegistrationISScreen;
