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
} from '../../../Utils.jsx';
import { styles } from '../../../main.jsx';
import BackButton from '../../../back-button.jsx';

const nameArr = ['Name1', 'Name2'];
const arrivalBookDataSecond = {
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

    const handleSave = () => {
        // addStudent('4563', arrivalDate, flightNumber, arrivalPoint, comment, tickets, fullName, sex, arrivalTime, citizenship, phone, telegram, whatsApp, vk);
        const data = {
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
            "comment": comment,
            "tickets": tickets,
        };

        arrivalBookDataArr.length = 1;
        arrivalBookDataArr.push(data);

        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr)

        postArrivalBook(arrivalBookDataArr, '/users/me/book-arrival', "/json", userData.access_token);

        navigation.navigate('ArrivalSubmitted');
    };

    const handleAdd = () => {
        addStudent('4563', arrivalDate, flightNumber, arrivalPoint, comment, tickets, fullName, sex, arrivalTime, citizenship, phone, telegram, whatsApp, vk);
        addStudentArr();

        navigation.navigate('AddThirdScreen');
    };

    const handleDelete = () => {
        navigation.goBack();
    };

    const handleFind = () => {
        console.log('find', isCorrectName, fullName);

        if (nameArr.includes(fullName)) {
            if (true) { // оплата приезда
                console.log('можно редактировать');
                setaccessToInputs('студент есть в системе и услуги оплачены');
                setIsCorrectName(true);
            }
            else {
                setIsCorrectName(false);
                setaccessToInputs('студент есть в системе, но услуги не оплачены');
            }
        }
        else {
            setIsCorrectName(false);
            setaccessToInputs('мы не нашли сдудента');
        }
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
                            editable={!isCorrectName}
                            onChangeText={text => setFullName(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {accessToInputs}</Text><Text></Text>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleFind}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Find Student',
                                    'Найти студента')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textInputs}>

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Sex',
                                'Пол')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={sex}
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            value={citizenship}
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}
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
                            editable={isCorrectName}

                            onChangeText={text => setTickets(text)}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDelete}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Delete this participant',
                                    'Удалить этого участника')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={isCorrectName ? handleAdd : null}>
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    'Add a participant',
                                    'Добавить участника')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={isCorrectName ? handleSave : null}>
                            {/* disabled={isCorrectName} */}
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
    console.log(arrivalBookDataArr)
};

const postArrivalBook = async (data, adress, contentType, token) => {
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

export default AddSecondScreen;
