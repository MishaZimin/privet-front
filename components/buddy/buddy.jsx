
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
} from '../Utils.jsx';
import { styles } from '../main.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BuddysScreen = ({ navigation }) => {
    const handleBuddyProfile = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await getTokenToServer(accessToken, "/users/me/profile", "/json");
        // console.log('-----', response);

        // for (var key in response) {
        //     console.log(key + ': ' + response[key]);
        // }

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

    const handleToDoList = () => {
        navigation.navigate('ToDoListBuddyScreen');
    };

    const handleAllArrivals = () => {
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

// export const styles = StyleSheet.create({
//     main: {
//         flex: 1,
//         marginTop: 10,
//         alignItems: 'center',
//     },
// });

export default BuddysScreen;
