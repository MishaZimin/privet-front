//2.2.3. Регистрация Сопровождающего

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

let correctPassword = false;
let correctEmail = false;

const LogInForm = ({ navigation }) => {
    var LogInData = {
        email: '',
        password: '',
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    correctPassword = (password.length > 0) ? true : false;
    correctEmail = email.includes('@') ? true : false;

    const handleLogIn = () => {
        if (correctPassword && correctEmail) {
            LogInData.email = email;
            LogInData.password = password;

            console.log('----------LogIn-Data---------');
            console.log(LogInData);

            //output LogInData on backend
            //с бэка приходит userInBD: true/false, user: IS/Buddy

            let userInBD = 'true';
            let user = 'Buddy';

            if (userInBD == 'true') {
                if (user == 'IS') {
                    navigation.navigate('StudentsScreen');
                }
                if (user == 'Buddy') {
                    navigation.navigate('BuddysScreen');
                }
            }
            else {
                console.log('no user in bd');
            }
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('PasswordRecoveryScreen');
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.logInForm}>
                <Text style={styles.textHeader}>
                    Вход
                </Text>
                <View style={styles.textInputs}>
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
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="Вход"
                        onPress={handleLogIn}>
                        <Text style={styles.text}>
                            Вход
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Забыли пароль?"
                        onPress={handleForgotPassword}>
                        <Text style={styles.text}>
                            Забыли пароль?
                        </Text>
                    </TouchableOpacity>
                </View>
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
    logInForm: {
        position: 'flex-start',
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

    textHeader: {
        paddingBottom: '10%',
    },

    textInputs: {
        flex: 3,

        padding: '5%',
        width: '100%',
    },

    textInput: {
        width: '100%',
        padding: '3%',
        marginTop: '10%',

        borderBottomWidth: 1,
        borderColor: 'grey',
    },

    unCorrectTextInput: {
        width: '100%',
        padding: '3%',
        marginTop: '10%',

        borderBottomWidth: 1,
        borderColor: 'red',
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

export default LogInForm;
