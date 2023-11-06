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

const MessengerScreen = ({ navigation }) => {
    const [university, setName] = useState('');

    const handleRegistration = () => {
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>MessengerScreen</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default MessengerScreen;
