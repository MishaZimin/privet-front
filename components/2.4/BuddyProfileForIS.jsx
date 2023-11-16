//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from '../Utils.jsx';

import { styles } from '../main.jsx';

const BuddyProfileForIS = ({ navigation }) => {
    const [city, setCity] = useState(userData.city);
    const [fullName, setFullName] = useState(userData.fullName);
    const [sex, setSex] = useState(userData.sex);
    const [birthDate, setBirthDate] = useState(userData.birthDate);

    const [phone, setPhone] = useState(userData.phone);
    const [email, setEmail] = useState(userData.email);
    const [telegram, setTelegram] = useState(userData.telegram);
    const [whatsApp, setWhatsApp] = useState(userData.whatsApp);
    const [vk, setVk] = useState(userData.vk);

    const [nativeLanguage, setNativeLanguage] = useState(userData.nativeLanguage);
    const [otherLanguage, setOtherLanguage] = useState(userData.otherLanguage);
    const [university, setUniversity] = useState(userData.university);
    const [profileType, setProfileType] = (userData.user == 1) ? useState("Sudent") : useState("Buddy");
    const [buddyStatus, setBuddyStatus] = useState(userData.buddyStatus);

    const handleNotifications = () => {
        console.log('уведомления');
    };
    const handleSettings = () => {
        navigation.navigate('SettingScreen');
    };
    const handleSave = () => {
        userData.fullName = fullName;
        userData.sex = sex;
        userData.birdthDate = birthDate;

        userData.phone = phone;
        userData.email = email;
        userData.telegram = telegram;
        userData.whatsApp = whatsApp;
        userData.vk = vk;

        userData.nativeLanguage = nativeLanguage;
        userData.otherLanguage = otherLanguage;
        userData.university = university;

        console.log("--userData--");

        for (var key in userData) {
            console.log(key + ': ' + userData[key]);
        }

        // запрос с userData на бэк

    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>Buddy Profile For Student</Text>



                <View style={styles.textInputs}>

                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'University',
                            'Университет')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={university}
                        editable={false}

                        onChangeText={text => setUniversity(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'City',
                            'Город')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={city}
                        editable={false}

                        onChangeText={text => setCity(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Full Name',
                            'Полное Имя')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={fullName}
                        editable={false}

                        onChangeText={text => setFullName(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Birth Date',
                            'Дата Рождения')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={birthDate}
                        editable={false}

                        onChangeText={text => setBirthDate(text)}
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
                        editable={false}

                        onChangeText={text => setPhone(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Email',
                            'Email')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={email}
                        editable={false}

                        onChangeText={text => setEmail(text)}
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
                        editable={false}

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
                        editable={false}

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
                        editable={false}

                        onChangeText={text => setVk(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Native Language',
                            'Родной язык')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={nativeLanguage}
                        editable={false}

                        onChangeText={text => setNativeLanguage(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Other Language and Levels',
                            'Другие языки и уровень владения ими')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={otherLanguage}
                        editable={false}

                        onChangeText={text => setOtherLanguage(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Profile type',
                            'Тип профиля')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={String(userData.user)}
                        value={profileType}
                        editable={false}

                        onChangeText={text => setProfileType(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Buddy Status',
                            'Статус Сопровождающего')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Buddy Status"}
                        value={buddyStatus}
                        editable={false}

                        onChangeText={text => setBuddyStatus(text)}
                    />
                </View>

                {/* <TextInput
                        style={styles.textInput}
                        placeholder={"Buddy Status"}
                        value={buddyStatus}
                        editable={false}

                        onChangeText={text => setBuddyStatus(text)}
                    />
                </View> */}


            </View>
        </ScrollView>
    );
};

export default BuddyProfileForIS;
