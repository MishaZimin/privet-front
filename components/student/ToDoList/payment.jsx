//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
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

const PaymentScreen = ({ navigation }) => {

    const handlePay = () => {
        userData.escortIsPaid = true;

        Alert.alert(languageTranslate(
            userData.language,
            'Payment successful',
            'Оплата прошла успешно'));

        navigation.navigate('ToDoListISScreen');

    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <View style={styles.form}>
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Pyment',
                            'Оплата')}
                    </Text>
                    {/* <Image
                    style={styles.img}
                    source={require('./img/d29e31c59a395ddf644fea8cc04fb79b.jpg')} /> */}
                    <TouchableOpacity
                        style={styles.button}
                        title="loading..."
                        onPress={handlePay}
                    >
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Pay For Escort',
                                'Оплатить услуги сопровождения')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};



export default PaymentScreen;
