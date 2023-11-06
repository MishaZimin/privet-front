
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendJSONToServer
} from '../Utils.jsx';
import { styles } from '../main.jsx';


const StudentsScreen = ({ navigation }) => {


    const handleStudentProfile = () => {
        // const dataUserBD = await getDataFromServer("/users/me", "/json");
        // console.log("dataUserBD:", dataUserBD);
        navigation.navigate('StudentProfileScreen');
    };
    const handleToDoList = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('ToDoListScreen');

    };
    const handleRoute = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('RouteScreen');

    };
    const handleInfo = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('InfoScreen');

    };
    const handleMessenager = () => {
        // navigation.navigate('RegistrationForm');
        navigation.navigate('MessengerScreen');

    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text>2.3. Экраны и функционал для Иностранного Студента (ИС)</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleStudentProfile"
                        onPress={handleStudentProfile}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                'StudentProfile',
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
                                'ToDoList',
                                'Список задач')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleRoute"
                        onPress={handleRoute}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
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
                                registrationData.language,
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

export default StudentsScreen;
