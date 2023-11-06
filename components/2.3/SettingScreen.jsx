//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer
} from '../Utils.jsx';
import { styles } from '../main.jsx';

const SettingScreen = ({ navigation }) => {
    const [university, setName] = useState('');

    const handleLogOut = () => {
        if (registrationData.user == 'IS') {
            navigation.navigate('RegistrationISScreen');
        }
        else {
            navigation.navigate('RegistrationBuddyScreen');

        }
    };
    const handleChangeLanguage = () => {
        navigation.navigate('ChangeLanguageScreen');
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>{languageTranslate(
                    registrationData.language,
                    'Settings',
                    'Настройки')}</Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogOut}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                'Log Out',
                                'Выход из аккаунта')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleChangeLanguage}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                'Change Language',
                                'Сменить язык')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SettingScreen;
