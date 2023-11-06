//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../main.jsx';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer
} from '../Utils.jsx';

const LoadingSettingBuddyScreen = ({ navigation }) => {
    const handleLoading = () => {
        navigation.navigate('BuddysScreen');
    };

    setTimeout(() => {
        navigation.navigate('BuddysScreen');
    }, 1);

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>Loading...LoadingSettingBuddyScreen</Text>
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



export default LoadingSettingBuddyScreen;