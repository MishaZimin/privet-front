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


const SupportScreen = ({ navigation }) => {
    const handleRegister = () => {
        navigation.navigate('EmailScreen');
    };

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            registrationData.language,
                            'Support phone',
                            'Телефон поддержки')}
                    </Text>
                </View>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>88005553535</Text>
                    <Text style={styles.textHeader}>88008008080</Text>
                    <Text style={styles.textHeader}>88000000000</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    title="go back"
                    onPress={handleRegister}>
                    <Text style={styles.textButton}>
                        {languageTranslate(
                            registrationData.language,
                            'Back',
                            'Назад')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SupportScreen;
