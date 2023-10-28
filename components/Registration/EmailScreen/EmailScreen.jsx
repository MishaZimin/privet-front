import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const EmailScreen = ({ navigation, route }) => {
    const [emailCode, setEmailCode] = useState('');

    const { randomCode } = route.params;
    const { user } = route.params;
    const { isNewPassword } = route.params;

    const handleEmailScreen = () => {
        console.log('----------EmailCode----------');
        // console.log('EmailCodeOutput:', randomCode);
        // console.log('EmailCodeInput: ', emailCode);

        if (emailCode == randomCode) {
            console.log('код верный');

            if (user === 'IS') {
                isNewPassword ? navigation.navigate('SetNewPasswordScreen') : navigation.navigate('StudentsScreen');
            }
            if (user === 'Buddy') {
                isNewPassword ? navigation.navigate('SetNewPasswordScreen') : navigation.navigate('BuddysScreen');
            }

        } else {
            console.log('код неверный');
        }

        console.log('user:', user);
        console.log('recovery?:', isNewPassword);
    };

    const handleNotEmailCode = () => {
        console.log('--------------------');
        console.log('handleNotEmailCode');
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.emailForm}>
                <Text style={styles.textHeader}>Мы отправили код подтверждения на вашу почту</Text>
                <Text style={styles.textHeader}>Введите код в поле ниже:</Text>
                <View style={styles.textInputs}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="код подтверждения"
                        secureTextEntry
                        value={emailCode}
                        onChangeText={text => setEmailCode(text)} />

                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="Далее"
                        onPress={handleEmailScreen}>
                        <Text style={styles.text}>
                            Далее
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Не получили письмо?"
                        onPress={handleNotEmailCode}>
                        <Text style={styles.text}>
                            Не получили письмо?
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
    },

    emailForm: {
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
        width: '100%',
        // paddingBottom: '10%',
        // backgroundColor: 'plum',

    },

    textInput: {
        width: '100%',
        padding: '3%',
        marginTop: '10%',

        borderBottomWidth: 1,
        borderColor: 'grey',
    },

    buttons: {
        // flex: 1,

        // justifyContent: 'center',
    },

    button: {
        padding: '5%',
        margin: '2%',

        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 40,
    },
});

export default EmailScreen;
