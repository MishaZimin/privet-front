//2.2.3. Регистрация Сопровождающего

import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
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
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import * as Progress from "react-native-progress";
import BackButton from "../../back-button.jsx";
import Swiper from "react-native-swiper";
import BuddysScreen from "../buddy.jsx";

const ToDoList = ({ arrival, user, userEmail, userName }) => {
    const [tasks, setTasks] = useState(arrival);
    const [progress, setProgress] = useState(0);

    // console.log("-0-", userEmail);

    const handleTaskPress = async (id, taskName, taskValue) => {
        // console.log("-1-", tasks[0]);

        // console.log("--", id, user, taskName, taskValue);

        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );

            return updatedTasks;
        });

        const queryParams = new URLSearchParams({
            task_name: taskName,
            task_value: taskValue,
        });

        const url = `/users/tasks/change/${encodeURIComponent(
            userEmail
        )}?${queryParams.toString()}`;
        console.log(url);

        const response = await postChaingeTaskToServer(url);

        if (response.details != "ok") {
            setTasks((prevTasks) => {
                const updatedTasks = prevTasks.map((task) =>
                    task.id === id
                        ? { ...task, completed: !task.completed }
                        : task
                );

                return updatedTasks;
            });
            Alert.alert(response.details);
        }
    };

    const updateProgress = () => {
        const completedTasks = tasks.filter((task) => task.completed);
        const newProgress = (completedTasks.length / tasks.length) * 100;
        setProgress(newProgress);
    };

    useEffect(() => {
        updateProgress();
    }, [tasks]);

    return (
        <View style={stylesToDoList.toDoList}>
            <Text style={styles.textHeader}>
                {languageTranslate(userData.language, "Student: ", "Студент: ")}
                {userName}
            </Text>
            <View style={stylesToDoList.progressContainer}>
                <Text style={stylesToDoList.progress}>
                    {progress.toFixed(1)}%
                </Text>
                <Progress.Bar
                    style={stylesToDoList.progressBar}
                    progress={progress.toFixed(1) / 100}
                    width={240}
                    color="black"
                />
            </View>
            {tasks.map((task) => (
                <TouchableOpacity
                    key={task.id}
                    onPress={() =>
                        handleTaskPress(task.id, task.taskName, !task.completed)
                    }
                    style={[
                        stylesToDoList.taskItem,
                        {
                            backgroundColor: task.completed
                                ? "rgb(200, 200, 200)" // цвет для выполненных заданий
                                : task.id % 3 === 1
                                ? "rgb(244, 193, 66)"
                                : task.id % 3 === 2
                                ? "rgb(234, 73, 143)"
                                : "rgb(59, 133, 247)",

                            // opacity: task.completed ? 0.4 : 1,
                        },
                    ]}
                >
                    <View style={stylesToDoList.numberTask}>
                        <Text style={stylesToDoList.numberTaskText}>
                            {task.id}
                        </Text>
                    </View>
                    <View style={stylesToDoList.textTaksContainer}>
                        <Text
                            style={[
                                {
                                    textDecorationLine: task.completed
                                        ? "line-through"
                                        : "none",
                                    color: task.completed ? "black" : "black",
                                },
                                stylesToDoList.text,
                            ]}
                        >
                            {task.text}
                            <Text style={styles.deadline}>
                                {task.deadline !== null ? task.deadline : ""}
                            </Text>
                        </Text>
                    </View>
                    <View style={stylesToDoList.line}></View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const ToDoListBuddyScreen = ({ navigation, route }) => {
    const meArrivals = route.params.responseMeArrivals;
    const allTasks = route.params.responseTasks;
    const usersID = route.params.studentsID;
    const usersName = route.params.studentsName;
    const usersEmail = route.params.studentsEmail;

    // console.log("allTasks", allTasks);

    // console.log("allTasks", allTasks);

    const handleFillInfo = () => {
        navigation.navigate("StudentProfileForBuddy");
    };

    return (
        <SafeAreaView style={stylesToDoList.main}>
            <View style={stylesToDoList.main}>
                <View style={stylesToDoList.form}>
                    {/* <BackButton /> */}
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
                                userData.fullName + ", Privet👋",
                                userData.fullName + ", Privet👋"
                            )}
                        </Text>
                    </View>

                    {meArrivals.length > 0 ? (
                        <Swiper
                            showsPagination={true}
                            showsButtons={false}
                            buttonWrapperStyle={stylesSwiper.buttonWrapper}
                            paginationStyle={stylesSwiper.paginationStyle}
                            dotStyle={stylesSwiper.dotStyle}
                            activeDotStyle={stylesSwiper.activeDotStyle}
                        >
                            {allTasks.map((arrival, index) => (
                                <ScrollView key={index}>
                                    <ToDoList
                                        key={arrival.id}
                                        arrival={allTasks[index]}
                                        user={usersID[index]}
                                        userEmail={usersEmail[index]}
                                        userName={usersName[index]}
                                    />
                                </ScrollView>
                            ))}
                        </Swiper>
                    ) : (
                        <View>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "You have no tasks",
                                    "У вас нет задач"
                                )}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            <BuddysScreen navigation={navigation} />
        </SafeAreaView>
    );
};

const stylesSwiper = StyleSheet.create({
    swiperContainer: {
        // Стили для контейнера Swiper, если необходимо
    },
    buttonWrapper: {
        position: "absolute",
        top: -295, // Вы можете настроить отступ сверху по вашему усмотрению
        left: 0,
        right: 0,
        // backgroundColor: "black",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    buttonText: {
        color: "white", // Цвет кнопок
        fontSize: 16,
        fontWeight: "bold",
    },
    paginationStyle: {
        position: "absolute",
        top: -555,
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    activeDotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "black",
    },
});

export const stylesToDoList = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
    },

    form: {
        display: "flex",
        flex: 1,
        width: "100%",

        marginTop: "0%",

        padding: "7%",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
    },

    progressContainer: {
        flexDirection: "row",

        marginTop: 20,

        justifyContent: "center",
    },

    progressBar: {
        maxHeight: 8,
        marginTop: "1.5%",
        marginLeft: "2%",
    },

    progress: {
        fontWeight: "600",
    },

    toDoList: {
        padding: "1%",
        width: "100%",
        margin: "0%",
        borderRadius: 30,

        textAlign: "top",
        marginBottom: 60,
    },
    taskItem: {
        flexDirection: "row",
        padding: 10,
        marginTop: 40,
        width: "100%",
        backgroundColor: "rgb(255, 183, 68)",
        // padding: "10%",
        borderRadius: 40,

        zIndex: 1,
    },

    textTaksContainer: {
        justifyContent: "center",
        width: "75%",
        // borderWidth: 1,
    },

    text: {
        fontWeight: "700",
        fontSize: 14,
        marginLeft: "5%",

        // marginVertical: "auto",
    },

    numberTask: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 3,

        justifyContent: "center",
        alignItems: "center",

        marginTop: "auto",
        marginBottom: "auto",

        backgroundColor: "white",
    },

    numberTaskText: {
        fontSize: 22,
        fontWeight: "700",
    },

    line: {
        position: "absolute",
        top: 70,
        left: 33,
        borderWidth: 2,
        height: 50,
        zIndex: 2,
    },
});

export const postChaingeTaskToServer = async (adress) => {
    try {
        const res = await fetch("http://79.174.94.7:8000" + adress, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export default ToDoListBuddyScreen;
