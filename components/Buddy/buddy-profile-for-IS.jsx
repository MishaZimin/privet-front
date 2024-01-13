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
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from "../Utils.jsx";
import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";

const BuddyProfileForIS = ({ navigation }) => {
    const [city, setCity] = useState(userData.city);
    const [fullName, setFullName] = useState(userData.fullName);
    const [birthDate, setBirthDate] = useState(userData.birthDate);

    const [phone, setPhone] = useState(userData.phone);
    const [email, setEmail] = useState(userData.email);
    const [telegram, setTelegram] = useState(userData.telegram);
    const [whatsApp, setWhatsApp] = useState(userData.whatsApp);
    const [vk, setVk] = useState(userData.vk);

    const [nativeLanguage, setNativeLanguage] = useState(
        userData.nativeLanguage
    );
    const [otherLanguage, setOtherLanguage] = useState(userData.otherLanguage);
    const [university, setUniversity] = useState(userData.university);
    const [profileType, setProfileType] =
        userData.user == 1 ? useState("Sudent") : useState("Buddy");
    const [buddyStatus, setBuddyStatus] = userData.buddyStatus
        ? useState("Yes")
        : useState("No");

    return (
        <SafeAreaView style={profile.main}>
            <ScrollView style={profile.main}>
                <View style={profile.form}>
                    {/* <BackButton /> */}
                    <View style={profile.header}>
                        <Text style={profile.textHeader}>
                            {languageTranslate(
                                userData.language,
                                "Profile",
                                "Профиль"
                            )}
                        </Text>

                        <View style={profile.buttonsSettings}>
                            <TouchableOpacity
                                style={profile.buttonSettings}
                                title="handleAllArrivals"
                                onPress={handleSettings}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={profile.img}
                                    source={require("../img/setting.png")}
                                />
                            </TouchableOpacity>
                        </View>
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
                                editable={false}
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
                                data={cityPicker}
                                save="key"
                                placeholder={getValueByKey(
                                    userProfile.city,
                                    cityPicker
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
                                <Image
                                    resizeMode="contain"
                                    style={profile.imgData}
                                    source={require("../img/3d-fluency-planner.png")}
                                />
                                <TextInputMask
                                    style={profile.textInputData}
                                    type={"datetime"}
                                    options={{
                                        format: "YYYY-MM-DD",
                                    }}
                                    placeholder="YYYY-MM-DD"
                                    value={birthDate}
                                    onChangeText={(text) => setBirthDate(text)}
                                    keyboardType="numeric"
                                />
                                {birthDate.length >= 10 ? (
                                    <Text style={profile.textAge}>
                                        {calculateAge(birthDate)} лет
                                    </Text>
                                ) : null}

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
                            <View style={profile.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={profile.imgContact}
                                    source={require("../img/3d-fluency-telephone-handset.png")}
                                />
                                <TextInput
                                    style={profile.textInputContact}
                                    placeholder="+"
                                    value={phone}
                                    onChangeText={(text) => {
                                        if (text.length <= 12) {
                                            setPhone(text);
                                        }
                                    }}
                                    maxLength={12}
                                />
                            </View>

                            <View style={profile.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={profile.imgContact}
                                    source={require("../img/3d-fluency-blue-envelope.png")}
                                />
                                <TextInput
                                    style={profile.textInput}
                                    placeholder="Email"
                                    value={email}
                                    editable={false}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>

                            <View style={profile.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={profile.imgContact}
                                    source={require("../img/3d-fluency-telegram-logo.png")}
                                />
                                <TextInput
                                    style={profile.textInputContact}
                                    placeholder="@"
                                    value={telegram}
                                    onChangeText={(text) => {
                                        if (text.length <= 32) {
                                            setTelegram(text);
                                        }
                                    }}
                                    maxLength={32}
                                />
                            </View>

                            <View style={profile.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={profile.imgContact}
                                    source={require("../img/3d-fluency-whatsapp-logo.png")}
                                />
                                <TextInput
                                    style={profile.textInputContact}
                                    placeholder="+"
                                    value={whatsApp}
                                    onChangeText={(text) => {
                                        if (text.length <= 12) {
                                            setWhatsApp(text);
                                        }
                                    }}
                                    maxLength={12}
                                />
                            </View>

                            <View style={profile.contactContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={profile.imgContact}
                                    source={require("../img/3d-fluency-vk-logo.png")}
                                />
                                <TextInput
                                    style={profile.textInputContact}
                                    placeholder="@"
                                    value={vk}
                                    onChangeText={(text) => {
                                        if (text.length <= 32) {
                                            setVk(text);
                                        }
                                    }}
                                    maxLength={32}
                                />
                            </View>

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

    header: {
        display: "flex",
        flexDirection: "row",
    },

    textHeader: {
        flex: 3,
        paddingLeft: "10%",
        marginTop: 10,
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

        marginBottom: "1%",
        fontWeight: "700",
    },

    textInputs: {
        flex: 1,
        width: "80%",
        marginLeft: "10%",
    },
    textInput: {
        padding: "0%",
        paddingLeft: 0,
        marginTop: "1%",

        borderRadius: 20,
    },
    textInputPaid: {
        width: "auto",
        padding: "1%",

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
        width: "40%",
        marginLeft: "30%",
        marginTop: "5%",
        marginBottom: "25%",
    },

    button: {
        padding: "5%",
        margin: "2%",
        alignItems: "center",
        backgroundColor: "black",
        color: "grey",
        borderRadius: 20,
    },
    textButton: {
        fontWeight: "700",
        textAlign: "center",

        color: "white",
    },

    buttonsSettings: {
        flex: 1,
        width: "10%",
        marginTop: 13,

        marginBottom: "10%",
    },

    buttonSettings: {
        padding: "5%",

        alignItems: "center",
    },

    settings: {
        marginTop: "0%",

        marginBottom: "10%",
    },

    img: {
        width: 25,
        height: 25,
    },

    contactContainer: {
        display: "flex",
        flexDirection: "row",
    },

    dateAndTime: {
        display: "flex",
        flexDirection: "row",
    },
    imgContact: {
        width: 20,
        height: 20,

        marginRight: "1%",
        marginTop: "1%",
    },

    imgData: {
        width: 20,
        height: 20,

        marginRight: "1%",
        // marginTop: "1%",
    },

    textInputData: {
        backgroundColor: "rgb(230,230,230)",

        paddingHorizontal: 3,
        paddingVertical: 0,

        borderRadius: 20,
    },

    textAge: {
        marginLeft: 15,
        paddingTop: 1,
        color: "grey",
    },
});

function calculateAge(birthdate) {
    const birthdateArray = birthdate.split("-");

    const birthdateObj = new Date(
        birthdateArray[0],
        birthdateArray[1] - 1,
        birthdateArray[2]
    );

    const currentDate = new Date();

    const timeDifference = currentDate - birthdateObj;

    const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));

    return age;
}

export default BuddyProfileForIS;
