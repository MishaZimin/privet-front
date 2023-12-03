//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from './main.jsx';
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
} from './Utils.jsx';
import BackButton from './back-button.jsx';

const LoadingScreen = ({ navigation }) => {


    setTimeout(async () => {
        // await AsyncStorage.setItem('access_token', '');
        const accessToken = await AsyncStorage.getItem('access_token');

        if (accessToken !== null) {
            console.log('Access token: ', accessToken);
            const dataUserBD = await getTokenToServer(accessToken, "/auth/me", "/json");
            const response = await getTokenToServer(accessToken, "/users/me/profile", "/json");

            userData.access_token = accessToken;
            userData.user = dataUserBD.role_id;

            userData.fullName = response.profile_info.full_name;
            userData.citizenship = response.profile_info.citizenship;
            userData.sex = response.profile_info.sex;
            userData.birthDate = response.profile_info.birthdate;

            userData.phone = response.contacts.phone;
            userData.email = response.contacts.email;
            userData.telegram = response.contacts.telegram;
            userData.whatsApp = response.contacts.whatsapp;
            userData.vk = response.contacts.vk;

            userData.nativeLanguage = response.profile_info.nativeLanguage;
            userData.otherLanguage = response.contacts.other_languages;
            userData.university = response.profile_info.university;
            userData.escortIsPaid = response.profile_info.escort_paid;

            userData.id = response.contacts.user_id;
            console.log('userData: ', userData);


            if (userData.user == 1) {
                navigation.navigate('LoadingSettingISScreen');

            }
            else if (userData.user == 2) {
                navigation.navigate('LoadingSettingBuddyScreen');
            }
            else {
                navigation.navigate('LanguageSelectionScreen');
            }
            // Вы можете использовать токен для авторизации при запросах к серверу.
        }
        else {
            navigation.navigate('LanguageSelectionScreen');
        }
    });

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <View style={styles.loading}>
                    <Text style={styles.textHeader}>

                        {languageTranslate(
                            userData.language,
                            'Loading...',
                            'Загрузка...')}
                    </Text>
                    {/* <Image
                    style={styles.img}
                    source={require('./img/d29e31c59a395ddf644fea8cc04fb79b.jpg')} /> */}
                    {/* <TouchableOpacity
                    style={styles.button}
                    title="loading..."
                    onPress={handleLoading}
                >
                    <Text style={styles.textButton}>skip</Text>
                </TouchableOpacity> */}
                </View>
            </View></SafeAreaView>
    );
};

export default LoadingScreen;