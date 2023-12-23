
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
    myArrivals,
    initialTasksData,
    allarrivalBookArr,
} from '../Utils.jsx';
import { styles } from '../main.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../back-button.jsx';


const BuddysScreen = ({ navigation }) => {
    const handleBuddyProfile = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await getTokenToServer(accessToken, "/users/me/profile", "/json");

        userData.university = response.profile_info.university;
        userData.city = response.profile_info.city;
        userData.fullName = response.profile_info.full_name;
        userData.birthDate = response.profile_info.birthdate;

        userData.phone = response.contacts.phone;
        userData.email = response.contacts.email;
        userData.telegram = response.contacts.telegram;
        userData.whatsApp = response.contacts.whatsapp;
        userData.vk = response.contacts.vk;

        userData.nativeLanguage = response.profile_info.nativeLanguage;
        userData.otherLanguage = response.contacts.other_languages;

        userData.buddyStatus = response.profile_info.buddy_status;

        userData.id = response.contacts.user_id;

        navigation.navigate('BuddyProfileScreen');
    };

    const handleToDoList = async () => {

        const response = await getIDArrivalToServer('100');
        const showTasks = response[0];
        console.log(response);

        initialTasksData[0].completed = showTasks.airport_meeting;
        initialTasksData[1].completed = showTasks.motel_checked_in;
        initialTasksData[2].completed = showTasks.medical_examinated;
        initialTasksData[3].completed = showTasks.sim_card_created;
        initialTasksData[4].completed = showTasks.money_exchange;
        initialTasksData[5].completed = showTasks.passport_translated;
        initialTasksData[6].completed = showTasks.bank_card;
        initialTasksData[7].completed = showTasks.enrollment_documents;
        initialTasksData[8].completed = showTasks.insurance;
        initialTasksData[9].completed = showTasks.dormitory_documents;

        initialTasksData[11].completed = showTasks.student_ID;

        initialTasksData[12].completed = showTasks.medical_tests[0];
        initialTasksData[12].deadline = showTasks.medical_tests[1] ? '\nDeadline: ' + showTasks.medical_tests[1] + ' 4:30 pm' : '';

        initialTasksData[13].completed = showTasks.visa_extension[0];
        initialTasksData[13].deadline = showTasks.visa_extension[1] ? '\nDeadline: ' + showTasks.visa_extension[1] + ' 4:30 pm' : '';

        initialTasksData[14].completed = showTasks.fingerprinting[0];
        initialTasksData[14].deadline = showTasks.fingerprinting[1] ? '\nDeadline: ' + showTasks.fingerprinting[1] + ' 4:30 pm' : '';


        console.log('------', initialTasksData);
        navigation.navigate('ToDoListBuddyScreen');
    };

    const handleAllArrivals = async () => {
        const response = await getTokenToServer(userData.access_token, "/arrivals", "/json")
        console.log('response', response.past_arrivals);
        console.log('-----');


        allarrivalBookArr.length = 0;

        console.log('allarrivalBookArr', allarrivalBookArr);
        console.log('-----');

        // {
        //     id: '123',
        //     arrivalDate: '01.01.2023',
        //     flightNumber: '11111',
        //     arrivalPoint: '2222',
        //     comment: 'comment',
        //     tickets: '№4324',

        //     fullName: 'name student 1',
        //     sex: 1,
        //     arrivalTime: '3:30 am',
        //     citizenship: 'china',
        //     phone: '+786895489622',
        //     telegram: '@tg-student-1',
        //     whatsApp: '+786895489622',
        //     vk: '@vk-student-1',

        //     countBuddy: 0,
        //     maxBuddy: 1,

        //     buddy: []
        // }

        // {
        //     "arrival_id": 100,
        //     "arrival_date": "2023-12-06T11:48:07.831000+00:00",
        //     "group_full_names": [
        //       "User userovich",
        //       "User userovich"
        //     ],
        //     "group_countries": [
        //       1,
        //       3
        //     ],
        //     "buddies_amount": "0/1"
        //   }

        const arrivalsData = response.past_arrivals
        arrivalsData.map((arrival) => {
            console.log('----', arrival);

            const arrivalData = {
                id: arrival.arrival_id,
                arrivalDate: arrival.arrival_date.slice(0, 10),
                flightNumber: '11111',
                arrivalPoint: '2222',
                comment: 'comment',
                tickets: '№4324',

                fullName: arrival.group_full_names,
                sex: 1,
                arrivalTime: '3:30 am',
                citizenship: 'usa (test)',
                phone: '+786895489622',
                telegram: '@tg-student-1',
                whatsApp: '+786895489622',
                vk: '@vk-student-1',

                countBuddy: arrival.buddies_amount,
                maxBuddy: 1,

                buddy: []
            };

            allarrivalBookArr.push(arrivalData);
        });

        navigation.navigate('AllArrivalsScreen');
    };

    const handleBuddysStudents = () => {
        navigation.navigate('BuddysStudentsScreen');
    };

    const handleMessenager = () => {
        navigation.navigate('MessengerScreen');
    };

    const handleProfileForIS = () => {
        navigation.navigate('BuddyProfileForIS');
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <Text>
                        {languageTranslate(
                            userData.language,
                            'Screens and functionality for the Attendant (Attendant, Buddy)',
                            'Экраны и функционал для Сопровождающего (Сопровождающего, Бадди)')}
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            title="handleBuddyProfile"
                            onPress={handleBuddyProfile}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Buddy Profile',
                                    'Профиль')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="handleToDoList"
                            onPress={handleToDoList}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'To Do List',
                                    'Список задач')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="handleAllArrivals"
                            onPress={handleAllArrivals}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'All Arrivals',
                                    'Все приезды')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="handleBuddysStudents"
                            onPress={handleBuddysStudents}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Buddys Students',
                                    'Студенты сопровождающего')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="Messenager"
                            onPress={handleMessenager}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Messenager',
                                    'Мессенджер')}
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.button}
                            title="handleProfileForIS"
                            onPress={handleProfileForIS}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'ProfileForIS',
                                    'Профиль сопр для студента')}
                            </Text>
                        </TouchableOpacity> */}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export const getIDArrivalToServer = async (id) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com/arrivals/tasks/?arrival_id=" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });
        const responseData = await res.json();
        console.log(responseData);
        return responseData;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default BuddysScreen;
