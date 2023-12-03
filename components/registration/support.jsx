//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../main.jsx';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from '../Utils.jsx';
import BackButton from '../back-button.jsx';


const SupportScreen = ({ navigation }) => {
    const handleRegister = () => {
        navigation.navigate('EmailScreen');
    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
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
                                userData.language,
                                'Back',
                                'Назад')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View></SafeAreaView>
    );
};

export default SupportScreen;
