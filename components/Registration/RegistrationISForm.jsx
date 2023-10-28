//2.2.3. Регистрация ИС

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

let correctPassword = false;
let correctEmail = false;

const RegistrationForm = ({ navigation }) => {
    var registrationISData = {
        university: '',
        email: '',
        password: '',
        passwordConfirm: '',
        randomCode: '',
    }

    const [university, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    correctPassword = (
        password.length > 0
        && password === passwordConfirm) ? true : false;
    correctEmail = email.split('@').length === 2 ? true : false;

    const handleRegistration = () => {
        if (correctPassword && correctEmail) {
            if (password === passwordConfirm) {
                console.log('----------IS-Data---------');

                registrationISData.university = university;
                registrationISData.email = email;
                registrationISData.password = password;
                registrationISData.passwordConfirm = passwordConfirm;

                //output registrationISData on backend
                //get userInBD from backend

                const randomCode = Math.floor(1000 + Math.random() * 9000);
                registrationISData.randomCode = randomCode;

                console.log(registrationISData);
                navigation.navigate(
                    'EmailScreen',
                    {
                        randomCode: registrationISData.randomCode,
                        user: 'IS',
                        isNewPassword: false,
                    });
            } else {
                console.log('--------------------');
                console.log(password, 'and', passwordConfirm, 'not match');
            }
        }
    };

    const handleLogIn = () => {
        console.log('handleLogIn');
        navigation.navigate('LogInForm');
    };

    const handleBuddy = () => {
        navigation.navigate('RegistrationBuddyForm');
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.registrationForm}>
                <Text style={styles.textHeader}>
                    Регистрация ИС
                </Text>
                <View style={styles.textInputs}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="University"
                        value={university}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={correctEmail ? styles.textInput : styles.unCorrectTextInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={correctPassword ? styles.textInput : styles.unCorrectTextInput}
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TextInput
                        style={correctPassword ? styles.textInput : styles.unCorrectTextInput}
                        secureTextEntry
                        placeholder="Password confirm"
                        value={passwordConfirm}
                        onChangeText={text => setPasswordConfirm(text)}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="Зарегистрироваться"
                        onPress={handleRegistration}>
                        <Text style={styles.text}>
                            Зарегистрироваться
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Я Сопровождающий"
                        onPress={handleBuddy}>
                        <Text style={styles.text}>
                            Я Сопровождающий
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Войти"
                        onPress={handleLogIn}>
                        <Text style={styles.text}>
                            Войти
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
        backgroundColor: 'white',
    },

    registrationForm: {
        display: 'flex',
        flex: 1,
        width: '80%',
        margin: '10%',
        padding: '10%',

        alignItems: 'center',

        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderRadius: 40,
        justifyContent: 'space-between',
    },

    textInputs: {
        flex: 1,
        width: '100%',
        padding: '10%',

        alignItems: 'center',
        borderRadius: 40,

        justifyContent: 'start',
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

export default RegistrationForm;
