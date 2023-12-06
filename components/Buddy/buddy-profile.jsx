//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    sendChangeProfileToServer,
    getUserType
} from '../Utils.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../back-button.jsx';
import { styles } from '../main.jsx';
import { ToastAndroid } from 'react-native';
import { ToastIOS } from 'react-native';

const BuddyProfileScreen = ({ navigation }) => {
    const [city, setCity] = useState(userData.city);
    const [fullName, setFullName] = useState(userData.fullName);
    // const [sex, setSex] = useState(userData.sex);
    const [birthDate, setBirthDate] = useState(userData.birthDate);

    const [phone, setPhone] = useState(userData.phone);
    const [email, setEmail] = useState(userData.email);
    const [telegram, setTelegram] = useState(userData.telegram);
    const [whatsApp, setWhatsApp] = useState(userData.whatsApp);
    const [vk, setVk] = useState(userData.vk);

    const [nativeLanguage, setNativeLanguage] = useState(userData.nativeLanguage);
    const [otherLanguage, setOtherLanguage] = useState(userData.otherLanguage);
    const [university, setUniversity] = useState(userData.university);
    const [profileType, setProfileType] = useState(getUserType(userData.user));
    const [buddyStatus, setBuddyStatus] = userData.buddyStatus ? useState("Yes") : useState("No");

    const showToastIOS = () => {
        ToastIOS.show('Ваш текст уведомления', ToastIOS.LONG);
    };

    const showToastAndroid = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Ваш текст уведомления',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };


    const handleNotifications = () => {


        if (Platform.OS === 'android') {
            console.log('уведомления android');
            showToastAndroid;
        }
        else {
            showToastIOS();

        }
    };
    const handleSettings = () => {
        navigation.navigate('SettingScreen');
    };
    const handleSave = async () => {
        const data = {
            "full_name": fullName,
            "citizenship": null,
            "city": city == '' ? null : city,
            "sex": null,
            "birthdate": birthDate == '' ? null : birthDate,
            "phone": phone == '' ? null : phone,
            "telegram": telegram == '' ? null : telegram,
            "whatsapp": whatsApp == '' ? null : whatsApp,
            "vk": vk == '' ? null : vk,
            "native_language": null,
            "other_languages_ids": [],
            "university": university == '' ? null : university
        };
        console.log("send data:", data);
        const accessToken = await AsyncStorage.getItem('access_token');
        await sendChangeProfileToServer(data, "/users/me/profile/change", "/json", accessToken);

        // запрос с userData на бэк
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>

                <View style={styles.form}>
                    <BackButton />
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Buddy Profile',
                            'Профиль Сопровождающего')}</Text>

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
                                    'Уведомдления')}
                            </Text>
                        </TouchableOpacity>
                    </View>

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
                                'Родной язык')}</Text>
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
        </SafeAreaView>
    );
};

export default BuddyProfileScreen;
