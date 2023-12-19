//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
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
import { form } from './registration-IS.jsx';


let correctPassword = false;
let correctEmail = false;
let correctPasswords = true;

const RegistrationBuddySreen = ({ navigation }) => {
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
    userData.user = '';

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

        if (correctPassword && correctEmail && correctPasswords) {
            if (password === passwordConfirm) {
                console.log('----------Buddy-Data---------');

                registrationData.university = university;
                registrationData.email = email;
                registrationData.password = password;
                registrationData.passwordConfirm = passwordConfirm;
                registrationData.user = 2;
                registrationData.isNewPassword = false;

                try {
                    const data = {
                        "email": email,
                        "password": password,
                        "role_id": 2,
                    };

                    await sendDataToServer(data, "/register", "/json");
                    // //get userInBD from backend
                    // var data = getJSONFromServer();

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
            } else {
                console.log('--------------------');
                console.log(password, 'and', passwordConfirm, 'not match');
            }
        }
    };

    return (
        <SafeAreaView style={form.main}>
            <ScrollView style={form.main}>
                <View style={form.form}>
                    <BackButton />
                    <Text style={form.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Sign Up',
                            'Регистрация Сопровождающего')}
                    </Text>
                    <View style={form.textInputs}>
                        <Text style={form.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Email',
                                'Email')}</Text>
                        <TextInput
                            style={correctEmail ? form.textInput : form.unCorrectTextInput}
                            placeholder=""
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <Text style={form.inputProblem}>{correctEmail ? null : emailCorrect}</Text>
                        <Text style={form.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Password',
                                'Пароль')}</Text>



                        <TextInput
                            style={correctPassword ? form.textInput : form.unCorrectTextInput}
                            secureTextEntry
                            placeholder=""
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        <Text style={form.inputProblem}>{correctPassword ? null : passwordCorrect}</Text>
                        <Text style={form.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Password confirm',
                                'Подтверждение пароля')}</Text>

                        <TextInput
                            style={correctPasswords ? form.textInput : form.unCorrectTextInput}
                            secureTextEntry
                            placeholder=""
                            value={passwordConfirm}
                            onChangeText={text => setPasswordConfirm(text)}
                        />
                        <Text style={form.inputProblem}>{correctPasswords ? null : passwordsCorrect}</Text>
                    </View>
                    {/* <View style={styles.buttons}> */}
                    <TouchableOpacity
                        style={form.button}
                        title="Зарегистрироваться"
                        onPress={handleRegistration}>
                        <Text style={form.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Registration',
                                'Зарегистрироваться')}
                        </Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
            </ScrollView></SafeAreaView>
    );
};

export default RegistrationBuddySreen;
