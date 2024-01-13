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
} from "../../../Utils.jsx";
import { styles } from "../../../main.jsx";
import BackButton from "../../../back-button.jsx";

const nameArr = ["Name1@mail.ru", "Name2@mail.ru"];
const arrivalBookDataThird = {
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

const AddThirdScreen = ({ navigation, route }) => {
    const [fullName, setFullName] = useState();
    const [sex, setSex] = useState();

    const [arrivalDate, setArrivalDate] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [flightNumber, setFlightNumber] = useState();
    const [citizenship, setCitizenship] = useState();
    const [arrivalPoint, setArrivalPoint] = useState();

    const [phone, setPhone] = useState();
    const [telegram, setTelegram] = useState();
    const [whatsApp, setWhatsApp] = useState();
    const [vk, setVk] = useState();

    const [comment, setComment] = useState();
    const [tickets, setTickets] = useState();

    const [isCorrectName, setIsCorrectName] = useState(false);
    const [accessToInputs, setaccessToInputs] = useState();

    const handleSave = async () => {
        arrivalBookDataArr.length = 1;
        const invite = arrivalBookDataArr[0].invite;
        invite.length = 0;
        console.log(invite.length);
        // arrivalBookDataArr.push(data);
        arrivalBookDataArr[0].invite.push(fullName);
        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr[0].invite);
        console.log(arrivalBookDataArr);

        const response = await postArrivalBook(
            arrivalBookDataArr[0],
            "/users/me/book-arrival",
            "/json",
            userData.access_token
        );
        console.log(response);

        if (response.detail == "User has already booked arrival") {
            console.log("приезд уже зарегистрирован");
            Alert.alert("приезд уже зарегистрирован");
            // navigation.navigate('ArrivalSubmitted');

            navigation.navigate("ToDoListISScreen");
        } else if (response.detail == "") {
            navigation.navigate("ArrivalSubmitted");
        }
    };

    const handleAdd = () => {
        arrivalBookDataArr.length = 2;

        console.log("add");
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
    arrivalBookDataThird.id = id;
    arrivalBookDataThird.arrivalDate = arrivalDate;
    arrivalBookDataThird.flightNumber = flightNumber;
    arrivalBookDataThird.arrivalPoint = arrivalPoint;
    arrivalBookDataThird.comment = comment;
    arrivalBookDataThird.tickets = tickets;
    arrivalBookDataThird.fullName = fullName;
    arrivalBookDataThird.sex = sex;
    arrivalBookDataThird.arrivalTime = arrivalTime;
    arrivalBookDataThird.citizenship = citizenship;
    arrivalBookDataThird.phone = phone;
    arrivalBookDataThird.telegram = telegram;
    arrivalBookDataThird.whatsApp = whatsApp;
    arrivalBookDataThird.vk = vk;
};

const addStudentArr = () => {
    arrivalBookDataArr.length = 2;
    arrivalBookDataArr.push(arrivalBookDataThird);

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

export default AddThirdScreen;
