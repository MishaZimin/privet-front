
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
    myArrivals,
} from '../utils.jsx';
import { styles } from '../main.jsx';

const MyArrivals = ({ navigation }) => {
    const [university, setName] = useState('');
    console.log(arrivalBookData);
    console.log(myArrivals);


    const handleArrivalBuddy = () => {
        navigation.navigate('ArrivalBuddy');
    };

    const handleMyArrivals = () => {

    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>My Arrivals</Text>
                </View>
                {myArrivals.length > 0 ?
                    <View style={styles.buddysStudents}>
                        <Text style={styles.text1}>Full Name: {arrivalBookData.fullName}</Text>
                        <Text style={styles.text1}>Sex: {arrivalBookData.sex}</Text>
                        <Text style={styles.text1}>Arrival Date: {arrivalBookData.arrivalDate}</Text>
                        <Text style={styles.text1}>Arrival Time: {arrivalBookData.arrivalTime}</Text>
                        <Text style={styles.text1}>Flight Number: {arrivalBookData.flightNumber}</Text>
                        <Text style={styles.text1}>Arrival Point: {arrivalBookData.arrivalPoint}</Text>
                        <Text style={styles.text1}>Citizenship: {arrivalBookData.citizenship}</Text>
                        <Text style={styles.text1}>Phone: {arrivalBookData.phone}</Text>
                        <Text style={styles.text1}>Telegram: {arrivalBookData.telegram}</Text>
                        <Text style={styles.text1}>WhatsApp: {arrivalBookData.whatsApp}</Text>
                        <Text style={styles.text1}>VK: {arrivalBookData.vk}</Text>
                        <Text style={styles.text1}>Comment: {arrivalBookData.comment}</Text>
                        <Text style={styles.text1}>Tickets: {arrivalBookData.tickets}</Text>
                    </View>
                    : null}


            </View>
        </ScrollView>
    );
};

export default MyArrivals;
