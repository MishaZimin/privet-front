//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../main.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer
} from '../Utils.jsx';

const LoadingScreen = ({ navigation }) => {
    const handleLoading = async () => {
        try {
            await AsyncStorage.setItem('access_token', '');
            const accessToken = await AsyncStorage.getItem('access_token');
            if (accessToken !== null) {
                console.log('Access token: ', accessToken)

                let userType = 1;

                if (userType == 1) {
                    navigation.navigate('LoadingSettingISScreen');

                }
                else if (userType == 2) {
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
        } catch (error) {
            // Обработайте ошибку чтения
        }
    };

    // setTimeout(() => {

    //     navigation.navigate('LanguageSelectionScreen');
    // }, 2000);

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>Loading...</Text>
                {/* <Image
                    style={styles.img}
                    source={require('./img/d29e31c59a395ddf644fea8cc04fb79b.jpg')} /> */}
                <TouchableOpacity
                    style={styles.button}
                    title="loading..."
                    onPress={handleLoading}
                >
                    <Text style={styles.textButton}>skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default LoadingScreen;
