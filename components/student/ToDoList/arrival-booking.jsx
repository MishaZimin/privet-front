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
    Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { TextInputMask } from "react-native-masked-text";

import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
    arrivalBookDataArr,
    getValueByKey,
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import BackButton from "../../back-button.jsx";
import { countriesPicker } from "../../data-picker/citizenship.jsx";
import { languagePicker } from "../../data-picker/langues.jsx";

const arrivalBookDataFirst = {
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

const ArrivalBookingScreen = ({ navigation }) => {
    // arrivalBookDataArr.length = 0;
    const [fullName, setFullName] = useState(userData.fullName);
    const [sex, setSex] = useState(userData.sex);

    const [arrivalDate, setArrivalDate] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [flightNumber, setFlightNumber] = useState();
    const [citizenship, setCitizenship] = useState(userData.citizenship);
    const [arrivalPoint, setArrivalPoint] = useState();

    const [phone, setPhone] = useState(userData.phone);
    const [telegram, setTelegram] = useState(userData.telegram);
    const [whatsApp, setWhatsApp] = useState(userData.whatsApp);
    const [vk, setVk] = useState(userData.vk);

    const [comment, setComment] = useState();
    const [tickets, setTickets] = useState();

    const handlePress = () => {
        navigation.goBack();
    };

    const handleSave = async () => {
        // addStudent('4563', arrivalDate, flightNumber, arrivalPoint,
        //     comment, tickets, fullName, sex, arrivalTime,
        //     citizenship, phone, telegram, whatsApp, vk)

        // {
        //     "student_data": {
        //       "full_name": "string",
        //       "sex": "string",
        //       "arrival_date": "2023-12-10",
        //       "arrival_time": "12:08:01.102Z",
        //       "flight_number": "string",
        //       "arrival_point": "string",
        //       "citizenship": 0,
        //       "phone": "string",
        //       "telegram": "string",
        //       "whatsapp": "string",
        //       "vk": "string",
        //       "comment": "string",
        //       "tickets": "string"
        //     },
        //     "invite": [
        //       "user@example.com"
        //     ]
        //   }

        const data = {
            student_data: {
                full_name: fullName,
                sex: sex,
                arrival_date: arrivalDate,
                arrival_time: arrivalTime + ":00.000Z",
                flight_number: flightNumber,
                arrival_point: arrivalPoint,
                citizenship: citizenship,
                phone: phone,
                telegram: telegram,
                whatsapp: whatsApp,
                vk: vk,
                comment: comment,
                tickets: tickets,
            },
            invite: [],
        };

        arrivalBookDataArr.length = 0;
        arrivalBookDataArr.push(data);

        console.log("--data--");
        console.log(data);

        const response = await postArrivalBook(
            data,
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
        const data = {
            student_data: {
                full_name: fullName,
                sex: sex,
                arrival_date: arrivalDate,
                arrival_time: arrivalTime + ":01.831Z",
                flight_number: flightNumber,
                arrival_point: arrivalPoint,
                citizenship: citizenship,
                phone: phone,
                telegram: telegram,
                whatsapp: whatsApp,
                vk: vk,
                comment: comment,
                tickets: tickets,
            },
            invite: [],
        };

        arrivalBookDataArr.length = 0;
        arrivalBookDataArr.push(data);

        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr);

        navigation.navigate("AddSecondScreen");
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
                                "Arrival Booking",
                                "Регистрация приезда"
                            )}
                        </Text>
                    </View>
                    <View style={arrivalBooking.profileForm}>
                        <View style={arrivalBooking.textInputs}>
                            <Text
                                style={[
                                    arrivalBooking.inputHeader,
                                    arrivalBooking.student,
                                ]}
                            >
                                {languageTranslate(
                                    userData.language,
                                    "Student #1",
                                    "Студент #1"
                                )}
                            </Text>
                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Full Name",
                                    "Полное имя"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder=""
                                value={fullName}
                                onChangeText={(text) => setFullName(text)}
                            />
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>

                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Sex",
                                    "Пол"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder=""
                                value={"Man"}
                                onChangeText={(text) => setSex(text)}
                            />
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>

                            {/* <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Arrival Date",
                                    "Дата приезда"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder=""
                                value={arrivalDate}
                                onChangeText={(text) => setArrivalDate(text)}
                            /> */}
                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Arrival Date and Time",
                                    "Дата и время приезда"
                                )}
                            </Text>
                            <View style={arrivalBooking.dateAndTime}>
                                <Image
                                    resizeMode="contain"
                                    style={arrivalBooking.imgData}
                                    source={require("../../img/3d-fluency-planner.png")}
                                />
                                <TextInputMask
                                    style={arrivalBooking.textInputData}
                                    type={"datetime"}
                                    options={{
                                        format: "YYYY-MM-DD",
                                    }}
                                    placeholder="YYYY-MM-DD"
                                    value={arrivalDate}
                                    onChangeText={(text) =>
                                        setArrivalDate(text)
                                    }
                                    keyboardType="numeric"
                                />

                                <Image
                                    resizeMode="contain"
                                    style={arrivalBooking.imgData}
                                    source={require("../../img/3d-fluency-alarm-clock-1.png")}
                                />
                                <TextInputMask
                                    style={arrivalBooking.textInputData}
                                    type={"datetime"}
                                    options={{
                                        format: "HH:MM",
                                    }}
                                    placeholder="HH:MM"
                                    value={arrivalTime}
                                    onChangeText={(text) =>
                                        setArrivalTime(text)
                                    }
                                    keyboardType="numeric"
                                />
                            </View>
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>

                            {/* <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Arrival Time",
                                    "Время приезда"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder=""
                                value={arrivalTime}
                                onChangeText={(text) => setArrivalTime(text)}
                            /> */}
                            {/* <View
                                style={arrivalBooking.textInputUnderline}
                            ></View> */}

                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Flight Number",
                                    "Номер рейса"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder=""
                                value={flightNumber}
                                onChangeText={(text) => setFlightNumber(text)}
                            />
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>

                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Arrival Point",
                                    "Пункт прибытия"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder=""
                                value={arrivalPoint}
                                onChangeText={(text) => setArrivalPoint(text)}
                            />
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>

                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Citizenship",
                                    "Гражданство"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder=""
                                value={getValueByKey(
                                    userData.citizenship,
                                    countriesPicker
                                )}
                                onChangeText={(text) => setCitizenship(text)}
                            />
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>

                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Contacts",
                                    "Контакты"
                                )}
                            </Text>
                            <View style={arrivalBooking.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={arrivalBooking.imgContact}
                                    source={require("../../img/3d-fluency-telephone-handset.png")}
                                />
                                <TextInput
                                    style={arrivalBooking.textInputContact}
                                    placeholder="+"
                                    value={phone}
                                    onChangeText={(text) => {
                                        if (text.length <= 12) {
                                            setPhone(text);
                                        }
                                    }}
                                    maxLength={12}
                                />
                            </View>

                            <View style={arrivalBooking.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={arrivalBooking.imgContact}
                                    source={require("../../img/3d-fluency-telegram-logo.png")}
                                />
                                <TextInput
                                    style={arrivalBooking.textInputContact}
                                    placeholder="@"
                                    value={telegram}
                                    onChangeText={(text) => {
                                        if (text.length <= 32) {
                                            setTelegram(text);
                                        }
                                    }}
                                    maxLength={32}
                                />
                            </View>

                            <View style={arrivalBooking.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={arrivalBooking.imgContact}
                                    source={require("../../img/3d-fluency-whatsapp-logo.png")}
                                />
                                <TextInput
                                    style={arrivalBooking.textInputContact}
                                    placeholder="+"
                                    value={whatsApp}
                                    onChangeText={(text) => {
                                        if (text.length <= 12) {
                                            setWhatsApp(text);
                                        }
                                    }}
                                    maxLength={12}
                                />
                            </View>

                            <View style={arrivalBooking.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={arrivalBooking.imgContact}
                                    source={require("../../img/3d-fluency-vk-logo.png")}
                                />
                                <TextInput
                                    style={arrivalBooking.textInputContact}
                                    placeholder="@"
                                    value={vk}
                                    onChangeText={(text) => {
                                        if (text.length <= 32) {
                                            setVk(text);
                                        }
                                    }}
                                    maxLength={32}
                                />
                            </View>
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>
                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Comment",
                                    "Комментарий"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder={""}
                                value={comment}
                                onChangeText={(text) => setComment(text)}
                            />
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>

                            <Text style={arrivalBooking.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Tickets",
                                    "Билеты"
                                )}
                            </Text>
                            <TextInput
                                style={arrivalBooking.textInput}
                                placeholder={""}
                                value={tickets}
                                onChangeText={(text) => setTickets(text)}
                            />
                            <View
                                style={arrivalBooking.textInputUnderline}
                            ></View>
                        </View>
                    </View>

                    <View style={arrivalBooking.buttons}>
                        <TouchableOpacity
                            style={[
                                arrivalBooking.button,
                                { backgroundColor: "black" },
                            ]}
                            onPress={handleAdd}
                        >
                            <Text
                                style={[
                                    arrivalBooking.textButton,
                                    { color: "white" },
                                ]}
                            >
                                {languageTranslate(
                                    userData.language,
                                    "Add a participant",
                                    "Добавить еще участника"
                                )}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                arrivalBooking.button,
                                { backgroundColor: "plum" },
                            ]}
                            onPress={handleSave}
                        >
                            <Text style={arrivalBooking.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Submit Arrival",
                                    "Отправить информацию о приезде"
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    student: {
        color: "grey",
    },

    textBlock: {
        marginTop: "15%",
    },

    textHeader: {
        flex: 1,
        width: "70%",
        paddingLeft: "10%",
        paddingBottom: "5%",
        fontWeight: "800",
        fontSize: 30,
    },
    profileForm: {
        flex: 2,
        width: "90%",
        marginLeft: "5%",
        paddingTop: 0,
        backgroundColor: "white",

        borderRadius: 30,

        shadowColor: "grey",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
    },

    inputHeader: {
        marginTop: "3%",
        textAlign: "left",
        // marginLeft: "5%",
        marginBottom: "1%",
        fontWeight: "700",
    },

    textInputs: {
        flex: 1,
        padding: "5%",
        width: "90%",
        marginLeft: "5%",

        borderRadius: 30,

        // shadowColor: "grey",
        // shadowOffset: { width: 0, height: -20 },
        // shadowOpacity: 0.2,
        // shadowRadius: 10,
    },

    textInput: {
        width: "100%",
        padding: "0%",
        paddingLeft: 0,
        paddingTop: "1%",

        marginTop: "0%",
        // borderWidth: 1,
        // borderRadius: 10,
        // borderColor: "grey",
    },

    textInputPaid: {
        width: "auto",
        padding: "1%",
        // paddingLeft: 0,
        // paddingTop: "1%",

        marginTop: "0%",

        borderRadius: 20,

        backgroundColor: "plum",
    },

    textInputUnderline: {
        marginTop: "3%",
        borderWidth: 0.5,
        width: "100%",
        // textAlign: "center",
        marginLeft: "0%",
        borderColor: "black",
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
        margin: "2%",
        alignItems: "center",
        backgroundColor: "plum",
        color: "grey",
        borderRadius: 20,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textButton: {
        fontWeight: "700",
        textAlign: "center",
    },

    settings: {
        marginTop: "0%",

        marginBottom: "10%",
    },

    contactContainer: {
        display: "flex",
        flexDirection: "row",
    },

    imgContact: {
        width: 20,
        height: 20,

        marginRight: "1%",
        marginTop: "1%",
    },

    dateAndTime: {
        display: "flex",
        flexDirection: "row",
    },
    textInputData: {
        backgroundColor: "rgb(230,230,230)",

        paddingHorizontal: 3,
        paddingVertical: 0,
        marginRight: 15,

        borderRadius: 20,
    },

    imgData: {
        width: 20,
        height: 20,

        marginRight: "1%",
        // marginTop: "1%",
    },
});

export const postArrivalBook = async (data, adress, contentType, token) => {
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

export default ArrivalBookingScreen;
