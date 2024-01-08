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
// import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getUserType,
    getValueByKey,
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import BackButton from "../../back-button.jsx";

import { countriesPicker } from "../../data-picker/citizenship.jsx";
import { languagePicker } from "../../data-picker/langues.jsx";

const StudentProfileForBuddy = ({ navigation }) => {
    const [fullName, setFullName] = useState(userData.fullName);
    const [citizenship, setCitizenship] = useState(userData.citizenship);
    const [sex, setSex] = useState(userData.sex);
    const [birthDate, setBirthDate] = useState(userData.birthDate);

    const [phone, setPhone] = useState(userData.phone);
    // const [email, setEmail] = useState(userData.email);
    const [email, setEmail] = useState(null);

    const [telegram, setTelegram] = useState(userData.telegram);
    const [whatsApp, setWhatsApp] = useState(userData.whatsApp);
    const [vk, setVk] = useState(userData.vk);

    const [nativeLanguage, setNativeLanguage] = useState(
        userData.nativeLanguage
    );
    const [otherLanguage, setOtherLanguage] = useState(userData.otherLanguage);
    const [university, setUniversity] = useState(userData.university);
    const [escortIsPaid, setEscortIsPaid] = userData.escortIsPaid
        ? useState("Yes")
        : useState("No");

    const [lastBuddy, setLastBuddy] = useState(userData.lastBuddy);
    const [institute, setInstitute] = useState(userData.institute);
    const [studyProgram, setStudyProgram] = useState(userData.studyProgram);
    const [lastArrivalDate, setLastArrivalDate] = useState(
        userData.lastArrivalDate
    );
    const [lastVisaExpiration, setLastVisaExpiration] = useState(
        userData.lastVisaExpiration
    );
    const [accommodation, setAccommodation] = useState(userData.accommodation);
    const [buddysComment, setBuddysComment] = useState(userData.buddysComment);
    const [profileType, setProfileType] = useState(getUserType(userData.user));

    const handleSave = () => {
        userData.lastBuddy = lastBuddy;
        userData.institute = institute;
        userData.studyProgram = studyProgram;
        userData.lastArrivalDate = lastArrivalDate;
        userData.lastVisaExpiration = lastVisaExpiration;

        userData.accommodation = accommodation;
        userData.buddysComment = buddysComment;
        userData.profileType = profileType;

        console.log("--userData--");

        for (var key in userData) {
            console.log(key + ": " + userData[key]);
        }

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
                            "Student Profile For Buddy",
                            "Профиль студента для сопровождающего"
                        )}
                    </Text>
                    <View style={styles.textInputs}>
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Full Name",
                                "Полное имя"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={fullName}
                            editable={false}
                            onChangeText={(text) => setFullName(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Citizenship",
                                "Гражданство"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={getValueByKey(3, countriesPicker)}
                            value={citizenship}
                            editable={false}
                            onChangeText={(text) => setCitizenship(text)}
                        />

                        <Text style={styles.inputHeader}>
                            {languageTranslate(userData.language, "Sex", "Пол")}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={sex}
                            editable={false}
                            onChangeText={(text) => setSex(text)}
                        />

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Birth Date",
                                "Дата Рождения"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={birthDate}
                            editable={false}
                            onChangeText={(text) => setBirthDate(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Phone",
                                "Телефон"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="+"
                            value={phone}
                            editable={false}
                            onChangeText={(text) => setPhone(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Email",
                                "Email"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={email}
                            editable={false}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Telegram",
                                "Telegram"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="@"
                            value={telegram}
                            editable={false}
                            onChangeText={(text) => setTelegram(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "WhatsApp",
                                "WhatsApp"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="+"
                            value={whatsApp}
                            editable={false}
                            onChangeText={(text) => setWhatsApp(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(userData.language, "VK", "VK")}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="@"
                            value={vk}
                            editable={false}
                            onChangeText={(text) => setVk(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Native Language",
                                "Родной язык ИС"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={getValueByKey(2, languagePicker)}
                            value={nativeLanguage}
                            editable={false}
                            onChangeText={(text) => setNativeLanguage(text)}
                        />
                        {/* <SelectList
                            style={styles.textInput}
                            data={languagePicker}
                            save="key"
                            placeholder={getValueByKey(userData.nativeLanguage, languagePicker)}
                            // defaultOption={{ key: '2', value: 'Spanish' }}
                            setSelected={(val) => setNativeLanguage(val)}
                        /> */}
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Other Language and Levels",
                                "Другие языки и уровень владения ими"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={otherLanguage}
                            editable={false}
                            onChangeText={(text) => setOtherLanguage(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "University",
                                "Университет"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={university}
                            editable={false}
                            onChangeText={(text) => setUniversity(text)}
                        />

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Escort Is Paid",
                                "Статус оплаты сопровождения"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={escortIsPaid}
                            editable={false}
                            onChangeText={(text) => setEscortIsPaid(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Profile Type",
                                "Тип Профиля"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={String(userData.user)}
                            value={profileType}
                            editable={false}
                            onChangeText={(text) => setProfileType(text)}
                        />

                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Last Buddy",
                                "Последний сопровождающий"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={lastBuddy}
                            editable={false}
                            onChangeText={(text) => setLastBuddy(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Institute",
                                "Институт Студента"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={institute}
                            onChangeText={(text) => setInstitute(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Study Program",
                                "Направление обучения"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={studyProgram}
                            onChangeText={(text) => setStudyProgram(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Last Arrival Date",
                                "Дата последнего приезда"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={lastArrivalDate}
                            onChangeText={(text) => setLastArrivalDate(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Last Visa Expiration",
                                "Дата окончания последней визы"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={lastVisaExpiration}
                            onChangeText={(text) => setLastVisaExpiration(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Accommodation",
                                "Место проживания"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={accommodation}
                            onChangeText={(text) => setAccommodation(text)}
                        />
                        <Text style={styles.inputHeader}>
                            {languageTranslate(
                                userData.language,
                                "Buddys Comment",
                                "Комментарий от сопровождающего"
                            )}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={""}
                            value={buddysComment}
                            onChangeText={(text) => setBuddysComment(text)}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}
                        >
                            <Text style={styles.textButton}>
                                {languageTranslate(
                                    userData.language,
                                    "Save",
                                    "Сохранить"
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StudentProfileForBuddy;
