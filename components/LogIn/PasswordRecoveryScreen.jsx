//2.2.3. Регистрация Сопровождающего

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendDataToServer,
    getUserByEmailFromServer,
} from '../Utils.jsx';
import { styles } from '../main.jsx';

let correctEmail = false;

const PasswordRecoveryScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    correctEmail = email.includes('@') ? true : false;

    const handlePasswordRecovery = async () => {
        try {
            if (correctEmail) {
                registrationData.email = email;
                registrationData.isNewPassword = true;

                let response1 = await getUserByEmailFromServer("/auth/get-user/" + email, "/json");
                let response2 = await sendDataToServer(email, "/send-verification-token/" + email, "/json");

                console.log('response1:', response1);
                console.log('response1:', response1);

                if (response1.detail) {
                    console.log('нет такой почты')
                }
                else {

                    const randomCode = Math.floor(1000 + Math.random() * 9000);
                    registrationData.randomCode = randomCode;

                    //send registrationData on backend
                    //get userEmailInBD: true/false, user: IS/Buddy

                    let userEmailInBD = 'true';
                    let user = 'Buddy';

                    registrationData.user = user;

                    console.log('---------registration-Data---------');
                    console.log(registrationData);


                    if (userEmailInBD == 'true') {
                        navigation.navigate('EmailScreen');
                    }
                    else {
                        console.log('no user in bd');
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    const handleForgotPassword = () => {
        console.log('Forgot Password');
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>
                    {languageTranslate(registrationData.language, 'Password recovery screen', 'Экран восстановления пароля')}
                </Text>
                <View style={styles.textInputs}>
                    <TextInput
                        style={correctEmail ? styles.textInput : styles.unCorrectTextInput}

                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>


                <TouchableOpacity
                    style={styles.button}
                    title="Далее"
                    onPress={handlePasswordRecovery}>
                    <Text style={styles.textButton}>
                        {languageTranslate(registrationData.language, 'Next', 'Далее')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};




export default PasswordRecoveryScreen;
