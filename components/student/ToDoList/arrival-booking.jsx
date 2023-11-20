//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';

const ArrivalBookingScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState(userData.fullName);
    const [sex, setSex] = useState(userData.sex);


    const [arrivalDate, setArrivalDate] = useState(arrivalBookData.arrivalDate);
    const [arrivalTime, setArrivalTime] = useState(userData.lastArrivalDate);
    const [flightNumber, setFlightNumber] = useState(arrivalBookData.flightNumber);
    const [citizenship, setCitizenship] = useState(userData.citizenship);
    const [arrivalPoint, setArrivalPoint] = useState(arrivalBookData.arrivalPoint);

    const [phone, setPhone] = useState(userData.phone);
    const [telegram, setTelegram] = useState(userData.telegram);
    const [whatsApp, setWhatsApp] = useState(userData.whatsApp);
    const [vk, setVk] = useState(userData.vk);

    const [comment, setComment] = useState(arrivalBookData.comment);
    const [tickets, setTickets] = useState(arrivalBookData.tickets);



    const handleSave = () => {
        arrivalBookData.id = '4563';
        arrivalBookData.arrivalDate = arrivalDate;
        arrivalBookData.flightNumber = flightNumber;
        arrivalBookData.arrivalPoint = arrivalPoint;
        arrivalBookData.comment = comment;
        arrivalBookData.tickets = tickets;
        arrivalBookData.fullName = fullName;
        arrivalBookData.sex = sex;
        arrivalBookData.arrivalTime = arrivalTime;
        arrivalBookData.citizenship = citizenship;
        arrivalBookData.phone = phone;
        arrivalBookData.telegram = telegram;
        arrivalBookData.whatsApp = whatsApp;
        arrivalBookData.vk = vk;

        console.log("--arrivalBookData--");

        for (var key in arrivalBookData) {
            console.log(key + ': ' + arrivalBookData[key]);
        }

        navigation.navigate('ArrivalSubmitted');

    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
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
                            value={sex}
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
                            value={citizenship}
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

export default ArrivalBookingScreen;
