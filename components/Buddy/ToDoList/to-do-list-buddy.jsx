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
    myArrivals,
    invitationsData,

} from '../../Utils.jsx';
import { styles } from '../../main.jsx';
import * as Progress from 'react-native-progress';
import BackButton from '../../back-button.jsx';

const ToDoListBuddyScreen = ({ navigation }) => {
    // console.log('myArrivals:', myArrivals);

    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState(initialTasksData);

    // console.log(arrivalBookData.id);
    const updateProgress = () => {
        const completedTasks = tasks.filter((task) => task.completed);
        const newProgress = (completedTasks.length / tasks.length) * 100;
        setProgress(newProgress);
    };

    const handleTaskPress = async (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );

        initialTasksData[id - 1] = updatedTasks[id - 1];

        setTasks(updatedTasks);
    };

    const handleFillInfo = () => {
        navigation.navigate('StudentProfileForBuddy');
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

                    {true ? myArrivals.map((arrival, index) => (
                        <View style={styles.toDoList} key={index}>
                            <TouchableOpacity
                                style={styles.button}
                                title="BookMyArrival"
                                onPress={handleFillInfo}>
                                <Text style={styles.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        'Fill Info About: ' + arrival.fullName,
                                        'Заполнить информацию о ' + arrival.fullName)}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.textHeader}>
                                {languageTranslate(
                                    userData.language,
                                    'Arrival #',
                                    'Приезд #')}{arrival.id}</Text>
                            <Text style={styles.progress}>
                                {languageTranslate(
                                    userData.language,
                                    'Progress: ',
                                    'Прогресс: ')}{progress.toFixed(1)}%
                            </Text>

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
                                        <Text style={styles.deadline}>
                                            {task.deadline !== null ? task.deadline : ''}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )) : <View>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'You have no tasks',
                                'У вас нет задач')}
                        </Text>
                    </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ToDoListBuddyScreen;
