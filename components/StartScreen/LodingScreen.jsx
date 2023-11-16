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
    sendJSONToServer,
    userData,
    getTokenToServer,
} from '../Utils.jsx';

const LoadingScreen = ({ navigation }) => {


    setTimeout(async () => {
        try {
            // await AsyncStorage.setItem('access_token', '');
            const accessToken = await AsyncStorage.getItem('access_token');

            if (accessToken !== null) {
                console.log('Access token: ', accessToken);
                const dataUserBD = await getTokenToServer(accessToken, "/auth/me", "/json");

                userData.access_token = accessToken;
                userData.user = dataUserBD.role_id;
                userData.email = dataUserBD.email;
                userData.id = dataUserBD.id;
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
        } catch (error) {
            // Обработайте ошибку чтения
        }
    }, 1000);
    // setTimeout(() => {

    //     navigation.navigate('LanguageSelectionScreen');
    // }, 2000);

    return (
        <View style={styles.main}>
            <View style={styles.form}>
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
        </View>
    );
};



export default LoadingScreen;
