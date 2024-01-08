import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
    myArrivals,
    initialTasksData,
    allarrivalBookArr,
} from "../Utils.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../back-button.jsx";
import Loader from "../loader.jsx";

const BuddysScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleBuddyProfile = async () => {
        try {
            setLoading(true);

            const accessToken = await AsyncStorage.getItem("access_token");
            const response = await getTokenToServer(
                accessToken,
                "/users/me/profile",
                "/json"
            );

            userData.university = response.profile_info.university;
            userData.city = response.profile_info.city;
            userData.fullName = response.profile_info.full_name;
            userData.birthDate = response.profile_info.birthdate;

            userData.phone = response.contacts.phone;
            userData.email = response.contacts.email;
            userData.telegram = response.contacts.telegram;
            userData.whatsApp = response.contacts.whatsapp;
            userData.vk = response.contacts.vk;

            userData.nativeLanguage = response.profile_info.nativeLanguage;
            userData.otherLanguage = response.contacts.other_languages;

            userData.buddyStatus = response.profile_info.buddy_status;

            userData.id = response.contacts.user_id;

            const userProfile = {
                fullName: response.profile_info.full_name,
                university: response.profile_info.university,
                city: response.profile_info.city,
                birthDate: response.profile_info.birthdate,
                phone: response.contacts.phone,
                email: response.contacts.email,
                telegram: response.contacts.telegram,
                whatsApp: response.contacts.whatsapp,
                vk: response.contacts.vk,
                nativeLanguage: response.profile_info.native_language,
                otherLanguage: response.other_languages,
                buddyStatus: response.profile_info.buddy_status,
                id: response.profile_info.user_id,
            };

            navigation.navigate("BuddyProfileScreen", { userProfile });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleToDoList = async () => {
        try {
            setLoading(true);
            const responseMeArrivals = await getTokenToServer(
                userData.access_token,
                "/me/arrivals",
                "/json"
            );
            const allBuddies = await getTokenToServer(
                userData.access_token,
                "/buddies",
                "/json"
            );

            const responseTasks = [];
            const studentsID = [];
            const studentsName = [];

            if (responseMeArrivals.length > 0) {
                console.log(
                    "responseMeArrivals[0].arrival_id:",
                    responseMeArrivals[0].arrival_id
                );

                const responseArrival = await getIDArrivalToServer(
                    responseMeArrivals[0].arrival_id.toString()
                );

                if (responseArrival.details == "wrong task name") {
                    Alert.alert("wrong task name");
                } else {
                    console.log(responseArrival);

                    responseArrival.map((showTasks) => {
                        console.log("--", showTasks.user_id);
                        const studentID = showTasks.user_id;
                        console.log("--", studentID, allBuddies);
                        const studentName = findNameById(studentID, allBuddies);
                        console.log("--", studentName);

                        var initialTasksDataCopy = [
                            {
                                id: 1,
                                text: "Встреча в аэропорту ",
                                completed: showTasks.airport_meeting,
                                deadline: "\nDeadline: 11.11.2023",
                                taskName: "airport_meeting",
                            },
                            {
                                id: 2,
                                text: "Оплата и заселение в хостел",
                                completed: showTasks.motel_checked_in,
                                taskName: "motel_checked_in",
                            },
                            {
                                id: 3,
                                text: "Прохождение медосмотра",
                                completed: showTasks.medical_examinated,
                                taskName: "medical_examinated",
                            },
                            {
                                id: 4,
                                text: "Оформление сим-карты",
                                completed: showTasks.sim_card_created,
                                taskName: "sim_card_created",
                            },
                            {
                                id: 5,
                                text: "Обмен денег",
                                completed: showTasks.money_exchange,
                                taskName: "money_exchange",
                            },
                            {
                                id: 6,
                                text: "Перевод и нотариальное заверение паспорта",
                                completed: showTasks.passport_translated,
                                taskName: "passport_translated",
                            },
                            {
                                id: 7,
                                text: "Оформление банковской карты",
                                completed: showTasks.bank_card,
                                taskName: "bank_card",
                            },
                            {
                                id: 8,
                                text: "Оформление документов о зачислении",
                                completed: showTasks.enrollment_documents,
                                taskName: "enrollment_documents",
                            },
                            {
                                id: 9,
                                text: "Оформление страховки",
                                completed: showTasks.insurance,
                                taskName: "insurance",
                            },
                            {
                                id: 10,
                                text: "Оформление документов на общежитие",
                                completed: showTasks.dormitory_documents,
                                taskName: "dormitory_documents",
                            },
                            {
                                id: 11,
                                text: "student_ID",
                                completed: showTasks.student_ID,
                                taskName: "student_ID",
                            },
                            {
                                id: 12,
                                text: "Прохождение медосвидетельствования",
                                completed: showTasks.medical_tests[0],
                                deadline:
                                    "\nDeadline: " + showTasks.medical_tests[1],
                                taskName: "medical_tests",
                            },
                            {
                                id: 13,
                                text: "Продление визы",
                                completed: showTasks.visa_extension[0],
                                deadline:
                                    "\nDeadline: " +
                                    showTasks.visa_extension[1],
                                taskName: "visa_extension",
                            },
                            {
                                id: 14,
                                text: "Прохождение дактилоскопии",
                                completed: showTasks.fingerprinting[0],
                                deadline:
                                    "\nDeadline: " +
                                    showTasks.fingerprinting[1],
                                taskName: "fingerprinting",
                            },
                        ];

                        console.log("----", initialTasksDataCopy[4]);

                        responseTasks.push(initialTasksDataCopy);
                        studentsID.push(studentID);
                        studentsName.push(studentName);
                        console.log("------", responseTasks);
                    });

                    console.log("--------", responseTasks);

                    navigation.navigate("ToDoListBuddyScreen", {
                        responseMeArrivals,
                        responseTasks,
                        studentsID,
                        studentsName,
                    });
                }
            } else {
                navigation.navigate("ToDoListBuddyScreen", {
                    responseMeArrivals,
                    responseTasks,
                    studentsID,
                    studentsName,
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAllArrivals = async () => {
        try {
            setLoading(true);
            const response = await getTokenToServer(
                userData.access_token,
                "/arrivals",
                "/json"
            );
            console.log("response", response.past_arrivals);
            console.log("-----");

            allarrivalBookArr.length = 0;

            console.log("allarrivalBookArr", allarrivalBookArr);
            console.log("-----");

            const arrivalsData = response.past_arrivals;
            arrivalsData.map((arrival) => {
                console.log("----", arrival);

                const arrivalData = {
                    id: arrival.arrival_id,
                    arrivalDate: arrival.arrival_date.slice(0, 10),
                    flightNumber: "11111",
                    arrivalPoint: "2222",
                    comment: "comment",
                    tickets: "№4324",

                    fullName: arrival.group_full_names,
                    sex: 1,
                    arrivalTime: "3:30 am",
                    citizenship: "usa",
                    phone: "+786895489622",
                    telegram: "@tg-student-1",
                    whatsApp: "+786895489622",
                    vk: "@vk-student-1",

                    countBuddy: arrival.buddies_amount,
                    maxBuddy: 1,

                    buddy: [],
                };

                allarrivalBookArr.push(arrivalData);
            });

            navigation.navigate("AllArrivalsScreen", { allarrivalBookArr });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBuddysStudents = () => {
        navigation.navigate("BuddysStudentsScreen");
    };

    const handleMessenager = async () => {
        try {
            setLoading(true);
            const dataUserBD = await getTokenToServer(
                userData.access_token,
                "/auth/me",
                "/json"
            );
            const roleId = dataUserBD.role_id;

            const chats = await getTokenToServer(
                userData.access_token,
                "/messages/chat/",
                "/json"
            );
            console.log(chats);

            navigation.navigate("MessengerScreen", { roleId, chats });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileForIS = () => {
        navigation.navigate("BuddyProfileForIS");
    };

    return (
        // <SafeAreaView style={styles.main}>
        <View style={styles.main}>
            <View style={styles.form}>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleBuddyProfile"
                        onPress={handleBuddyProfile}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("../welcome/3d-fluency-cowboy-hat-face.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Buddy Profile",
                                "Профиль"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleToDoList"
                        onPress={handleToDoList}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("./3d-fluency-test-passed.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "To Do List",
                                "Задачи"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleAllArrivals"
                        onPress={handleAllArrivals}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("./3d-fluency-boarding-pass.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "All Arrivals",
                                "Все приезды"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleBuddysStudents"
                        onPress={handleBuddysStudents}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("../3d-fluency-graduation-cap.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Students",
                                "Студенты"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="Messenager"
                        onPress={handleMessenager}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("./3d-fluency-chat-bubbles.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Chat",
                                "Чат"
                            )}
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                            style={styles.button}
                            title="handleProfileForIS"
                            onPress={handleProfileForIS}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'ProfileForIS',
                                    'Профиль сопр для студента')}
                            </Text>
                        </TouchableOpacity> */}
                </View>
                <Loader loading={loading} text="" />
            </View>
        </View>
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        // flex: 1,
        backgroundColor: "white",
        padding: 0,
        margin: 0,
    },

    form: {
        // flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",

        padding: 0,
        margin: 0,
    },

    text: {
        width: "100%",
    },

    buttons: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingHorizontal: 15,
        paddingTop: 15,
        justifyContent: "space-between",
        // borderTopWidth: 1,
        borderRadius: 25,
        backgroundColor: "white",

        shadowColor: "grey",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    button: {
        alignItems: "center",
        color: "grey",
        borderRadius: 10,

        // borderWidth: 1,
    },
    textButton: {
        fontSize: 10,
    },
    img: {
        width: 40,
        height: 40,
    },
});

function findNameById(id, data) {
    for (let item of data) {
        if (item.id == id) {
            return item.full_name;
        }
    }
    return null;
}

export const getIDArrivalToServer = async (id) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com/arrivals/tasks/?arrival_id=" +
                id,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        const responseData = await res.json();
        console.log("arrivals/tasks/", responseData);
        return responseData;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default BuddysScreen;
