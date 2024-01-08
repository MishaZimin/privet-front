//2.2.3. Регистрация Сопровождающего

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputMask } from "react-native-masked-text";

import RNPickerSelect from "react-native-picker-select";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    sendChangeProfileToServer,
    getUserType,
    getValueByKey,
} from "../Utils.jsx";
import { universityPicker } from "../data-picker/university.jsx";
import { countriesPicker } from "../data-picker/citizenship.jsx";
import { languagePicker } from "../data-picker/langues.jsx";

import { SelectList } from "react-native-dropdown-select-list";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../back-button.jsx";
import { styles } from "../main.jsx";
import { ToastAndroid } from "react-native";
import { ToastIOS } from "react-native";
import BuddysScreen from "./buddy.jsx";

const BuddyProfileScreen = ({ navigation, route }) => {
    const userProfile = route.params.userProfile;
    // console.log(userProfile);
    const [city, setCity] = useState(userProfile.city);
    const [fullName, setFullName] = useState(userProfile.fullName);
    // const [sex, setSex] = useState(userProfile.sex);
    const [birthDate, setBirthDate] = useState(userProfile.birthDate);

    const [phone, setPhone] = useState(userProfile.phone);
    const [email, setEmail] = useState(userProfile.email);
    const [telegram, setTelegram] = useState(userProfile.telegram);
    const [whatsApp, setWhatsApp] = useState(userProfile.whatsApp);
    const [vk, setVk] = useState(userProfile.vk);

    const [nativeLanguage, setNativeLanguage] = useState(
        userProfile.nativeLanguage
    );
    const [otherLanguage, setOtherLanguage] = useState(
        userProfile.otherLanguage
    );
    const [university, setUniversity] = useState(userProfile.university);
    const [profileType, setProfileType] = useState(getUserType(userData.user));
    const [buddyStatus, setBuddyStatus] = userProfile.buddyStatus
        ? useState("Yes")
        : useState("No");

    const showToastIOS = () => {
        ToastIOS.show("Ваш текст уведомления", ToastIOS.LONG);
    };

    const showToastAndroid = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Ваш текст уведомления",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const handleNotifications = () => {
        if (Platform.OS === "android") {
            console.log("уведомления android");
            showToastAndroid;
        } else {
            showToastIOS();
        }
    };
    const handleSettings = () => {
        navigation.navigate("SettingScreen");
    };
    const handleSave = async () => {
        const data = {
            full_name: fullName,
            citizenship: null,
            city: city == "" ? null : city.toString(),
            sex: null,
            birthdate: birthDate == "" ? null : birthDate,
            phone: phone == "" ? null : phone,
            telegram: telegram == "" ? null : telegram,
            whatsapp: whatsApp == "" ? null : whatsApp,
            vk: vk == "" ? null : vk,
            native_language:
                nativeLanguage == "" ? null : nativeLanguage.toString(),
            other_languages_ids: [],
            university: university == "" ? null : university,
        };
        console.log("send data:", data);
        try {
            const accessToken = await AsyncStorage.getItem("access_token");

            await sendChangeProfileToServer(
                data,
                "/users/me/profile/change",
                "/json",
                accessToken
            );
            Alert.alert("профиль сохранен");
        } catch (err) {
            console.log(err);
        }
        // запрос с userData на бэк
    };

    return (
        <SafeAreaView style={profile.main}>
            <ScrollView style={profile.main}>
                <View style={profile.form}>
                    {/* <BackButton /> */}
                    <Text style={profile.textHeader}>
                        {languageTranslate(
                            userData.language,
                            "Profile",
                            "Профиль"
                        )}
                    </Text>

                    <View style={[profile.buttons, profile.settings]}>
                        {/* <TouchableOpacity
                            style={profile.button}
                            onPress={handleSettings}
                        >
                            <Text style={profile.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Settings",
                                    "Настройки"
                                )}
                            </Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            style={profile.button}
                            onPress={handleNotifications}
                        >
                            <Text style={profile.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Notifications",
                                    "Уведомдления"
                                )}
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={profile.profileForm}>
                        <View style={profile.textInputs}>
                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Full Name",
                                    "Полное Имя"
                                )}
                            </Text>
                            <TextInput
                                style={profile.textInput}
                                placeholder=""
                                value={fullName}
                                onChangeText={(text) => setFullName(text)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "University",
                                    "Университет"
                                )}
                            </Text>
                            <SelectList
                                style={profile.textInput}
                                boxStyles={{
                                    borderWidth: 0,
                                    margin: -5,
                                    marginBottom: -15,
                                    marginLeft: -20,
                                    marginTop: -10,
                                }}
                                dropdownStyles={{
                                    borderWidth: 0,
                                    marginBottom: 0,
                                    marginTop: 20,
                                    padding: 0,
                                }}
                                dropdownItemStyles={{
                                    borderWidth: 0,
                                    margin: -5,
                                    marginBottom: 0,
                                    marginLeft: -20,
                                    marginTop: -10,
                                }}
                                data={universityPicker}
                                save="key"
                                placeholder={getValueByKey(
                                    userProfile.university,
                                    universityPicker
                                )}
                                setSelected={(val) => setUniversity(val)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "City",
                                    "Город"
                                )}
                            </Text>
                            <SelectList
                                style={profile.textInput}
                                boxStyles={{
                                    borderWidth: 0,
                                    margin: -5,
                                    marginBottom: -15,
                                    marginLeft: -20,
                                    marginTop: -10,
                                }}
                                dropdownStyles={{
                                    borderWidth: 0,
                                    marginBottom: 0,
                                    marginTop: 20,
                                    padding: 0,
                                }}
                                dropdownItemStyles={{
                                    borderWidth: 0,
                                    margin: -5,
                                    marginBottom: 0,
                                    marginLeft: -20,
                                    marginTop: -10,
                                }}
                                data={countriesPicker}
                                save="key"
                                placeholder={getValueByKey(
                                    userProfile.citizenship,
                                    countriesPicker
                                )}
                                setSelected={(val) => setCity(val)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Birth Date",
                                    "Дата Рождения"
                                )}
                            </Text>
                            <View style={profile.dateAndTime}>
                                <TextInputMask
                                    style={profile.textInput}
                                    type={"datetime"}
                                    options={{
                                        format: "YYYY.MM.DD",
                                    }}
                                    placeholder="YYYY-MM-DD"
                                    value={birthDate}
                                    onChangeText={(text) => setBirthDate(text)}
                                    keyboardType="numeric"
                                />
                                {/* <TextInputMask
                                    style={profile.textInput}
                                    type={"datetime"}
                                    options={{
                                        format: "HH:MM",
                                    }}
                                    placeholder="HH:MM"
                                    value={birthDate}
                                    onChangeText={(text) => setBirthDate(text)}
                                    keyboardType="numeric"
                                /> */}
                            </View>
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Contacts",
                                    "Контакты"
                                )}
                            </Text>
                            <TextInput
                                style={profile.textInput}
                                placeholder="+"
                                value={phone}
                                onChangeText={(text) => {
                                    if (text.length <= 12) {
                                        setPhone(text);
                                    }
                                }}
                                maxLength={12}
                            />
                            {/* <View style={profile.textInputUnderline}></View> */}

                            {/* <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Email",
                                    "Email"
                                )}
                            </Text> */}
                            <TextInput
                                style={profile.textInput}
                                placeholder="Email"
                                value={email}
                                editable={false}
                                onChangeText={(text) => setEmail(text)}
                            />
                            {/* <View style={profile.textInputUnderline}></View> */}

                            {/* <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Telegram",
                                    "Telegram"
                                )}
                            </Text> */}
                            <TextInput
                                style={profile.textInput}
                                placeholder="@"
                                value={telegram}
                                onChangeText={(text) => {
                                    if (text.length <= 32) {
                                        setTelegram(text);
                                    }
                                }}
                                maxLength={32}
                            />
                            {/* <View style={profile.textInputUnderline}></View> */}

                            {/* <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "WhatsApp",
                                    "WhatsApp"
                                )}
                            </Text> */}
                            <TextInput
                                style={profile.textInput}
                                placeholder="+"
                                value={whatsApp}
                                onChangeText={(text) => {
                                    if (text.length <= 12) {
                                        setWhatsApp(text);
                                    }
                                }}
                                maxLength={12}
                            />
                            {/* <View style={profile.textInputUnderline}></View> */}

                            {/* <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "VK",
                                    "VK"
                                )}
                            </Text> */}
                            <TextInput
                                style={profile.textInput}
                                placeholder="@"
                                value={vk}
                                onChangeText={(text) => {
                                    if (text.length <= 32) {
                                        setVk(text);
                                    }
                                }}
                                maxLength={32}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Native Language",
                                    "Родной язык"
                                )}
                            </Text>
                            <SelectList
                                style={profile.textInput}
                                boxStyles={{
                                    borderWidth: 0,
                                    margin: -5,
                                    marginBottom: -15,
                                    marginLeft: -20,
                                    marginTop: -10,
                                }}
                                dropdownStyles={{
                                    borderWidth: 0,
                                    marginBottom: 0,
                                    marginTop: 20,
                                    padding: 0,
                                }}
                                dropdownItemStyles={{
                                    borderWidth: 0,
                                    margin: -5,
                                    marginBottom: 0,
                                    marginLeft: -20,
                                    marginTop: -10,
                                }}
                                data={languagePicker}
                                save="key"
                                placeholder={getValueByKey(
                                    userData.nativeLanguage,
                                    languagePicker
                                )}
                                // defaultOption={{ key: '2', value: 'Spanish' }}
                                setSelected={(val) => setNativeLanguage(val)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Other Language and Levels",
                                    "Другие языки и уровень владения ими"
                                )}
                            </Text>
                            <TextInput
                                style={profile.textInput}
                                placeholder=""
                                value={"otherLanguage"}
                                onChangeText={(text) => setOtherLanguage(text)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Profile type",
                                    "Тип профиля"
                                )}
                            </Text>
                            <TextInput
                                style={profile.textInput}
                                placeholder={String(userData.user)}
                                value={profileType}
                                editable={false}
                                onChangeText={(text) => setProfileType(text)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Buddy Status",
                                    "Статус Сопровождающего"
                                )}
                            </Text>
                            <TextInput
                                style={profile.textInput}
                                placeholder={"Buddy Status"}
                                value={buddyStatus}
                                editable={false}
                                onChangeText={(text) => setBuddyStatus(text)}
                            />
                            <View style={profile.textInputUnderline}></View>
                        </View>

                        <View style={profile.buttons}>
                            <TouchableOpacity
                                style={profile.button}
                                onPress={handleSave}
                            >
                                <Text style={profile.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        "Save",
                                        "Сохранить"
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BuddysScreen navigation={navigation} />
        </SafeAreaView>
    );
};

