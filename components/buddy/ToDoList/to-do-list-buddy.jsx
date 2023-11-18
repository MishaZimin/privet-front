//2.2.3. Регистрация Сопровождающего


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    initialTasksData,
    userData,
    arrivalBookData,
    myArrivals,

} from '../../utils.jsx';
import { styles } from '../../main.jsx';
import * as Progress from 'react-native-progress';

const ToDoListBuddyScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState(initialTasksData);

    // console.log(arrivalBookData.id);
    const updateProgress = () => {
        const completedTasks = tasks.filter((task) => task.completed);
        const newProgress = (completedTasks.length / tasks.length) * 100;
        setProgress(newProgress);
    };

    const handleTaskPress = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );

        initialTasksData[id - 1] = updatedTasks[id - 1];

        setTasks(updatedTasks);
    };

    const handleFillInfo = () => {
        // userData.escortIsPaid = false;
        // arrivalBookData.id = '';

        navigation.navigate('StudentProfileForBuddy');

    }

    useEffect(() => {
        updateProgress();
    }, [tasks]);

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'To Do List',
                            'Список задач')}
                    </Text>
                </View>

                {/* <TouchableOpacity
                    style={styles.button}
                    title="BookMyArrival"
                    onPress={handleFillInfo}>
                    <Text style={styles.textButton}>
                        {languageTranslate(
                            userData.language,
                            'Fill Info About {Student Full Name}',
                            'Заполнить информацию о {Полное Имя Студента}')}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.inputHeader}>
                    {languageTranslate(
                        userData.language,
                        '',
                        '')}</Text> */}

                {/* {(userData.escortIsPaid && arrivalBookData.id !== '') ? (

                    
                ) : null} */}
                {myArrivals.length > 0 ?
                    <View style={styles.toDoList}>
                        <TouchableOpacity
                            style={styles.button}
                            title="BookMyArrival"
                            onPress={handleFillInfo}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Fill Info About {Student Full Name}',
                                    'Заполнить информацию о {Полное Имя Студента}')}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                '',
                                '')}</Text>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
                                'Arrival #',
                                'Приезд #')}{arrivalBookData.id}</Text>
                        <Text style={styles.progress}>
                            {languageTranslate(
                                userData.language,
                                'Progress: ',
                                'Прогресс: ')}{progress.toFixed(1)}%</Text>

                        <Progress.Bar progress={progress.toFixed(1) / 100} width={240} />
                        {tasks.map((task) => (
                            <TouchableOpacity
                                key={task.id}
                                onPress={() => handleTaskPress(task.id)}
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
                    : null}
            </View>
        </ScrollView>
    );
};

export default ToDoListBuddyScreen;
