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
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';

const ToDoListScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState(initialTasksData);

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

        console.log('----------------');
        console.log(initialTasksData[id - 1]);

        // Обновите состояние новым массивом
        setTasks(updatedTasks);
    };

    const handleBookMyArrival = () => {
        // userData.escortIsPaid = false;

        if (userData.escortIsPaid) {
            navigation.navigate('ArrivalBookingScreen');
        }
        else {
            navigation.navigate('PymentScreen');
        }
    }

    useEffect(() => {
        updateProgress();
    }, [tasks]);

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>ToDoListScreen</Text>

                </View>

                <TouchableOpacity
                    style={styles.button}
                    title="BookMyArrival"
                    onPress={handleBookMyArrival}
                >
                    <Text style={styles.textButton}>Book My Arrival</Text>
                </TouchableOpacity>

                <Text style={styles.progress}>Прогресс: {progress.toFixed(1)}%</Text>
                <View style={styles.toDoList}>
                    {tasks.map((task) => (
                        <TouchableOpacity
                            key={task.id}
                            onPress={() => handleTaskPress(task.id)}
                            style={styles.taskItem}
                        >
                            <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
                                {task.text}
                                <Text style={styles.deadline}>{task.deadline !== null ? task.deadline : ''}</Text>
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ToDoListScreen;
