//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';

const StudentProfileScreen = ({ navigation }) => {
    // userData.escortIsPaid = false;
    const [fullName, setFullName] = useState(userData.fullName);
    const [citizenship, setCitizenship] = useState(userData.citizenship);
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
    const [escortIsPaid, setEscortIsPaid] = (userData.escortIsPaid) ? useState("Yes") : useState("No");
    const [profileType, setProfileType] = (userData.user == 1) ? useState("Student") : useState("Buddy");

    const handleNotifications = () => {
        console.log('уведомления');
    };
    const handleSettings = () => {
        navigation.navigate('SettingScreen');
    };
    const handleSave = () => {
        userData.fullName = fullName;
        userData.citizenship = citizenship;
        userData.sex = sex;
        userData.birthDate = birthDate;

        userData.phone = phone;
        userData.email = email;
        userData.telegram = telegram;
        userData.whatsApp = whatsApp;
        userData.vk = vk;

        userData.nativeLanguage = nativeLanguage;
        userData.otherLanguage = otherLanguage;
        userData.university = university;
        // userData.escortIsPaid = escortIsPaid;

        console.log("--userData--");

        for (var key in userData) {
            console.log(key + ': ' + userData[key]);
        }

        // запрос с userData на бэк
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>
                    {languageTranslate(
                        userData.language,
                        'Student Profile',
                        'Профиль Студента')}

                </Text>

                <View style={styles.buttons}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSettings}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Settings',
                                'Настройки')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNotifications}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Notifications',
                                'Уведомления')}
                        </Text>
                    </TouchableOpacity>
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
                            'Birth Date',
                            'Дата Рождения')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={birthDate}
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
                        onChangeText={text => setPhone(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Email',
                            'Email')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
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
                            'Native Language',
                            'Родной язык ИС')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={nativeLanguage}
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
                        onChangeText={text => setOtherLanguage(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'University',
                            'Университет')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={university}
                        onChangeText={text => setUniversity(text)}
                    />

                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Escort Is Paid',
                            'Статус оплаты сопровождения')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder=""
                        value={escortIsPaid}
                        editable={false}

                        onChangeText={text => setEscortIsPaid(text)}
                    />
                    <Text style={styles.inputHeader}>
                        {languageTranslate(
                            userData.language,
                            'Profile Type',
                            'Тип Профиля')}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={String(userData.user)}
                        value={profileType}
                        editable={false}

                        onChangeText={text => setProfileType(text)}
                    />
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSave}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Save',
                                'Сохранить')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default StudentProfileScreen;
