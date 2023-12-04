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
} from '../../Utils.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../main.jsx';
import * as Progress from 'react-native-progress';
import BackButton from '../../back-button.jsx';

const ToDoListISScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState(initialTasksData);

    // console.log(arrivalBookData.id);
    const updateProgress = () => {
        const completedTasks = tasks.filter((task) => task.completed);
        const newProgress = (completedTasks.length / tasks.length) * 100;
        setProgress(newProgress);
    };

    // const handleTaskPress = (id) => {
    //     const updatedTasks = tasks.map((task) =>
    //         task.id === id ? { ...task, completed: !task.completed } : task
    //     );

    //     initialTasksData[id - 1] = updatedTasks[id - 1];

    //     setTasks(updatedTasks);
    // };

    const handleBookMyArrival = async () => {
        // userData.escortIsPaid = false;
        // arrivalBookData.id = '';

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

        // if (userData.escortIsPaid) {
        //     navigation.navigate('ArrivalBookingScreen');
        // }
        // else {
        //     navigation.navigate('PaymentScreen');
        // }
    }

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
                            '')}</Text>

                    {(userData.escortIsPaid && arrivalBookDataArr.length > 0) ? (

                        <View style={styles.toDoList}>
                            <Text style={styles.textHeader}>
                                {languageTranslate(
                                    userData.language,
                                    'Arrival #',
                                    'Приезд #')}{arrivalBookDataArr[0].id}</Text>
                            <Text style={styles.progress}>
                                {languageTranslate(
                                    userData.language,
                                    'Progress: ',
                                    'Прогресс: ')}{progress.toFixed(1)}%</Text>

                            <Progress.Bar progress={progress.toFixed(1) / 100} width={240} />
                            {tasks.map((task) => (
                                <TouchableOpacity
                                    key={task.id}
                                    // onPress={() => handleTaskPress(task.id)}
                                    style={styles.taskItem}>

                                    <Text style={{
                                        textDecorationLine: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? 'gray' : 'black'
                                    }}>
                                        {task.text}
                                        <Text style={styles.deadline}>{task.deadline !== null ? task.deadline : ''}</Text>
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

export default ToDoListISScreen;
