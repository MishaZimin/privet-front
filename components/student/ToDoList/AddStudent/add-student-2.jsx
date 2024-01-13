//2.2.3. Регистрация Сопровождающего

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
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
    arrivalBookDataArr,
    sendDataToServer,
} from "../../../Utils.jsx";
import { styles } from "../../../main.jsx";
import BackButton from "../../../back-button.jsx";

const nameArr = ["Name1@mail.ru", "Name2@mail.ru", "Gg424gg@mail.ru"];
const arrivalBookDataSecond = {
    id: "",
    arrivalDate: "",
    flightNumber: "",
    arrivalPoint: "",
    comment: "",
    tickets: "",

    fullName: "",
    sex: null,
    arrivalTime: "",
    citizenship: "",
    phone: "",
    telegram: "",
    whatsApp: "",
    vk: "",
};

const AddSecondScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState(null);
    const [sex, setSex] = useState(null);

    const [arrivalDate, setArrivalDate] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);
    const [flightNumber, setFlightNumber] = useState(null);
    const [citizenship, setCitizenship] = useState(null);
    const [arrivalPoint, setArrivalPoint] = useState(null);

    const [phone, setPhone] = useState(null);
    const [telegram, setTelegram] = useState(null);
    const [whatsApp, setWhatsApp] = useState(null);
    const [vk, setVk] = useState(null);

    const [comment, setComment] = useState(null);
    const [tickets, setTickets] = useState(null);

    const [isCorrectName, setIsCorrectName] = useState(false);
    const [accessToInputs, setaccessToInputs] = useState(null);

    const handleSave = async () => {
        // addStudent('4563', arrivalDate, flightNumber, arrivalPoint, comment, tickets, fullName, sex, arrivalTime, citizenship, phone, telegram, whatsApp, vk);

        arrivalBookDataArr.length = 1;
        const invite = arrivalBookDataArr[0].invite;
        invite.length = 0;
        console.log(invite.length);
        // arrivalBookDataArr.push(data);
        arrivalBookDataArr[0].invite.push(fullName);
        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr[0]);
        // console.log(arrivalBookDataArr);

        const response = await postArrivalBook(
            arrivalBookDataArr[0],
            "/users/me/book-arrival",
            "/json",
            userData.access_token
        );
        console.log(response);

        if (response.detail == "Arrival has been booked") {
            navigation.navigate("ArrivalSubmitted");
        } else {
            Alert.alert("Произошла ошибка");
        }
    };

    const handleAdd = () => {
        addStudent(
            "4563",
            arrivalDate,
            flightNumber,
            arrivalPoint,
            comment,
            tickets,
            fullName,
            sex,
            arrivalTime,
            citizenship,
            phone,
            telegram,
            whatsApp,
            vk
        );

        const invite = arrivalBookDataArr[0].invite;
        invite.length = 0;
        console.log(invite.length);
        // arrivalBookDataArr.push(data);
        arrivalBookDataArr[0].invite.push(fullName);
        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr[0].invite);
        console.log(arrivalBookDataArr);

        navigation.navigate("AddThirdScreen");
    };

    const handleDelete = () => {
        navigation.goBack();
    };

    const handleFind = async () => {
        try {
            // console.log('find', isCorrectName, fullName);

            const isPayment = await getUserPyment(
                "/check-payment/" + fullName,
                "application/json"
            );
            console.log("--", isPayment);
            if (isPayment.detail == "User does not exist") {
                setIsCorrectName(false);
                setaccessToInputs("мы не нашли сдудента");
            }
            if (isPayment == true) {
                // оплата приезда
                console.log("можно редактировать");
                setaccessToInputs("студент есть в системе и услуги оплачены");
                setIsCorrectName(true);
            }
            if (isPayment == false) {
                setIsCorrectName(false);
                setaccessToInputs(
                    "студент есть в системе, но услуги не оплачены"
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={arrivalBooking.main}>
            <ScrollView style={arrivalBooking.main}>
                <View style={arrivalBooking.form}>
                    {/* <BackButton /> */}
                    <View style={arrivalBooking.textBlock}>
                        <Text style={arrivalBooking.textHeader}>
                            {languageTranslate(
                                userData.language,
                                "Find a student",
                                "Найти студента"
                            )}
                        </Text>
                    </View>
                    <View style={arrivalBooking.textInputs}>
                        {/* <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Full Name",
                                "Полное имя"
                            )}
                        </Text> */}
                        <TextInput
                            style={arrivalBooking.textInput}
                            placeholder="Введите почту студента"
                            value={fullName}
                            editable={!isCorrectName}
                            onChangeText={(text) => setFullName(text)}
                        />
                        <Text style={arrivalBooking.find}>
                            {accessToInputs}
                        </Text>
                        <View style={arrivalBooking.buttonsFind}>
                            <TouchableOpacity
                                style={arrivalBooking.button}
                                onPress={handleFind}
                            >
                                <Text style={arrivalBooking.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        "Find Student",
                                        "Найти студента"
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={arrivalBooking.buttons}>
                    <TouchableOpacity
                        style={[
                            arrivalBooking.button,
                            { backgroundColor: "black" },
                        ]}
                        onPress={handleDelete}
                    >
                        <Text
                            style={[
                                arrivalBooking.textButton,
                                { color: "white" },
                            ]}
                        >
                            {languageTranslate(
                                userData.language,
                                "Delete this participant",
                                "Удалить этого участника"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            arrivalBooking.button,
                            { backgroundColor: "rgb(122, 60, 227)" },
                        ]}
                        onPress={isCorrectName ? handleAdd : null}
                    >
                        <Text style={arrivalBooking.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Add a participant",
                                "Добавить участника"
                            )}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            arrivalBooking.button,
                            { backgroundColor: "rgb(245, 193, 68)" },
                        ]}
                        onPress={isCorrectName ? handleSave : null}
                    >
                        {/* disabled={isCorrectName} */}
                        <Text style={arrivalBooking.textButton}>
                            {languageTranslate(
                                userData.language,
                                "Submit Arrival",
                                "Отправить информацию о приезде"
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const arrivalBooking = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
    },
    form: {
        flex: 1,
        gap: 0,
        backgroundColor: "white",
    },

    textHeader: {
        paddingLeft: "10%",
        paddingBottom: "20%",
        fontWeight: "700",
        fontSize: 30,
        paddingTop: "5%",
    },

    buttons: {
        flex: 1,
        width: "53%",
        marginLeft: "23.5%",
        marginTop: "5%",
        marginBottom: "15%",
    },

    buttonsFind: {
        flex: 1,
        width: "53%",
        marginLeft: "23.5%",
        // marginTop: "5%",
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
        borderRadius: 18,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textButton: {
        fontWeight: "700",
        textAlign: "center",

        color: "white",
    },
    textInputs: {
        flex: 1,
        width: "90%",
        marginLeft: "5%",
        padding: "5%",
        marginBottom: "15%",

        justifyContent: "start",
    },

    textInput: {
        width: "100%",
        padding: "1%",
        marginTop: "0%",
        borderBottomWidth: 1,
        borderColor: "grey",
    },

    inputHeader: {
        // marginTop: "10%",
        textAlign: "left",
        marginLeft: "5%",
        marginBottom: "1%",
    },

    find: {
        paddingTop: "2%",
        paddingBottom: "5%",
        color: "#1E90FF",

        fontWeight: "600",

        textDecorationLine: "underline",
    },

    textBlock: {
        marginTop: "15%",
    },
});

const addStudent = (
    id,
    arrivalDate,
    flightNumber,
    arrivalPoint,
    comment,
    tickets,
    fullName,
    sex,
    arrivalTime,
    citizenship,
    phone,
    telegram,
    whatsApp,
    vk
) => {
    arrivalBookDataSecond.id = id;
    arrivalBookDataSecond.arrivalDate = arrivalDate;
    arrivalBookDataSecond.flightNumber = flightNumber;
    arrivalBookDataSecond.arrivalPoint = arrivalPoint;
    arrivalBookDataSecond.comment = comment;
    arrivalBookDataSecond.tickets = tickets;
    arrivalBookDataSecond.fullName = fullName;
    arrivalBookDataSecond.sex = sex;
    arrivalBookDataSecond.arrivalTime = arrivalTime;
    arrivalBookDataSecond.citizenship = citizenship;
    arrivalBookDataSecond.phone = phone;
    arrivalBookDataSecond.telegram = telegram;
    arrivalBookDataSecond.whatsApp = whatsApp;
    arrivalBookDataSecond.vk = vk;
};

const addStudentArr = () => {
    arrivalBookDataArr.length = 1;
    arrivalBookDataArr.push(arrivalBookDataSecond);

    console.log("--arrivalBookDataArr--");
    console.log(arrivalBookDataArr);
};

const postArrivalBook = async (data, adress, contentType, token) => {
    try {
        const res = await fetch("http://79.174.94.7:8000" + adress, {
            method: "POST",
            headers: {
                Accept: "application" + contentType,
                "Content-Type": "application" + contentType,
                Authorization: "Bearer " + token,
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        console.log(res);
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

const getUserPyment = async (adress, contentType) => {
    try {
        const res = await fetch("http://79.174.94.7:8000" + adress, {
            method: "GET",
            headers: {
                "Content-Type": "application" + contentType,
            },
            credentials: "include",
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export default AddSecondScreen;
