//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../main.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
} from '../../Utils.jsx';

const PymentScreen = ({ navigation }) => {

    const handlePay = () => {
        userData.escortIsPaid = true;
        navigation.navigate('ToDoListScreen');

    };

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>PymentScreen</Text>
                {/* <Image
                    style={styles.img}
                    source={require('./img/d29e31c59a395ddf644fea8cc04fb79b.jpg')} /> */}
                <TouchableOpacity
                    style={styles.button}
                    title="loading..."
                    onPress={handlePay}
                >
                    <Text style={styles.textButton}>Pay For Escort</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default PymentScreen;
