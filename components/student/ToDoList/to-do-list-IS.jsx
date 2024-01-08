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
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    // initialTasksData,
    userData,
    arrivalBookData,
    getTokenToServer,
    arrivalBookDataArr,
    invitationsData,
    showTasks,
} from "../../Utils.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../main.jsx";
import * as Progress from "react-native-progress";
import BackButton from "../../back-button.jsx";
import StudentsScreen from "../student.jsx";
import Loader from "../../loader.jsx";

const ToDoListISScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);

    const todolist = route.params.initialTasksDataCopy;

    console.log("todolist", todolist);

    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState(todolist);

    const updateProgress = () => {
        const completedTasks = tasks.filter((task) => task.completed);
        const newProgress = (completedTasks.length / tasks.length) * 100;

        console.log(newProgress);
        setProgress(newProgress);
    };

    const handleBookMyArrival = async () => {
        const accessToken = await AsyncStorage.getItem("access_token");
        const response = await getTokenToServer(
            accessToken,
            "/users/me/profile",
            "/json"
        );

        console.log("----", response);
        console.log("escort_paid", response.profile_info.escort_paid);

        if (response.profile_info.escort_paid) {
            userData.escortIsPaid = true;
            navigation.navigate("ArrivalBookingScreen");
        } else {
            navigation.navigate("PaymentScreen");
        }
    };

    const handleSubmit = async () => {
        const data = {
            full_name: userData.fullName == "" ? null : userData.fullName,
            sex: "string",
            citizenship:
                userData.citizenship == "" ? null : userData.citizenship,
            phone: userData.phone == "" ? null : userData.phone,
            telegram: userData.telegram == "" ? null : userData.telegram,
            whatsapp: userData.whatsApp == "" ? null : userData.whatsApp,
            vk: userData.vk == "" ? null : userData.vk,
            tickets: "string",
            submit_arrival: true,
        };
        const response = await postSsubmitInvitation(
            data,
            userData.access_token,
            "/users/me/submit-invitation",
            "/json"
        );
        if (response.detail == "User has been added to arrival") {
        } else if (
            response.detail == "User hasn't been invited to any arrival"
        ) {
            invitationsData = null;
        } else {
            console.log("че бля");
        }
    };

    useEffect(() => {
        updateProgress();
    }, [tasks]);

    return (
        <SafeAreaView style={stylesToDoList.main}>
            <ScrollView style={stylesToDoList.main}>
                <View style={stylesToDoList.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
                                "To Do List",
                                "Список задач"
                            )}
                        </Text>
                    </View>
                    {invitationsData.length > 0 ? (
                        invitationsData.map((arrival, index) => (
                            <TouchableOpacity style={styles.buddysStudents}>
                                <View>
                                    <Text style={styles.textHeader}>
                                        Приглашение в приезд
                                    </Text>
                                    <Text style={styles.studentName}>
                                        Arrival ID: {arrival.id}
                                    </Text>
                                    <Text style={styles.studentAge}>
                                        arrival_date: {arrival.arrival_date}
                                    </Text>
                                    <Text style={styles.studentAge}>
                                        arrival_point: {arrival.arrival_point}
                                    </Text>

                                    <Text style={styles.studentAge}>
                                        comment: {arrival.comment}
                                    </Text>

                                    <Text style={styles.studentAge}>
                                        confirmed: {arrival.confirmed}
                                    </Text>

                                    <Text style={styles.studentName}>
                                        flight_number: {arrival.flight_number}
                                    </Text>
                                    <Text style={styles.studentAge}>
                                        tickets: {arrival.tickets}
                                    </Text>
                                    <Text></Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    title=""
                                    onPress={() =>
                                        handleSubmit(invitationsData.arrivalID)
                                    }
                                >
                                    <Text style={styles.textButton}>
                                        {languageTranslate(
                                            userData.language,
                                            "Accept arrival",
                                            "Принять приезд"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View>
                            <Text style={styles.studentName}>
                                {/* {languageTranslate(
                                    userData.language,
                                    "You dont have any invitations",
                                    "У вас нет приглашений"
                                )} */}
                            </Text>
                        </View>
                    )}

                    {tasks.length == 0 ? (
                        <TouchableOpacity
                            style={styles.button}
                            title="BookMyArrival"
                            onPress={handleBookMyArrival}
                        >
                            <Text style={styles.textButto}>
                                {languageTranslate(
                                    userData.language,
                                    "Book My Arrival",
                                    "Зарегистрировать приезд"
                                )}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View>
                            {userData.escortIsPaid ? (
                                <View style={stylesToDoList.toDoList}>
                                    <View
                                        style={stylesToDoList.progressContainer}
                                    >
                                        <Text style={stylesToDoList.progress}>
                                            {progress.toFixed(1)}%
                                        </Text>
                                        <Progress.Bar
                                            style={stylesToDoList.progressBar}
                                            progress={progress.toFixed(1) / 100}
                                            width={240}
                                        />
                                    </View>

                                    {tasks.map((task) => (
                                        <TouchableOpacity
                                            key={task.id}
                                            style={[
                                                stylesToDoList.taskItem,
                                                {
                                                    backgroundColor:
                                                        task.id % 3 === 1
                                                            ? "rgb(255, 183, 68)"
                                                            : task.id % 3 === 2
                                                            ? "pink"
                                                            : "lightblue",
                                                    opacity: task.completed
                                                        ? 0.4
                                                        : 1,
                                                },
                                            ]}
                                        >
                                            <View
                                                style={
                                                    stylesToDoList.numberTask
                                                }
                                            >
                                                <Text
                                                    style={
                                                        stylesToDoList.numberTaskText
                                                    }
                                                >
                                                    {task.id}
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    stylesToDoList.textTaksContainer
                                                }
                                            >
                                                <Text
                                                    style={[
                                                        {
                                                            textDecorationLine:
                                                                task.completed
                                                                    ? "line-through"
                                                                    : "none",
                                                            color: task.completed
                                                                ? "gray"
                                                                : "black",
                                                        },
                                                        stylesToDoList.text,
                                                    ]}
                                                >
                                                    {task.text}
                                                    <Text
                                                        style={styles.deadline}
                                                    >
                                                        {task.deadline !== null
                                                            ? task.deadline
                                                            : ""}
                                                    </Text>
                                                </Text>
                                            </View>
                                            <View
                                                style={stylesToDoList.line}
                                            ></View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : null}
                        </View>
                    )}
                </View>
                <Loader loading={loading} text="" />
            </ScrollView>
            <StudentsScreen navigation={navigation} />
        </SafeAreaView>
    );
};

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

        justifyContent: "center",
    },

    progressBar: {
        maxHeight: 8,
        marginTop: "1.5%",
        marginLeft: "2%",

        color: "red",
    },

    toDoList: {
        // padding: "5%",
        width: "100%",
        margin: "0%",
        borderRadius: 30,

        textAlign: "top",
        marginBottom: 60,
    },
    taskItem: {
        flexDirection: "row",
        padding: "3%",
        marginTop: 40,
        width: "100%",
        backgroundColor: "rgb(255, 183, 68)",
        // padding: "10%",
        borderRadius: 40,
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
        fontSize: 20,
        fontWeight: "700",
    },

    line: {
        position: "absolute",
        top: 70,
        left: 33,
        borderWidth: 2,
        height: 40,
        zIndex: -1,
    },
});

const postSsubmitInvitation = async (data, token, adress, contentType) => {
    try {
        let bodyData =
            contentType == "/json"
                ? JSON.stringify(data)
                : new URLSearchParams(data).toString();

        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "POST",
                headers: {
                    Accept: "application" + contentType,
                    Authorization: "Bearer " + token,
                    "Content-Type": "application" + contentType,
                },
                body: bodyData,
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export default ToDoListISScreen;
