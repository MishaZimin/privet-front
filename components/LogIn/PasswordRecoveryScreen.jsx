//2.2.3. Регистрация Сопровождающего

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendDataToServer
} from '../Utils.jsx';
import { styles } from '../main.jsx';

let correctEmail = false;

const PasswordRecoveryScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    correctEmail = email.includes('@') ? true : false;

    const handlePasswordRecovery = () => {
        if (correctEmail) {
            registrationData.email = email;
            registrationData.isNewPassword = true;

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
