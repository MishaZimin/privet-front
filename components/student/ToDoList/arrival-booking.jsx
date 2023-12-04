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
    arrivalBookDataArr.length = 0;
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

    const handleSave = () => {
        arrivalBookDataArr.length = 0;
        console.log(arrivalBookDataArr)
        arrivalBookDataFirst.id = '4563';
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

        arrivalBookDataArr.push(arrivalBookDataFirst);

        console.log("--arrivalBookData--");
        console.log(arrivalBookDataArr);

        console.log('Arrival names:', arrivalBookDataArr[0].fullName);


        navigation.navigate('ArrivalSubmitted');
    };

    const handleAdd = () => {
        console.log('add');
        arrivalBookDataArr.length = 0;

        arrivalBookDataFirst.id = '4563';
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

        arrivalBookDataArr.push(arrivalBookDataFirst);

        console.log("--arrivalBookData--");

        for (var key in arrivalBookData) {
            console.log(key + ': ' + arrivalBookData[key]);
        }

        console.log('arrival bookeng end', arrivalBookDataArr);

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

export default ArrivalBookingScreen;
