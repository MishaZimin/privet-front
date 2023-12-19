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
        <SafeAreaView style={form.main}>
            <ScrollView style={form.main}>
                <View style={form.form}>
                    <BackButton />
                    <Text style={form.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Sign Up',
                            'Регистрация')}
                    </Text>
                    <View style={form.textInputs}>
                        <Text style={form.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'E-mail',
                                'E-mail')}</Text>
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
                    {/* <View style={form.buttons}> */}
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
                    {/* <TouchableOpacity
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
                        </TouchableOpacity> */}
                    {/* </View> */}
                </View>
            </ScrollView></SafeAreaView>
    );
};

export const form = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    form: {
        flex: 1,
        gap: 0,
        backgroundColor: 'white',
    },

    welcomeTextForm: {
        flex: 5,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },

    welcomeText: {
        width: '90%',
        marginLeft: '5%',
    },

    textHeader: {

        paddingLeft: '10%',
        paddingBottom: '30%',
        fontWeight: '700',
        fontSize: 30,
    },

    text: {
        width: '80%',
        paddingLeft: '10%',
        // paddingBottom: '2%',


        fontWeight: '300',
        fontSize: 20,
    },

    img: {

        flex: 4,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        width: '50%',
        marginLeft: '25%',
    },

    button: {
        padding: '4%',
        margin: '2%',
        width: '75%',
        marginLeft: '12.5%',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'grey',
        borderRadius: 28,
        shadowColor: 'grey',
    },
    buttonImg: {
        height: 50,
        width: '60%',
    },
    textButton: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
    },

    buttonForm: {
        position: 'absolute',
        width: '100%',
        bottom: '10%',
    },

    textInputs: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        padding: '5%',
        marginBottom: '30%',


        justifyContent: 'start',
    },



    text: {
        width: '100%',
    },

    text1: {
        padding: '1%',
        width: '100%',
    },

    textInput: {
        width: '100%',
        padding: '1%',
        marginTop: '0%',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },


    inputHeader: {
        marginTop: '10%',
        textAlign: 'left',
        marginLeft: '1%',
        marginBottom: '2%',
        color: 'grey',
    },

    unCorrectTextInput: {
        width: '100%',
        padding: '1%',
        marginTop: '0%',
        borderBottomWidth: 1,

        borderColor: 'red',
    },
    inputProblem: {
        paddingTop: '2%',
        color: 'red',
        fontSize: 12,
    },
    buttonMini: {
        padding: '4%',
        margin: '2%',
        width: '75%',
        marginLeft: '12.5%',
        alignItems: 'center',

        borderRadius: 28,

    },
    textButtonMini: {
        width: '100%',
        color: 'silver',
        textDecorationLine: 'underline',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'right',
    }
});

export default RegistrationISScreen;
