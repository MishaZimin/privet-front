//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
    arrivalBookDataArr,
    getValueByKey,
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';
import BackButton from '../../back-button.jsx';
import { countriesPicker } from '../../data-picker/citizenship.jsx';
import { languagePicker } from '../../data-picker/langues.jsx';


const arrivalBookDataFirst = {
    id: '',
    arrivalDate: '',
    flightNumber: '',
    arrivalPoint: '',
    comment: '',
    tickets: '',
    fullName: '',
    sex: null,
    arrivalTime: '',
    citizenship: '',
    phone: '',
    telegram: '',
    whatsApp: '',
    vk: '',
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
            "student_data": {
                "email": userData.email,
                "full_name": fullName,
                "sex": "string",
                "arrival_date": "2023-12-06",
                "arrival_time": "11:48:07.831Z",
                "flight_number": flightNumber,
                "arrival_point": arrivalPoint,
                "citizenship": citizenship,
                "phone": phone,
                "telegram": telegram,
                "whatsapp": whatsApp,
                "vk": vk,
                "comment": "string",
                "tickets": "string",
            },
            "invite": [],

        };

        arrivalBookDataArr.length = 0;
        arrivalBookDataArr.push(data);

        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr)



        const response = await postArrivalBook(arrivalBookDataArr[0], '/users/me/book-arrival', "/json", userData.access_token);
        console.log(response);

        if (response.detail == "User has already booked arrival") {
            console.log("приезд уже зарегистрирован");
            Alert.alert("приезд уже зарегистрирован");
            // navigation.navigate('ArrivalSubmitted');

            navigation.navigate('ToDoListISScreen');

        }
        else if (response.detail == "") {
            navigation.navigate('ArrivalSubmitted');
        }
    };

    const handleAdd = () => {

        const data = {
            "student_data": {
                "full_name": fullName,
                "sex": "string",
                "arrival_date": "2023-12-06",
                "arrival_time": "11:48:07.831Z",
                "flight_number": flightNumber,
                "arrival_point": arrivalPoint,
                "citizenship": citizenship,
                "phone": phone,
                "telegram": telegram,
                "whatsapp": whatsApp,
                "vk": vk,
                "comment": "string",
                "tickets": "string",
            },
            "invite": [],
        };

        arrivalBookDataArr.length = 0;
        arrivalBookDataArr.push(data);

        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr)

        navigation.navigate('AddSecondScreen');
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>

                    <BackButton />

                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
                                'Arrival Booking',
                                'Регистрация приезда')}</Text>
                    </View>

                    <View style={styles.textInputs}>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Full Name',
                                'Полное имя')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={fullName}
                            onChangeText={text => setFullName(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Sex',
                                'Пол')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={"Man"}
                            onChangeText={text => setSex(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Arrival Date',
                                'Дата приезда')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={arrivalDate}
                            onChangeText={text => setArrivalDate(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Arrival Time',
                                'Время приезда')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={arrivalTime}
                            onChangeText={text => setArrivalTime(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Flight Number',
                                'Номер рейса')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={flightNumber}
                            onChangeText={text => setFlightNumber(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Arrival Point',
                                'Пункт прибытия')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={arrivalPoint}
                            onChangeText={text => setArrivalPoint(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Citizenship',
                                'Гражданство')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={getValueByKey(userData.citizenship, countriesPicker)}
                            onChangeText={text => setCitizenship(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Phone',
                                'Телефон')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="+"
                            value={phone}
                            onChangeText={text => setPhone(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Telegram',
                                'Telegram')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="@"
                            value={telegram}
                            onChangeText={text => setTelegram(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'WhatsApp',
                                'WhatsApp')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="+"
                            value={whatsApp}
                            onChangeText={text => setWhatsApp(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'VK',
                                'VK')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="@"
                            value={vk}
                            onChangeText={text => setVk(text)}
                        />

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Comment',
                                'Комментарий')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={''}
                            value={comment}

                            onChangeText={text => setComment(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Tickets',
                                'Билеты')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={''}
                            value={tickets}

                            onChangeText={text => setTickets(text)}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleAdd}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Add a participant',
                                    'Добавить участника')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Submit Arrival',
                                    'Отправить информацию о приезде')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const addStudent = (id, arrivalDate, flightNumber, arrivalPoint, comment, tickets, fullName, sex, arrivalTime, citizenship, phone, telegram, whatsApp, vk) => {
    arrivalBookDataFirst.id = id;
    arrivalBookDataFirst.arrivalDate = arrivalDate;
    arrivalBookDataFirst.flightNumber = flightNumber;
    arrivalBookDataFirst.arrivalPoint = arrivalPoint;
    arrivalBookDataFirst.comment = comment;
    arrivalBookDataFirst.tickets = tickets;
    arrivalBookDataFirst.fullName = fullName;
    arrivalBookDataFirst.sex = sex;
    arrivalBookDataFirst.arrivalTime = arrivalTime;
    arrivalBookDataFirst.citizenship = citizenship;
    arrivalBookDataFirst.phone = phone;
    arrivalBookDataFirst.telegram = telegram;
    arrivalBookDataFirst.whatsApp = whatsApp;
    arrivalBookDataFirst.vk = vk;
}



const addStudentArr = () => {
    arrivalBookDataArr.length = 0;
    arrivalBookDataArr.push(arrivalBookDataFirst);

    console.log("--arrivalBookDataArr--");
    console.log(arrivalBookDataArr)
}

export const postArrivalBook = async (data, adress, contentType, token) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "POST",
            headers: {
                "Accept": "application" + contentType,
                "Content-Type": "application" + contentType,
                "Authorization": "Bearer " + token,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
}

export default ArrivalBookingScreen;
