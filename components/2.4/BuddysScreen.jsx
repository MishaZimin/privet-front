
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer
} from '../Utils.jsx';
import { styles } from '../main.jsx';


const BuddysScreen = ({ navigation }) => {
    const handleBuddyProfile = () => {
        navigation.navigate('BuddyProfileScreen');
    };
    const handleToDoList = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('ToDoListScreen');

    };
    const handleAllArrivals = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('AllArrivalsScreen');

    };
    const handleBuddysStudents = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('BuddysStudentsScreen');

    };
    const handleMessenager = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('MessengerScreen');

    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text>2.4. Экраны и функционал для Сопровождающего (Сопровождающего, Бадди)</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleBuddyProfile"
                        onPress={handleBuddyProfile}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                'Student Profile',
                                'Профиль')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleToDoList"
                        onPress={handleToDoList}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
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
                                registrationData.language,
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
                                registrationData.language,
                                'Buddys Students',
                                'Информация')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Messenager"
                        onPress={handleMessenager}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                'Messenager',
                                'Мессенджер')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
