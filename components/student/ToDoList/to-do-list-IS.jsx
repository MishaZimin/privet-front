//2.2.3. Регистрация Сопровождающего


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    initialTasksData,
    userData,
    arrivalBookData,
    getTokenToServer,
    arrivalBookDataArr,
    invitationsData,
    showTasks,
} from '../../Utils.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../main.jsx';
import * as Progress from 'react-native-progress';
import BackButton from '../../back-button.jsx';

const ToDoListISScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState(initialTasksData);

    const updateProgress = () => {
        const completedTasks = tasks.filter((task) => task.completed);
        const newProgress = (completedTasks.length / tasks.length) * 100;

        console.log(newProgress);
        setProgress(newProgress);
    };

    const handleBookMyArrival = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await getTokenToServer(accessToken, "/users/me/profile", "/json");

        console.log('----', response);
        console.log('escort_paid', response.profile_info.escort_paid);

        if (response.profile_info.escort_paid) {
            userData.escortIsPaid = true;
            navigation.navigate('ArrivalBookingScreen');
        }
        else {
            navigation.navigate('PaymentScreen');
        }
    }

    const handleSubmit = async () => {
        const data = {
            "full_name": userData.fullName == '' ? null : userData.fullName,
            "sex": "string",
            "citizenship": userData.citizenship == '' ? null : userData.citizenship,
            "phone": userData.phone == '' ? null : userData.phone,
            "telegram": userData.telegram == '' ? null : userData.telegram,
            "whatsapp": userData.whatsApp == '' ? null : userData.whatsApp,
            "vk": userData.vk == '' ? null : userData.vk,
            "tickets": "string",
            "submit_arrival": true
        };
        const response = await postSsubmitInvitation(
            data,
            userData.access_token,
            "/users/me/submit-invitation",
            "/json");
        if (response.detail == "User has been added to arrival") {

        }
        else if (response.detail == "User hasn't been invited to any arrival") {
            invitationsData = null;
        }
        else {
            console.log("че бля");
        }

    };

    useEffect(() => {
        updateProgress();
    }, [tasks]);

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
                                'To Do List',
                                'Список задач')}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        title="BookMyArrival"
                        onPress={handleBookMyArrival}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Book My Arrival',
                                'Зарегистрировать приезд')}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            '',
                            '')}
                    </Text>

                    {invitationsData.length > 0 ? invitationsData.map((arrival, index) => (
                        <TouchableOpacity
                            style={styles.buddysStudents}
                        >
                            <View>
                                <Text style={styles.textHeader}>Приглашение в приезд</Text>
                                <Text style={styles.studentName}>Arrival ID: {arrival.id}</Text>
                                <Text style={styles.studentAge}>arrival_date: {arrival.arrival_date}</Text>
                                <Text style={styles.studentAge}>arrival_point: {arrival.arrival_point}</Text>

                                <Text style={styles.studentAge}>comment: {arrival.comment}</Text>

                                <Text style={styles.studentAge}>confirmed: {arrival.confirmed}</Text>

                                <Text style={styles.studentName}>flight_number: {arrival.flight_number}</Text>
                                <Text style={styles.studentAge}>tickets: {arrival.tickets}</Text>
                                <Text></Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                title=""
                                onPress={() => handleSubmit(invitationsData.arrivalID)}
                            >
                                <Text style={styles.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        'Accept arrival',
                                        'Принять приезд')}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )) :
                        <View>
                            <Text style={styles.studentName}>
                                {languageTranslate(
                                    userData.language,
                                    'You dont have any invitations',
                                    'У вас нет приглашений')}
                            </Text>
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                        </View>}

                    {(userData.escortIsPaid) ? (
                        <View style={styles.toDoList}>
                            <Text style={styles.progress}>
                                {languageTranslate(
                                    userData.language,
                                    'Progress: ',
                                    'Прогресс: '
                                )}
                                {progress.toFixed(1)}%
                            </Text>

                            <Progress.Bar progress={progress.toFixed(1) / 100} width={240} />

                            {tasks.map((task) => (
                                <TouchableOpacity
                                    key={task.id}
                                    style={styles.taskItem}
                                >
                                    <Text
                                        style={{
                                            textDecorationLine: task.completed ? 'line-through' : 'none',
                                            color: task.completed ? 'gray' : 'black',
                                        }}
                                    >
                                        {task.text}
                                        <Text style={styles.deadline}>
                                            {task.deadline !== null ? task.deadline : ''}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const postSsubmitInvitation = async (data, token, adress, contentType) => {
    try {
        let bodyData = (contentType == "/json") ? JSON.stringify(data) : new URLSearchParams(data).toString();

        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "POST",
            headers: {
                "Accept": "application" + contentType,
                "Authorization": "Bearer " + token,
                "Content-Type": "application" + contentType
            },
            body: bodyData,
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
}



export default ToDoListISScreen;
