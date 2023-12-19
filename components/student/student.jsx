
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
    invitationsData,
    showTasks,
    arrivalBookDataArr,
    initialTasksData,
} from '../Utils.jsx';
import { styles } from '../main.jsx';
import BackButton from '../back-button.jsx';


const StudentsScreen = ({ navigation }) => {
    const handleStudentProfile = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await getTokenToServer(accessToken, "/users/me/profile", "/json");

        userData.fullName = response.profile_info.full_name;
        userData.citizenship = response.profile_info.citizenship;
        userData.sex = response.profile_info.sex;
        userData.birthDate = response.profile_info.birthdate;

        userData.phone = response.contacts.phone;
        userData.email = response.contacts.email;
        userData.telegram = response.contacts.telegram;
        userData.whatsApp = response.contacts.whatsapp;
        userData.vk = response.contacts.vk;

        userData.nativeLanguage = response.profile_info.native_language;
        userData.otherLanguage = response.contacts.other_languages;
        userData.university = response.profile_info.university;
        userData.escortIsPaid = response.profile_info.escort_paid;

        userData.id = response.contacts.user_id;

        console.log('---', userData.sex);



        navigation.navigate('StudentProfileScreen');
    };
    const handleToDoList = async () => {
        try {
            // получение приглашений
            const response = await getTokenToServer(userData.access_token, "/users/me/check-invitation", "/json");
            console.log('check-invitation:', response);
            if (response != null) {
                invitationsData.push(response);
            }

            console.log('1', invitationsData);

            // получение ту ду листа
            const showTasks = await getTokenToServer(userData.access_token, '/users/me/tasks', "/json");

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


            console.log('-=-=-=', initialTasksData);


            navigation.navigate('ToDoListISScreen',);
        }
        catch (err) {
            console.log(err);
        };
    };
    const handleRoute = () => {
        navigation.navigate('RouteScreen');
    };
    const handleInfo = () => {
        navigation.navigate('InfoScreen');
    };
    const handleMessenager = () => {
        navigation.navigate('MessengerScreen');
    };
    const handleStudentProfileForBuddy = () => {
        navigation.navigate('StudentProfileForBuddy');
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <Text>
                        {languageTranslate(
                            userData.language,
                            '2.3. Screens and functionality for an International Student (IS)',
                            '2.3. Экраны и функционал для Иностранного Студента (ИС)')}</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            title="handleStudentProfile"
                            onPress={handleStudentProfile}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Student Profile',
                                    'Профиль Студента')}
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
                            title="handleRoute"
                            onPress={handleRoute}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Route',
                                    'Маршрут')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            title="handleInfo"
                            onPress={handleInfo}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Info',
                                    'Информация')}
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
                            title="StudentProfileForBuddy"
                            onPress={handleStudentProfileForBuddy}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Student profile for Buddy',
                                    'Профиль студента для сопровождающего')}
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const getToDoList = async (adress, token) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const userData = await res.json();
        console.log(userData);
        return userData;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export default StudentsScreen;
