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
    Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    sendChangeProfileToServer,
    userData,
    getUserType,
    getValueByKey,
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import BackButton from "../../back-button.jsx";
import { countriesPicker } from "../../data-picker/citizenship.jsx";
import { languagePicker } from "../../data-picker/langues.jsx";
import { universityPicker } from "../../data-picker/university.jsx";

import { ToastAndroid } from "react-native";
import { ToastIOS } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInputMask } from "react-native-masked-text";
import StudentsScreen from "../student.jsx";
import Loader from "../../loader.jsx";

const StudentProfileScreen = ({ navigation, route }) => {
    const userProfile = route.params.userProfile;
    // console.log("userProfile", userProfile);
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState(userProfile.fullName);
    const [citizenship, setCitizenship] = useState(userProfile.citizenship);
    const [sex, setSex] = useState(userProfile.sex);
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
    const [escortIsPaid, setEscortIsPaid] = userProfile.escortIsPaid
        ? useState("Сопровождение оплачено")
        : useState("Сопровождение не оплачено");
    const [profileType, setProfileType] = useState(getUserType(userData.user));

    // const [lastBuddy, setLastBuddy] = useState(userData.lastBuddy);
    // const [institute, setInstitute] = useState(userData.institute);
    // const [studyProgram, setStudyProgram] = useState(userData.studyProgram);
    // const [lastArrivalDate, setLastArrivalDate] = useState(
    //     userData.lastArrivalDate
    // );
    // const [lastVisaExpiration, setLastVisaExpiration] = useState(
    //     userData.lastVisaExpiration
    // );
    // const [accommodation, setAccommodation] = useState(userData.accommodation);
    // const [buddysComment, setBuddysComment] = useState(userData.buddysComment);

    const sexPicker = [
        { key: "Male", value: "Man" },
        { key: "Female", value: "Woman" },
    ];

    const showToastIOS = () => {
        ToastIOS.show("Ваш текст уведомления", ToastIOS.LONG);
    };

    const showToastAndroid = () => {
        ToastAndroid.showWithGravityAndOffset(
            "text",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };
    const handleSettings = () => {
        navigation.navigate("SettingScreen");
    };

    const handleSave = async () => {
        const data = {
            full_name: fullName == "" ? null : fullName,
            citizenship: citizenship == "" ? null : citizenship,
            city: null,
            sex: sex == "" ? null : sex,
            birthdate: birthDate == "" ? null : birthDate,
            phone: phone == "" ? null : phone,
            telegram: telegram == "" ? null : telegram,
            whatsapp: whatsApp == "" ? null : whatsApp,
            vk: vk == "" ? null : vk,
            native_language: nativeLanguage,
            other_languages_ids: [],
            university: university == "" ? null : university,
        };
        console.log("sex:", sex);
        console.log("birthDate:", birthDate);

        console.log("send data:", data);
        const accessToken = await AsyncStorage.getItem("access_token");
        const response = await sendChangeProfileToServer(
            data,
            "/users/me/profile/change",
            "/json",
            accessToken
        );
        console.log("response:", response.profile_info.sex);

        Alert.alert("профиль сохранен");
    };

    const handleNotifications = () => {
        if (Platform.OS === "android") {
            console.log("уведомления android");
            showToastAndroid;
        } else {
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
        <SafeAreaView style={profile.main}>
            <ScrollView style={profile.main}>
                <View style={profile.form}>
                    {/* <BackButton /> */}
                    <Text style={[profile.textHeader]}>
                        {languageTranslate(
                            userData.language,
                            "Profile",
                            "Профиль"
                        )}
                    </Text>

                    <View style={[profile.buttons, profile.settings]}>
                        <TouchableOpacity
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
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.button}
                            onPress={handleNotifications}
                        >
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Notifications",
                                    "Уведомления"
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
                                    "Полное имя"
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
                                    "Citizenship",
                                    "Гражданство"
                                )}
                            </Text>

                            <SelectList
                                boxStyle={profile.textInput}
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
                                    userData.citizenship,
                                    countriesPicker
                                )}
                                // defaultOption={{ key: '2', value: 'Spanish' }}
                                setSelected={(val) => setCitizenship(val)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Sex",
                                    "Пол"
                                )}
                            </Text>
                            <SelectList
                                style={profile.picker}
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
                                search={false}
                                // value={sex}
                                data={sexPicker}
                                save="key"
                                placeholder={sex}
                                setSelected={(val) => setSex(val)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Birth Date",
                                    "Дата Рождения"
                                )}
                            </Text>
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

                            {/* <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={birthDate}
                            onChangeText={text => setBirthDate(text)}
                        /> */}
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
                                setSelected={(val) => setNativeLanguage(val)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Other Language",
                                    "Другие языки"
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
                                    "Escort Is Paid",
                                    "Статус оплаты сопровождения"
                                )}
                            </Text>
                            <TextInput
                                style={
                                    userProfile.escortIsPaid
                                        ? profile.textInputPaid
                                        : profile.textInput
                                }
                                placeholder=""
                                value={escortIsPaid}
                                editable={false}
                                onChangeText={(text) => setEscortIsPaid(text)}
                            />
                            <View style={profile.textInputUnderline}></View>

                            <Text style={profile.inputHeader}>
                                {languageTranslate(
                                    userData.language,
                                    "Profile Type",
                                    "Тип Профиля"
                                )}
                            </Text>
                            <TextInput
                                style={profile.textInput}
                                placeholder={getUserType(userData.user)}
                                value={profileType}
                                editable={false}
                                onChangeText={(text) => setProfileType(text)}
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
            <StudentsScreen navigation={navigation} />
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

export default StudentProfileScreen;
