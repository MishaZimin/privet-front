import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    registrationData,
    languageTranslate,
    getDataFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
    invitationsData,
    showTasks,
    arrivalBookDataArr,
    initialTasksData,
} from "../Utils.jsx";
// import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";
import Loader from "../loader.jsx";

const StudentsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleStudentProfile = async () => {
        try {
            setLoading(true);

            const accessToken = await AsyncStorage.getItem("access_token");

            const response = await getTokenToServer(
                accessToken,
                "/users/me/profile",
                "/json"
            );

            userData.fullName = response.profile_info.full_name;
            userData.citizenship = response.profile_info.citizenship;
            userData.sex = response.profile_info.sex;
            userData.birthDate = response.profile_info.birthdate;

            userData.phone = response.contacts.phone;
            userData.email = response.contacts.email;
            userData.telegram = response.contacts.telegram;
            userData.whatsApp = response.contacts.whatsapp;
            userData.vk = response.contacts.vk;

            userData.nativeLanguage = response.profile_info.native_language;
            userData.otherLanguage = response.contacts.other_languages;
            userData.university = response.profile_info.university;
            userData.escortIsPaid = response.profile_info.escort_paid;

            userData.id = response.contacts.user_id;

            const userProfile = {
                fullName: response.profile_info.full_name,
                citizenship: response.profile_info.citizenship,
                sex: response.profile_info.sex,

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
                escortIsPaid: response.profile_info.escort_paid,

                id: response.profile_info.user_id,
            };

            console.log("---", userData.sex);

            navigation.navigate("StudentProfileScreen", { userProfile });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleToDoList = async () => {
        try {
            setLoading(true);

            // получение приглашений
            const responseInvitation = await getTokenToServer(
                userData.access_token,
                "/users/me/check-invitation",
                "/json"
            );

            const responseMeArrivals = await getTokenToServer(
                userData.access_token,
                "/me/arrivals",
                "/json"
            );

            if (responseMeArrivals.length > 0) {
                const showTasks = await getTokenToServer(
                    userData.access_token,
                    "/users/me/tasks",
                    "/json"
                );

                var initialTasksDataCopy = [
                    {
                        id: 1,
                        text: "Встреча в аэропорту ",
                        completed: showTasks.airport_meeting,
                        deadline:
                            "\n" +
                            responseMeArrivals[0].arrival_date.slice(0, 10),
                    },
                    {
                        id: 2,
                        text: "Оплата и заселение в хостел",
                        completed: showTasks.motel_checked_in,
                    },
                    {
                        id: 3,
                        text: "Прохождение медосмотра",
                        completed: showTasks.medical_examinated,
                    },
                    {
                        id: 4,
                        text: "Оформление сим-карты",
                        completed: showTasks.sim_card_created,
                    },
                    {
                        id: 5,
                        text: "Обмен денег",
                        completed: showTasks.money_exchange,
                    },
                    {
                        id: 6,
                        text: "Перевод и нотариальное заверение паспорта",
                        completed: showTasks.passport_translated,
                    },
                    {
                        id: 7,
                        text: "Оформление банковской карты",
                        completed: showTasks.bank_card,
                    },
                    {
                        id: 8,
                        text: "Оформление документов о зачислении",
                        completed: showTasks.enrollment_documents,
                    },
                    {
                        id: 9,
                        text: "Оформление страховки",
                        completed: showTasks.insurance,
                    },
                    {
                        id: 10,
                        text: "Оформление документов на общежитие",
                        completed: showTasks.dormitory_documents,
                    },

                    {
                        id: 11,
                        text: "Оформление студенческого билета",
                        completed: showTasks.student_ID,
                    },
                    {
                        id: 12,
                        text: "Оформление электронного пропуска",
                        completed: showTasks.student_pass,
                        taskName: "student_pass",
                    },
                    {
                        id: 13,
                        text: "Прохождение медосвидетельствования",
                        completed: showTasks.medical_tests[0],
                        deadline: "\nDeadline: " + showTasks.medical_tests[1],
                    },
                    {
                        id: 14,
                        text: "Продление визы",
                        completed: showTasks.visa_extension[0],
                        deadline: "\nDeadline: " + showTasks.visa_extension[1],
                    },
                    {
                        id: 15,
                        text: "Прохождение дактилоскопии",
                        completed: showTasks.fingerprinting[0],
                        deadline: "\nDeadline: " + showTasks.fingerprinting[1],
                    },
                ];
            } else {
                var initialTasksDataCopy = [];
            }

            console.log("responseMeArrivals:", responseMeArrivals);
            if (responseInvitation != null) {
                invitationsData.length = 0;
                invitationsData.push(responseInvitation);
            }

            navigation.navigate("ToDoListISScreen", {
                initialTasksDataCopy,
                responseInvitation,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const handleRoute = () => {
        navigation.navigate("RouteScreen");
    };
    const handleInfo = () => {
        navigation.navigate("InfoScreen");
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
            Alert.alert("Error: ", err);
        } finally {
            setLoading(false);
        }
    };
    const handleStudentProfileForBuddy = () => {
        navigation.navigate("StudentProfileForBuddy");
    };

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleStudentProfile"
                        onPress={handleStudentProfile}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("../img/3d-fluency-male-user.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Profile",
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
                            source={require("../img/3d-fluency-test-passed.png")}
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
                        title="handleRoute"
                        onPress={handleRoute}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("../Buddy/3d-fluency-test-passed.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Route",
                                "Маршрут"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="handleInfo"
                        onPress={handleInfo}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.img}
                            source={require("../img/3d-fluency-open-book.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Info",
                                "Информация"
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
                            source={require("../img/3d-fluency-chat-bubbles.png")}
                        />
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Chat",
                                "Чат"
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Loader loading={loading} text="" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        padding: 0,
        margin: 0,
        backgroundColor: "none",
    },

    form: {
        backgroundColor: "white",
        justifyContent: "space-between",

        padding: 0,
        margin: 0,

        backgroundColor: "none",
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

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

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
        fontWeight: "700",
    },
    img: {
        width: 30,
        height: 30,
        marginBottom: "10%",
    },
});

const getToDoList = async (adress, token) => {
    try {
        const res = await fetch("http://79.174.94.7:8000" + adress, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const userData = await res.json();
        console.log(userData);
        return userData;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default StudentsScreen;