export const profile = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
    },
    form: {
        flex: 1,
        gap: 0,
        backgroundColor: "white",
    },
    textHeader: {
        flex: 1,
        paddingLeft: "10%",
        paddingBottom: "0%",
        marginTop: 30,
        fontWeight: "800",
        fontSize: 30,
    },
    profileForm: {
        flex: 2,
        width: "100%",
        paddingTop: 20,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: "grey",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },

    inputHeader: {
        marginTop: "3%",
        textAlign: "left",
        // marginLeft: "5%",
        marginBottom: "1%",
        fontWeight: "700",
    },

    textInputs: {
        flex: 1,
        width: "80%",
        marginLeft: "10%",
        // padding: "2.5%",
        // borderRadius: 40,
        // justifyContent: "start",
    },
    textInput: {
        width: "100%",
        padding: "0%",
        paddingLeft: 0,
        paddingTop: "1%",

        marginTop: "0%",
        // borderWidth: 1,
        // borderRadius: 10,
        // borderColor: "grey",
    },
    textInputPaid: {
        width: "auto",
        padding: "1%",
        // paddingLeft: 0,
        // paddingTop: "1%",

        marginTop: "0%",

        borderRadius: 20,

        backgroundColor: "plum",
    },

    textInputUnderline: {
        marginTop: "3%",
        borderWidth: 1,
        width: "200%",
        // textAlign: "center",
        marginLeft: "-15%",
        borderColor: "rgb(240,240,240)",
    },

    buttons: {
        flex: 1,
        width: "60%",
        marginLeft: "20%",
        marginTop: "5%",
        marginBottom: "25%",
    },

    button: {
        padding: "5%",
        margin: "2%",
        alignItems: "center",
        backgroundColor: "rgb(240, 240, 240)",
        color: "grey",
        borderRadius: 40,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textButton: {},

    settings: {
        marginTop: "0%",

        marginBottom: "10%",
    },
});

export default BuddyProfileScreen;
