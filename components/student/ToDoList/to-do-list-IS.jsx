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
    const invitation1 = route.params.responseInvitation;
    // const invitation = null;

    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState(todolist);
    const [invitation, setInvitation] = useState(invitation1);

    console.log("todolist", todolist);

    const updateProgress = () => {
        if (tasks.length == 0) {
            return;
        }
        const completedTasks = tasks.filter((task) => task.completed);
        const newProgress = (completedTasks.length / tasks.length) * 100;

        if (!isNaN(newProgress)) {
            setProgress(newProgress);
        } else {
            console.error("Invalid progress value:", newProgress);
        }
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

    const handleBookMyArrival1 = async () => {
        navigation.navigate("ArrivalSubmitted");
    };

    const handleSubmit = async () => {
        const accessToken = await AsyncStorage.getItem("access_token");

        const response = await getTokenToServer(
            accessToken,
            "/users/me/profile",
            "/json"
        );

        const data = {
            full_name: response.profile_info.full_name,
            sex: response.profile_info.sex,
            citizenship: response.profile_info.citizenship,
            phone: response.contacts.phone,
            telegram: response.contacts.telegram,
            whatsapp: response.contacts.whatsapp,
            vk: response.contacts.vk,
            tickets: "tickets",
            submit_arrival: true,
        };

        console.log(data);

        const responseSubmit = await postSubmitInvitation(
            data,
            userData.access_token,
            "/users/me/submit-invitation",
            "/json"
        );
        if (responseSubmit.detail == "User has been added to arrival") {
            setInvitation(null);
        } else if (
            responseSubmit.detail == "User hasn't been invited to any arrival"
        ) {
            Alert.alert("User hasn't been invited to any arrival");
        }
    };

    const handleNotSubmit = async () => {
        const accessToken = await AsyncStorage.getItem("access_token");

        const response = await getTokenToServer(
            accessToken,
            "/users/me/profile",
            "/json"
        );

        const data = {
            full_name: response.profile_info.full_name,
            sex: response.profile_info.sex,
            citizenship: response.profile_info.citizenship,
            phone: response.contacts.phone,
            telegram: response.contacts.telegram,
            whatsapp: response.contacts.whatsapp,
            vk: response.contacts.vk,
            tickets: "tickets",
            submit_arrival: false,
        };

        console.log(data);
        const responseSubmit = await postSubmitInvitation(
            data,
            userData.access_token,
            "/users/me/submit-invitation",
            "/json"
        );

        setInvitation(null);
    };

    useEffect(() => {
        updateProgress();
    }, [tasks]);

    return (
        <SafeAreaView style={stylesToDoList.main}>
            <ScrollView style={stylesToDoList.main}>
                <View style={stylesToDoList.form}>
                    {/* <BackButton /> */}
                    <View style={styles.textBlock}>
                        <Text style={stylesToDoList.textHeader}>
                            {languageTranslate(
                                userData.language,
                                userData.fullName + ", Privet👋",
                                userData.fullName + ", Privet👋"
                            )}
                        </Text>
                    </View>

                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}

                    {todolist.length == 0 ? (
                        <TouchableOpacity
                            onPress={handleBookMyArrival}
                            style={[
                                stylesToDoList.taskItem,
                                {
                                    backgroundColor: "rgb(244, 193, 66)",
                                },
                            ]}
                        >
                            <View style={stylesToDoList.numberTask}>
                                <Text style={stylesToDoList.numberTaskText}>
                                    0
                                </Text>
                            </View>
                            <View style={stylesToDoList.textTaksContainer}>
                                <Text
                                    style={[
                                        {
                                            textDecorationLine: "none",

                                            color: "black",
                                        },
                                        stylesToDoList.text,
                                    ]}
                                >
                                    {languageTranslate(
                                        userData.language,
                                        "Book My Arrival",
                                        "Зарегистрировать приезд"
                                    )}
                                </Text>
                            </View>
                            {/* <View style={stylesToDoList.line}></View> */}
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
                                            color="black"
                                        />
                                    </View>

                                    {todolist.map((task) => (
                                        <TouchableOpacity
                                            key={task.id}
                                            style={[
                                                stylesToDoList.taskItem,
                                                {
                                                    backgroundColor:
                                                        task.completed
                                                            ? "rgb(200, 200, 200)"
                                                            : task.id % 3 === 1
                                                            ? "rgb(244, 193, 66)"
                                                            : task.id % 3 === 2
                                                            ? "rgb(234, 73, 143)"
                                                            : "rgb(59, 133, 247)",
                                                    // opacity: task.completed
                                                    //     ? 0.4
                                                    //     : 1,
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

                    {invitation != null ? (
                        <TouchableOpacity style={stylesToDoList.invitations}>
                            <View>
                                <Text
                                    style={stylesToDoList.textHeaderInvitation}
                                >
                                    Приглашение в приезд
                                </Text>
                                <Text style={stylesToDoList.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival ID: ",
                                        "ID приезда: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {invitation.id}
                                </Text>

                                <Text style={stylesToDoList.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival Date: ",
                                        "Дата приезда: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {invitation.arrival_date.slice(0, 10)}
                                </Text>

                                <Text style={stylesToDoList.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival point",
                                        "Пункт прибытия"
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {invitation.arrival_point}
                                </Text>
                                <Text style={stylesToDoList.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Flight number",
                                        "Номер рейса"
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {invitation.flight_number}
                                </Text>
                                <Text style={stylesToDoList.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Comment",
                                        "Комментарий"
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {invitation.comment}
                                </Text>

                                {/* <Text style={stylesToDoList.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Buddies Amount: ",
                                        "Количество сопровождающих: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {invitation.confirmed}
                                </Text> */}

                                {/* <Text style={styles.studentName}>
                                    Arrival ID: {invitation.id}
                                </Text>
                                <Text style={styles.studentAge}>
                                    arrival_date:{" "}
                                    {invitation.arrival_date.slice(0, 10)}
                                </Text>
                                <Text style={styles.studentAge}>
                                    arrival_point: {invitation.arrival_point}
                                </Text>

                                <Text style={styles.studentAge}>
                                    comment: {invitation.comment}
                                </Text>

                                <Text style={styles.studentAge}>
                                    confirmed: {invitation.confirmed}
                                </Text> */}

                                {/* <Text style={styles.studentName}>
                                    flight_number: {invitation.flight_number}
                                </Text>
                                <Text style={styles.studentAge}>
                                    tickets: {invitation.tickets}
                                </Text> */}
                                <Text></Text>
                            </View>
                            <View style={stylesToDoList.invitationButtons}>
                                <TouchableOpacity
                                    style={stylesToDoList.invitationButton}
                                    title=""
                                    onPress={() => handleSubmit(invitation.id)}
                                >
                                    <Text style={stylesToDoList.textButton}>
                                        {languageTranslate(
                                            userData.language,
                                            "Accept",
                                            "Принять"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={stylesToDoList.invitationButton}
                                    title=""
                                    onPress={() =>
                                        handleNotSubmit(invitation.id)
                                    }
                                >
                                    <Text style={stylesToDoList.textButton}>
                                        {languageTranslate(
                                            userData.language,
                                            "Decline",
                                            "Отклонить"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
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

        paddingTop: 25,
        marginBottom: -20,
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

    textHeaderInvitation: {
        marginTop: "0%",
        paddingBottom: "5%",
        fontSize: 18,
        fontWeight: "700",

        textAlign: "center",
    },

    textHeader: {
        marginTop: "0%",
        paddingBottom: "2%",
        fontSize: 28,
        fontWeight: "600",

        textAlign: "center",
    },

    invitations: {
        backgroundColor: "white",
        padding: "8%",
        marginTop: "10%",
        borderRadius: 30,
        width: "100%",
        borderRadius: 40,

        shadowColor: "grey",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
    },

    invitation: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "silver",
        padding: "5%",
        marginBottom: "5%",
        borderRadius: 30,
        width: "100%",
        borderRadius: 30,
    },

    invitationButtons: {
        display: "flex",
        flexDirection: "row",

        alignSelf: "center",
    },

    invitationButton: {
        width: "45%",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        margin: "2%",
        alignItems: "center",
        backgroundColor: "white",
        color: "grey",

        borderWidth: 1,

        borderRadius: 40,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    text1: {
        padding: "1%",
        width: "100%",
    },
    text2: {
        padding: "1%",
        width: "100%",
        fontWeight: "700",
    },

    textButton: {
        fontWeight: "600",
    },
});

const postSubmitInvitation = async (data, token, adress, contentType) => {
    try {
        let bodyData =
            contentType == "/json"
                ? JSON.stringify(data)
                : new URLSearchParams(data).toString();

        const res = await fetch("http://79.174.94.7:8000" + adress, {
            method: "POST",
            headers: {
                Accept: "application" + contentType,
                Authorization: "Bearer " + token,
                "Content-Type": "application" + contentType,
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
};

export default ToDoListISScreen;
