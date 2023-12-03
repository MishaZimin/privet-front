
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
    myArrivals,
} from '../Utils.jsx';
import { styles } from '../main.jsx';
import BackButton from '../back-button.jsx';

const MyArrivals = ({ navigation }) => {
    const [university, setName] = useState('');
    console.log('arrivalBookData:', arrivalBookData);
    console.log('myArrivals:', myArrivals);


    const handleArrivalBuddy = () => {
        navigation.navigate('ArrivalBuddy');
    };

    const handleMyArrivals = () => {

    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>My Arrivals</Text>
                    </View>

                    {myArrivals.length > 0 ? myArrivals.map((arrival, index) => (
                        <View style={styles.buddysStudents} key={index}>
                            <Text style={styles.text1}>Full Name: {arrival.fullName}</Text>
                            <Text style={styles.text1}>Sex: {arrival.sex}</Text>
                            <Text style={styles.text1}>Arrival Date: {arrival.arrivalDate}</Text>
                            <Text style={styles.text1}>Arrival Time: {arrival.arrivalTime}</Text>
                            <Text style={styles.text1}>Flight Number: {arrival.flightNumber}</Text>
                            <Text style={styles.text1}>Arrival Point: {arrival.arrivalPoint}</Text>
                            <Text style={styles.text1}>Citizenship: {arrival.citizenship}</Text>
                            <Text style={styles.text1}>Phone: {arrival.phone}</Text>
                            <Text style={styles.text1}>Telegram: {arrival.telegram}</Text>
                            <Text style={styles.text1}>WhatsApp: {arrival.whatsApp}</Text>
                            <Text style={styles.text1}>VK: {arrival.vk}</Text>
                            <Text style={styles.text1}>Comment: {arrival.comment}</Text>
                            <Text style={styles.text1}>Tickets: {arrival.tickets}</Text>
                        </View>
                    )) :
                        <View>
                            <Text style={styles.studentName}>
                                {languageTranslate(
                                    userData.language,
                                    'You have no arrival',
                                    'У вас нет приездов')}
                            </Text>

                        </View>
                    }


                </View>
            </ScrollView></SafeAreaView >
    );
};

export default MyArrivals;
