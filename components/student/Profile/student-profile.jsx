//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
// import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list'
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    sendChangeProfileToServer,
    userData,
    getUserType,
    getValueByKey
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';
import BackButton from '../../back-button.jsx';
import { countriesPicker } from '../../data-picker/citizenship.jsx';
import { languagePicker } from '../../data-picker/langues.jsx';
import { ToastAndroid } from 'react-native';
import { ToastIOS } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInputMask } from 'react-native-masked-text';

const StudentProfileScreen = ({ navigation }) => {
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
    const [profileType, setProfileType] = useState(getUserType(userData.user));

    const [lastBuddy, setLastBuddy] = useState(userData.lastBuddy);
    const [institute, setInstitute] = useState(userData.institute);
    const [studyProgram, setStudyProgram] = useState(userData.studyProgram);
    const [lastArrivalDate, setLastArrivalDate] = useState(userData.lastArrivalDate);
    const [lastVisaExpiration, setLastVisaExpiration] = useState(userData.lastVisaExpiration);
    const [accommodation, setAccommodation] = useState(userData.accommodation);
    const [buddysComment, setBuddysComment] = useState(userData.buddysComment);

    const sexPicker = [
        { key: 'Male', value: 'Man' },
        { key: 'Female', value: 'Woman' },
    ];

    const showToastIOS = () => {
        ToastIOS.show('Ваш текст уведомления', ToastIOS.LONG);
    };

    const showToastAndroid = () => {
        ToastAndroid.showWithGravityAndOffset(
            'text',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };
    const handleSettings = () => {
        navigation.navigate('SettingScreen');
    };

    const handleSave = async () => {

        const data = {
            "full_name": fullName == '' ? null : fullName,
            "citizenship": citizenship == '' ? null : citizenship,
            "city": null,
            "sex": sex == '' ? null : sex,
            "birthdate": birthDate == '' ? null : birthDate,
            "phone": phone == '' ? null : phone,
            "telegram": telegram == '' ? null : telegram,
            "whatsapp": whatsApp == '' ? null : whatsApp,
            "vk": vk == '' ? null : vk,
            "native_language": nativeLanguage,
            "other_languages_ids": [],
            "university": university == '' ? null : university
        };
        console.log('sex:', sex);
        console.log('birthDate:', birthDate);



        console.log("send data:", data);
        const accessToken = await AsyncStorage.getItem('access_token');
        const response = await sendChangeProfileToServer(data, "/users/me/profile/change", "/json", accessToken);
        console.log("response:", response.profile_info.sex);


        Alert.alert('профиль сохранен')
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

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setBirthDate(date);
        // console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
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

                        <SelectList
                            style={styles.textInput}
                            data={countriesPicker}
                            save="key"
                            placeholder={getValueByKey(userData.citizenship, countriesPicker)}
                            // defaultOption={{ key: '2', value: 'Spanish' }}
                            setSelected={(val) => setCitizenship(val)}
                        />

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Sex',
                                'Пол')}</Text>
                        <SelectList
                            style={styles.picker}
                            search={false}
                            // value={sex}
                            data={sexPicker}
                            save="key"

                            placeholder={sex}
                            setSelected={(val) => setSex(val)}
                        />


                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Birth Date',
                                'Дата Рождения')}</Text>
                        {/* <View style={styles.inputHeader}>
                            <Button title="Выбрать дату" onPress={showDatePicker} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                placeholder={birthDate}
                            />
                        </View> */}

                        <TextInputMask
                            style={styles.textInput}
                            type={'datetime'}
                            options={{
                                format: 'YYYY-MM-DD',
                            }}
                            placeholder="Введите дату (YYYY-MM-DD)"
                            value={birthDate}
                            onChangeText={text => setBirthDate(text)}
                            keyboardType="numeric"
                        />
                        {/* <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={birthDate}
                            onChangeText={text => setBirthDate(text)}
                        /> */}
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Phone',
                                'Телефон')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="+"
                            value={phone}
                            onChangeText={text => {
                                if (text.length <= 12) {
                                    setPhone(text);
                                }
                            }}
                            maxLength={12}
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
                            onChangeText={text => {
                                if (text.length <= 32) {
                                    setTelegram(text);
                                }
                            }}
                            maxLength={32}
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

                            onChangeText={text => {
                                if (text.length <= 12) {
                                    setWhatsApp(text);
                                }
                            }}
                            maxLength={12}
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
                            onChangeText={text => {
                                if (text.length <= 32) {
                                    setVk(text);
                                }
                            }}
                            maxLength={32}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Native Language',
                                'Родной язык ИС')}</Text>


                        <SelectList
                            style={styles.textInput}
                            data={languagePicker}
                            save="key"
                            placeholder={getValueByKey(userData.nativeLanguage, languagePicker)}
                            // defaultOption={{ key: '2', value: 'Spanish' }}
                            setSelected={(val) => setNativeLanguage(val)}
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
                            editable={false}
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
                            placeholder={getUserType(userData.user)}
                            value={profileType}
                            editable={false}

                            onChangeText={text => setProfileType(text)}
                        />

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Last Buddy',
                                'Последний сопровождающий')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={lastBuddy}
                            editable={false}

                            onChangeText={text => setLastBuddy(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Institute',
                                'Институт Студента')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={institute}
                            editable={false}

                            onChangeText={text => setInstitute(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Study Program',
                                'Направление обучения')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={studyProgram}
                            editable={false}

                            onChangeText={text => setStudyProgram(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Last Arrival Date',
                                'Дата последнего приезда')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={lastArrivalDate}
                            editable={false}

                            onChangeText={text => setLastArrivalDate(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Last Visa Expiration',
                                'Дата окончания последней визы')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={lastVisaExpiration}
                            editable={false}

                            onChangeText={text => setLastVisaExpiration(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Accommodation',
                                'Место проживания')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={accommodation}
                            editable={false}

                            onChangeText={text => setAccommodation(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                'Buddys Comment',
                                'Комментарий от сопровождающего')}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={buddysComment}
                            editable={false}

                            onChangeText={text => setBuddysComment(text)}
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
            </ScrollView></SafeAreaView>
    );
};



export default StudentProfileScreen;
