//2.2.3. Регистрация Сопровождающего

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

let correctEmail = false;

const PasswordRecoveryScreen = ({ navigation }) => {
    var EmailData = {
        email: '',
        randomCode: '',
        user: '',
    }

    const [email, setEmail] = useState('');

    correctEmail = email.includes('@') ? true : false;

    const handlePasswordRecovery = () => {
        if (correctEmail) {
            EmailData.email = email;
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            EmailData.randomCode = randomCode;

            console.log('----------Email-Data---------');
            console.log(EmailData);

            //output EmailData on backend
            //с бэка приходит userEmailInBD: true/false, user: IS/Buddy

            let userEmailInBD = 'true';
            let user = 'Buddy';

            EmailData.user = user;

            if (userEmailInBD == 'true') {
                navigation.navigate('EmailScreen',
                    {
                        randomCode: EmailData.randomCode,
                        user: EmailData.user,
                        isNewPassword: true,
                    });
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
            <View style={styles.passwordRecoveryForm}>
                <Text style={styles.text}>
                    Экран восстановления пароля
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
                    <Text style={styles.text}>
                        Далее
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
    },

    passwordRecoveryForm: {
        flex: 1,
        width: '80%',
        margin: '10%',
        padding: '10%',

        alignItems: 'center',

        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderRadius: 40,

        justifyContent: 'center',

        // backgroundColor: 'silver',
    },

    textInputs: {
        flex: 1,
        width: '100%',
        padding: '10%',

        alignItems: 'center',
        borderRadius: 40,
        // backgroundColor: 'plum',
    },

    unCorrectTextInput: {
        width: '100%',
        padding: '3%',
        marginTop: '10%',

        borderBottomWidth: 1,
        borderColor: 'red',
    },

    textHeader: {
        paddingBottom: '10%',


    },

    textInput: {
        width: '100%',
        padding: '3%',
        marginTop: '10%',

        borderBottomWidth: 1,
        borderColor: 'grey',


    },

    buttons: {
        flex: 1,

        marginTop: '10%',
    },

    button: {
        padding: '5%',
        margin: '2%',

        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 40,
    },
});

export default PasswordRecoveryScreen;
