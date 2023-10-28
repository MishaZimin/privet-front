//2.2.3. Регистрация ИС

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SetNewPasswordScreen = ({ navigation }) => {
    var newPasswordData = {
        newPassword: '',
        SetNewPasswordScreenasswordConfirm: '',
    }

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    let correctPassword = (
        password.length > 0 &&
        password === passwordConfirm
    ) ? true : false;

    const handleSetNewPassword = () => {
        if (correctPassword) {

            if (password === passwordConfirm) {
                console.log('----------newPasswordData---------');

                newPasswordData.password = password;
                newPasswordData.passwordConfirm = passwordConfirm;

                //output newPasswordData on backend

                navigation.navigate('LogInForm');
            } else {
                console.log('--------------------');
                console.log(password, 'and', passwordConfirm, 'not match');
            }
        }
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.newPasswordForm}>
                <Text style={styles.text}>Установка нового пароля
                </Text>
                <View style={styles.textInputs}>
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

                <TouchableOpacity
                    style={styles.button}
                    title="Готово"
                    onPress={handleSetNewPassword}>
                    <Text style={styles.text}>
                        Готово
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

    newPasswordForm: {
        display: 'flex',
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

        marginTop: '100%',
    },

    button: {
        padding: '5%',
        margin: '2%',

        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 40,
    },
});

export default SetNewPasswordScreen;
