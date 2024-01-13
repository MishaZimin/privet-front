//2.2.2. Приветственный экран

import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { styles } from "../../main.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
} from "../../Utils.jsx";
import BackButton from "../../back-button.jsx";
import Loader from "../../loader.jsx";

const ArrivalSubmitted = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleProfile = async () => {
        try {
            setLoading(true);

            const response = await getTokenToServer(
                userData.access_token,
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

    return (
        <SafeAreaView style={arrivals.main}>
            <ScrollView style={arrivals.main}>
                <View style={arrivals.form}>
                    <Image
                        resizeMode="contain"
                        style={arrivals.img}
                        source={require("../../img/3d-fluency-confetti.png")}
                    />
                    <View style={arrivals.welcomeTextForm}>
                        <View style={arrivals.textBlock}>
                            <Text style={arrivals.textHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Arrival Submitted",
                                    "Приезд зарегистрирован"
                                )}
                            </Text>
                        </View>
                        {/* <View style={styles.textBlock}> */}
                        <Text style={styles.text}>
                            {languageTranslate(
                                userData.language,
                                "Your arrival has been conveyed to your accompanying organization, thank you!",
                                "Ваш приезд был передан вашей сопровождающей организации, спасибо!"
                            )}
                        </Text>
                        <Text style={styles.text}>
                            {languageTranslate(userData.language, "", "")}
                        </Text>
                        <Text style={styles.text}>
                            {languageTranslate(
                                userData.language,
                                'Arrival information will be displayed in the "Task List" section',
                                'Информациия о приезде будет отображаться в разделе "Список задач"'
                            )}
                        </Text>
                        <Text style={styles.text}>
                            {languageTranslate(userData.language, "", "")}
                        </Text>
                        <Text style={styles.text}>
                            {languageTranslate(
                                userData.language,
                                "You can also tell us additional information about you in your profile",
                                "Вы также можете сообщить нам дополнительную информацию о вас в вашем профиле"
                            )}
                        </Text>

                        {/* </View> */}
                        <View style={arrivals.buttons}>
                            <TouchableOpacity
                                style={[
                                    arrivals.button,
                                    {
                                        backgroundColor: "rgb(122, 60, 227)",
                                    },
                                ]}
                                title=""
                                onPress={handleProfile}
                            >
                                <Text style={arrivals.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        "Profile",
                                        "Профиль"
                                    )}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={arrivals.button}
                                title="2-3 sec"
                                onPress={handleToDoList}
                            >
                                <Text style={arrivals.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        "To Do List",
                                        "Список Задач"
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Loader loading={loading} text="" />
            </ScrollView>
        </SafeAreaView>
    );
};

export const arrivals = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
    },
    form: {
        flex: 1,
        gap: 0,
        backgroundColor: "white",
    },

    img: {
        flex: 4,
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "white",
        width: "50%",
        marginLeft: "25%",
    },

    textBlock: {
        width: "90%",
        margin: 0,
        padding: 0,
    },
    textHeader: {
        marginTop: "0%",
        paddingBottom: "5%",
        fontSize: 22,
        fontWeight: "700",

        textAlign: "left",
    },

    welcomeTextForm: {
        flex: 5,
        width: "100%",
        padding: "8%",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        shadowColor: "grey",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },

    buttonsFind: {
        flex: 1,
        width: "53%",
        marginLeft: "23.5%",
        // marginTop: "5%",
        marginBottom: "15%",
    },
    buttons: {
        flex: 1,
        width: "53%",
        marginLeft: "23.5%",
        marginTop: "5%",
        marginBottom: "15%",
    },

    button: {
        padding: "5%",
        paddingTop: "8%",
        paddingBottom: "8%",

        margin: "2%",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
        borderRadius: 30,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textButton: {
        fontWeight: "700",
        textAlign: "center",

        color: "white",

        fontSize: 18,
    },
});

export default ArrivalSubmitted;
