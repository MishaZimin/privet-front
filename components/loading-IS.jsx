//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from './main.jsx';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from './utils.jsx';

const LoadingSettingISScreen = ({ navigation }) => {


    const handleLoading = () => {
        navigation.navigate('StudentsScreen');
    };

    setTimeout(() => {
        navigation.navigate('StudentsScreen');
    }, 1);

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>
                    {languageTranslate(
                        userData.language,
                        'Loading...',
                        'Загрузка...')}</Text>
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



export default LoadingSettingISScreen;