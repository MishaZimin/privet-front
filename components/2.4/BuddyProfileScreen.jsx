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

const BuddyProfileScreen = ({ navigation }) => {
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
        userData.birthDate = birthDate;
        userData.city = city;
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
                <Text style={styles.textHeader}>2.4.1 Buddy Profile</Text>

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

                    {/* <RNPickerSelect
                        placeholder={{
                            label: 'University',
                            value: 'University',
                        }}
                        style={{
                            inputIOS: {
                                width: '100%',
                                padding: '5%',
                                marginTop: '10%',

                                borderWidth: 1,
                                borderRadius: 40,
                                borderColor: 'grey',
                            },
                            inputAndroid: {
                                width: '100%',
                                padding: '5%',
                                marginTop: '10%',

                                borderWidth: 1,
                                borderRadius: 40,
                                borderColor: 'grey',
                            },
                        }}
                        value={university}

                        onValueChange={(value) => setUniversity(value)}
                        items={[
                            { label: 'Urfu1', value: 'Urfu1' },
                            { label: 'Urfu2', value: 'Urfu2' },
                            { label: 'Urfu3', value: 'Urfu3' },
                        ]}
                    /> */}
                    <TextInput
                        style={styles.textInput}
                        placeholder="University"
                        value={university}
                        onChangeText={text => setUniversity(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="City"
                        value={city}
                        onChangeText={text => setCity(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={text => setFullName(text)}
                    />


                    {/* <RNPickerSelect
                        placeholder={{
                            label: 'Sex',
                            value: 'Sex',
                        }}
                        style={{
                            inputIOS: {
                                width: '100%',
                                padding: '5%',
                                marginTop: '10%',

                                borderWidth: 1,
                                borderRadius: 40,
                                borderColor: 'grey',
                            },
                            inputAndroid: {
                                width: '100%',
                                padding: '5%',
                                marginTop: '10%',

                                borderWidth: 1,
                                borderRadius: 40,
                                borderColor: 'grey',
                            },
                        }}
                        value={sex}
                        onValueChange={(value) => setSex(value)}
                        items={[
                            { label: 'Man', value: 'Man' },
                            { label: 'Woman', value: 'Woman' },
                        ]}
                    /> */}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Birth Date"
                        value={birthDate}
                        onChangeText={text => setBirthDate(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={email}
                        editable={false}

                        onChangeText={text => setEmail(text)}
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
                        placeholder="Native Language"
                        value={nativeLanguage}
                        onChangeText={text => setNativeLanguage(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Other Language and Levels"
                        value={otherLanguage}
                        onChangeText={text => setOtherLanguage(text)}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder={String(userData.user)}
                        value={profileType}
                        editable={false}

                        onChangeText={text => setProfileType(text)}
                    />

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
    );
};

export default BuddyProfileScreen;
