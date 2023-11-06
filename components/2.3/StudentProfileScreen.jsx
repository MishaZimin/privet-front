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

const StudentProfileScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState(userData.fullName);
    const [citizenship, setCitizenship] = useState(userData.citizenship);
    const [sex, setSex] = useState(userData.sex);
    const [birthDate, setBirthDate] = useState(userData.birdthDate);

    const [phone, setPhone] = useState(userData.phone);
    const [email, setEmail] = useState(userData.email);
    const [telegram, setTelegram] = useState(userData.telegram);
    const [whatsApp, setWhatsApp] = useState(userData.whatsApp);
    const [vk, setVk] = useState(userData.vk);

    const [nativeLanguage, setNativeLanguage] = useState(userData.nativeLanguage);
    const [otherLanguage, setOtherLanguage] = useState(userData.otherLanguage);
    const [university, setUniversity] = useState(userData.university);
    const [escortIsPaid, setEscortIsPaid] = useState(userData.escortIsPaid);
    const [profileType, setProfileType] = useState(userData.user);

    const handleNotifications = () => {
        console.log('хуй знает как это делать');
    };
    const handleSettings = () => {
        navigation.navigate('SettingScreen');
    };
    const handleSave = () => {
        userData.fullName = fullName;
        userData.citizenship = citizenship;
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
        userData.escortIsPaid = escortIsPaid;
        userData.profileType = profileType;
        console.log(userData.profileType);

        console.log(userData);
        console.log(userData.phone);
        console.log(userData.email);
        console.log(userData.telegram);
        console.log(userData.whatsApp);
        console.log(userData.vk);
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <Text style={styles.textHeader}>2.3.1 Student Profile</Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSettings}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                'Settings',
                                'Настройки')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNotifications}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
                                'Notifications',
                                'Уведомдления')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.textInputs}>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={text => setFullName(text)}
                    />

                    <RNPickerSelect
                        placeholder={{
                            label: 'Citizenship',
                            value: 'Citizenship',
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
                        value={citizenship}
                        onValueChange={(value) => setCitizenship(value)}
                        items={[
                            { label: 'Contry1', value: 'Contry1' },
                            { label: 'Contry2', value: 'Contry2' },
                            { label: 'Contry3', value: 'Contry3' },
                        ]}
                    />
                    <RNPickerSelect
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
                    />
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
                    <RNPickerSelect
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
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Escort Is Paid"
                        value={escortIsPaid}
                        onChangeText={text => setEscortIsPaid(text)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={registrationData.user}
                        value={profileType}
                        onChangeText={text => setProfileType(text)}
                    />
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSave}>
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                registrationData.language,
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
