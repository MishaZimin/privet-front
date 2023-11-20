//2.2.2. Приветственный экран

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
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
    allArrivalBuddy,
} from '../Utils.jsx';


const ArrivalBuddy = ({ navigation }) => {

    const [arrivalBuddy, setArrivalBuddy] = useState(allArrivalBuddy);
    const [countBuddy, setcountBuddy] = useState(allArrivalBuddy.length);


    const handleSignUp = () => {
        if (allArrivalBuddy.length >= arrivalBookData.maxBuddy) {
            Alert.alert('мест уже нет')
        }
        else {
            myArrivals.push(arrivalBookData);
            buddysStudents.push({ arrivalID: arrivalBookData.id, photo: null, studentFullName: arrivalBookData.fullName, studentCitizenship: arrivalBookData.citizenship })
            arrivalBookData.countBuddy++;
            allArrivalBuddy.push({ photo: '', fullName: userData.fullName });

            // console.log(allArrivalBuddy);
            const updatedArrivalBuddy = [...arrivalBuddy];
            const count = countBuddy;

            setcountBuddy(count);

            setArrivalBuddy(updatedArrivalBuddy);

            // navigation.navigate('BuddysScreen');
        }
    };

    const handleApprove = () => {

        Alert.alert('приезд утвержден')
        // navigation.navigate('StudentsScreen');
    };

    const handleDelete = (i) => {

        allArrivalBuddy.splice(i, 1);
        arrivalBookData.countBuddy--;
        myArrivals.splice(0, 1);
        buddysStudents.splice(0, 1);

        const updatedArrivalBuddy = [...arrivalBuddy];
        updatedArrivalBuddy.splice(i, 1);

        setArrivalBuddy(updatedArrivalBuddy);
        // navigation.navigate('StudentsScreen');
    };

    const handleProfileBuddy = (index) => {
        navigation.navigate('BuddyProfileForIS');

    }

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
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

                {allArrivalBuddy.map((miniPofileBuddy, index) => (
                    <TouchableOpacity style={styles.buddysStudents} key={index} onPress={() => handleProfileBuddy(index)}>
                        <Text style={styles.text1}>Photo: {miniPofileBuddy.photo}</Text>
                        <Text style={styles.text1}>Full Name: {miniPofileBuddy.fullName}</Text>


                        <TouchableOpacity
                            style={styles.button}
                            title=""
                            onPress={() => handleDelete(index)}>

                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Remove an Accompanying Person from the Arrival',
                                    'Удалить Сопровождающего из приезда')}

                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                ))}

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
                        title=""
                        onPress={handleApprove}>

                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Approve this arrival',
                                'Утвердить этот приезд')}

                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    );
};
export default ArrivalBuddy;
