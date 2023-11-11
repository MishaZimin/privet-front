//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
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



let correctPassword = false;
let correctEmail = false;

const RegistrationBuddySreen = ({ navigation }) => {
    const [university, setName] = useState('');
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
    userData.user = '';

    correctPassword = (
        password.length > 0
        && password === passwordConfirm) ? true : false;
    correctEmail = email.includes('@') ? true : false;

    const handleRegistration = async () => {
        if (correctPassword && correctEmail) {
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
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>
                    {languageTranslate(
                        userData.language,
                        'Registration Buddy',
                        'Регистрация Сопровождающего')}
                </Text>
                <View style={styles.textInputs}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'University',
                            value: 'University',
                        }}
                        style={{
                            inputIOS: {
                                width: '100%',
                                padding: '5%',
                                marginTop: '10%',

                                borderWidth: 1,
                                borderRadius: 40,
                                borderColor: 'grey',
                            },
                            inputAndroid: {
                                width: '100%',
                                padding: '5%',
                                marginTop: '10%',

                                borderWidth: 1,
                                borderRadius: 40,
                                borderColor: 'grey',
                            },
                        }}
                        onValueChange={(value) => setName(value)}
                        items={[
                            { label: 'Urfu1', value: 'Urfu1' },
                            { label: 'Urfu2', value: 'Urfu2' },
                            { label: 'Urfu3', value: 'Urfu3' },
                        ]}
                    />
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
                    <TextInput
                        style={correctPassword ? styles.textInput : styles.unCorrectTextInput}
                        placeholder="Password confirm"
                        secureTextEntry
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
                </View>
            </View>
        </ScrollView>
    );
};

export default RegistrationBuddySreen;
