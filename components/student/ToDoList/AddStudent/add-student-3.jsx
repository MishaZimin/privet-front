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
const arrivalBookDataThird = {
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

    // console.log('---', isCorrectName);
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

    const handleSave = () => {
        arrivalBookDataArr.length = 2;

        arrivalBookDataThird.id = '4563';
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

        arrivalBookDataArr.push(arrivalBookDataThird);
        // arrAllStudentsInArrival.splice(1, 0, arr2);

        console.log("--arrivalBookDataArr--");
        console.log(arrivalBookDataArr);

        console.log('Arrival names:', arrivalBookDataArr[0].fullName, arrivalBookDataArr[1].fullName, arrivalBookDataArr[2].fullName);


        navigation.navigate('ArrivalSubmitted');

    };

    const handleAdd = () => {
        arrivalBookDataArr.length = 2;

        console.log('add');
    };
    const handleDelete = () => {
        navigation.goBack();
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

export default AddThirdScreen;
