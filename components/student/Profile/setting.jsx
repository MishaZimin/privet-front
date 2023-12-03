//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from '../../Utils.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../main.jsx';
import BackButton from '../../back-button.jsx';

const SettingScreen = ({ navigation }) => {
    const handleLogOut = async () => {
        await AsyncStorage.setItem('access_token', '');
        const accessToken = await AsyncStorage.getItem('access_token');
        console.log(accessToken);

        if (registrationData.user == 1) {
            navigation.navigate('RegistrationISScreen');
        }
        else {
            navigation.navigate('RegistrationISScreen');
        }
    };
    const handleChangeLanguage = () => {
        navigation.navigate('ChangeLanguageScreen');
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <Text style={styles.textHeader}>{languageTranslate(
                        userData.language,
                        'Settings',
                        'Настройки')}</Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogOut}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Log Out',
                                    'Выход из аккаунта')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleChangeLanguage}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Change Language',
                                    'Сменить язык')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView></SafeAreaView>
    );
};

export default SettingScreen;
