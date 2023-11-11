//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
        arrivalBookData.id = 'id1234';
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
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>Arrival Booking</Text>
                </View>

                <View style={styles.textInputs}>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={text => setFullName(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Sex"
                        value={sex}
                        onChangeText={text => setSex(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Arrival Date"
                        value={arrivalDate}
                        onChangeText={text => setArrivalDate(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Arrival Time"
                        value={arrivalTime}
                        onChangeText={text => setArrivalTime(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Flight Number"
                        value={flightNumber}
                        onChangeText={text => setFlightNumber(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Arrival Point"
                        value={arrivalPoint}
                        onChangeText={text => setArrivalPoint(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Citizenship"
                        value={citizenship}
                        onChangeText={text => setCitizenship(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Telegram"
                        value={telegram}
                        onChangeText={text => setTelegram(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="WhatsApp"
                        value={whatsApp}
                        onChangeText={text => setWhatsApp(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="VK"
                        value={vk}
                        onChangeText={text => setVk(text)}
                    />


                    <TextInput
                        style={styles.textInput}
                        placeholder={'Comment'}
                        value={comment}

                        onChangeText={text => setComment(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder={'Tickets'}
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
    );
};

export default ArrivalBookingScreen;
