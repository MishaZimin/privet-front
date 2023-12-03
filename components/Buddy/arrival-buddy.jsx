//2.2.2. Приветственный экран

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from '../main.jsx';
import { SafeAreaView } from 'react-native-safe-area-context'
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
    allarrivalBookArr,
} from '../Utils.jsx';
import BackButton from '../back-button.jsx';


const ArrivalBuddy = ({ navigation, route }) => {
    const indexArrival = route.params;
    console.log('indexArrival:', indexArrival);
    console.log('allarrivalBookArr[indexArrival]:', allarrivalBookArr[indexArrival]);

    const [arrivalBuddy, setArrivalBuddy] = useState(allArrivalBuddy);
    const [countBuddy, setcountBuddy] = useState(allArrivalBuddy.length);


    const handleSignUp = () => {
        if (myArrivals.length > 0) {
            Alert.alert('вы уже записаны на приезд')
        }
        else if (allarrivalBookArr[indexArrival].buddy.length >= allarrivalBookArr[indexArrival].maxBuddy) {
            Alert.alert('мест уже нет')
        }
        else {
            myArrivals.push(allarrivalBookArr[indexArrival]);
            buddysStudents.push({
                arrivalID: allarrivalBookArr[indexArrival].id,
                photo: null,
                studentFullName: allarrivalBookArr[indexArrival].fullName,
                studentCitizenship: allarrivalBookArr[indexArrival].citizenship
            })
            allarrivalBookArr[indexArrival].countBuddy++;
            allarrivalBookArr[indexArrival].buddy.push({ photo: '', fullName: userData.fullName });

            const updatedArrivalBuddy = [...arrivalBuddy];
            const count = countBuddy;

            setcountBuddy(count);
            setArrivalBuddy(updatedArrivalBuddy);
        }
    };

    const handleApprove = () => {
        Alert.alert('приезд утвержден')
    };

    const handleDelete = (index) => {
        myArrivals.splice(0, 1);
        buddysStudents.splice(0, 1);
        allarrivalBookArr[indexArrival].countBuddy--;
        allarrivalBookArr[indexArrival].buddy.splice(index, 1);

        const updatedArrivalBuddy = [...arrivalBuddy];
        updatedArrivalBuddy.splice(indexArrival, 1);

        setArrivalBuddy(updatedArrivalBuddy);
    };

    const handleProfileBuddy = (index) => {
        navigation.navigate('BuddyProfileForIS');
    }

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
                                'Arrival',
                                'Приезд')}
                        </Text>
                    </View>

                    <View style={styles.buddysStudents}>
                        <Text style={styles.text1}>Full Name: {allarrivalBookArr[indexArrival].fullName}</Text>
                        <Text style={styles.text1}>Sex: {allarrivalBookArr[indexArrival].sex}</Text>
                        <Text style={styles.text1}>Arrival Date: {allarrivalBookArr[indexArrival].arrivalDate}</Text>
                        <Text style={styles.text1}>Arrival Time: {allarrivalBookArr[indexArrival].arrivalTime}</Text>
                        <Text style={styles.text1}>Flight Number: {allarrivalBookArr[indexArrival].flightNumber}</Text>
                        <Text style={styles.text1}>Arrival Point: {allarrivalBookArr[indexArrival].arrivalPoint}</Text>
                        <Text style={styles.text1}>Citizenship: {allarrivalBookArr[indexArrival].citizenship}</Text>
                        <Text style={styles.text1}>Phone: {allarrivalBookArr[indexArrival].phone}</Text>
                        <Text style={styles.text1}>Telegram: {allarrivalBookArr[indexArrival].telegram}</Text>
                        <Text style={styles.text1}>WhatsApp: {allarrivalBookArr[indexArrival].whatsApp}</Text>
                        <Text style={styles.text1}>VK: {allarrivalBookArr[indexArrival].vk}</Text>
                        <Text style={styles.text1}>Comment: {allarrivalBookArr[indexArrival].comment}</Text>
                        <Text style={styles.text1}>Tickets: {allarrivalBookArr[indexArrival].tickets}</Text>
                    </View>

                    {allarrivalBookArr[indexArrival].buddy.length > 0 && allarrivalBookArr[indexArrival].buddy.map((arrivalData, index) => (
                        <TouchableOpacity key={index} style={styles.buddysStudents} onPress={() => handleProfileBuddy(index)}>
                            <Text style={styles.text1}>Photo: {arrivalData.photo}</Text>
                            <Text style={styles.text1}>Full Name: {arrivalData.fullName}</Text>

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
            </ScrollView >
        </SafeAreaView>
    );
};
export default ArrivalBuddy;
