//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from '../main.jsx';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
    myArrivals,
    buddysStudents,
} from '../utils.jsx';


const ArrivalBuddy = ({ navigation }) => {
    const handleSignUp = () => {
        myArrivals.push(arrivalBookData);
        buddysStudents.push({ arrivalID: arrivalBookData.id, photo: null, studentFullName: arrivalBookData.fullName, studentCitizenship: arrivalBookData.citizenship })
        navigation.navigate('MyArrivals');
    };

    const handleApprove = () => {
        // navigation.navigate('StudentsScreen');
    };

    const handleDelete = () => {
        // navigation.navigate('StudentsScreen');
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>i
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Arrival',
                            'Приезд')}</Text>

                </View>
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

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title=""
                        onPress={handleSignUp}>

                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Sign up for this visit',
                                'Записаться на этот приезд')}

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="2-3 sec"
                        onPress={handleApprove}>

                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Approve this arrival',
                                'Утвердить этот приезд')}

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="2-3 sec"
                        onPress={handleDelete}>

                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Remove an Accompanying Person from the Arrival',
                                'Удалить Сопровождающего из приезда')}

                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};
export default ArrivalBuddy;
