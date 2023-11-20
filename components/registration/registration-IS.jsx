//2.2.3. Регистрация ИС

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendDataToServer,
    userData,
} from '../Utils.jsx';
import { styles } from '../main.jsx';


let correctPassword = true;
let correctEmail = true;

const RegistrationISScreen = ({ navigation }) => {
    // const [university, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

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
    correctPassword = (
        password.length > 0
        && password === passwordConfirm) ? true : false;

    const handleRegistration = async () => {
        if (!correctEmail) {
            console.log('uncorrect email');
            Alert.alert(languageTranslate(
                userData.language,
                'Uncorrect Email',
                'Некорректный Email'));
        }
        else if (password.length < 8) {
            console.log('password < 8');
            Alert.alert(languageTranslate(
                userData.language,
                'Password < 8',
                'Пароль < 8'));

        }
        else if (!correctPassword) {
            console.log('passwords not match');
            Alert.alert(languageTranslate(
                userData.language,
                'Passwords not match',
                'Пароли не совпадают'));

        }
        else if (correctPassword && correctEmail) {
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
                catch (e) {
                    console.log(e);
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
        <ScrollView style={styles.main}>
            <View style={styles.form}>
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
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Password confirm',
                            'Подтверждение пароля')}</Text>
                    <TextInput
                        style={correctPassword ? styles.textInput : styles.unCorrectTextInput}
                        secureTextEntry
                        placeholder=""
                        value={passwordConfirm}
                        onChangeText={text => setPasswordConfirm(text)}
                    />
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
        </ScrollView>
    );
};

export default RegistrationISScreen;
