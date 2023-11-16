
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendJSONToServer,
    userData,
} from '../Utils.jsx';
import { styles } from '../main.jsx';


const StudentsScreen = ({ navigation }) => {

    const handleStudentProfile = () => {
        navigation.navigate('StudentProfileScreen');
    };
    const handleToDoList = () => {
        navigation.navigate('ToDoListISScreen');
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
        <ScrollView style={styles.main}>
            <View style={styles.form}>
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

                    <TouchableOpacity
                        style={styles.button}
                        title="StudentProfileForBuddy"
                        onPress={handleStudentProfileForBuddy}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Student profile for Buddy',
                                'Профиль студента для сопровождающего')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default StudentsScreen;
