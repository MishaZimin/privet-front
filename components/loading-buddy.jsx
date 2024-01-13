//2.2.2. Приветственный экран

import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { styles } from "./main.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    getTokenToServer,
} from "./Utils.jsx";
import BackButton from "./back-button.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loading } from "./loading.jsx";

const LoadingSettingBuddyScreen = ({ navigation }) => {
    const handleLoading = async () => {
        const accessToken = await AsyncStorage.getItem("access_token");

        if (accessToken !== null) {
            console.log("Access token: ", accessToken);
            const response = await getTokenToServer(
                accessToken,
                "/users/me/profile",
                "/json"
            );

            userData.access_token = accessToken;

            userData.fullName = response.profile_info.full_name;
            userData.citizenship = response.profile_info.citizenship;
            userData.sex = response.profile_info.sex;
            userData.birthDate = response.profile_info.birthdate;

            userData.phone = response.contacts.phone;
            userData.email = response.contacts.email;
            userData.telegram = response.contacts.telegram;
            userData.whatsApp = response.contacts.whatsapp;
            userData.vk = response.contacts.vk;

            userData.nativeLanguage = response.profile_info.nativeLanguage;
            userData.otherLanguage = response.contacts.other_languages;
            userData.university = response.profile_info.university;
            userData.escortIsPaid = response.profile_info.escort_paid;

            userData.id = response.contacts.user_id;

            const dataUserBD = await getTokenToServer(
                accessToken,
                "/auth/me",
                "/json"
            );
            userData.user = dataUserBD.role_id;

            console.log("userData: ", userData);
            const roleId = dataUserBD.role_id;

            // navigation.navigate("BuddysScreen");

            const chats = await getTokenToServer(
                userData.access_token,
                "/messages/chat/",
                "/json"
            );
            console.log(chats);

            navigation.navigate("MessengerScreen", { roleId, chats });
        }
    };

    // setTimeout(async () => {
    //     if (accessToken !== null) {
    //         console.log('Access token: ', accessToken);
    //         const response = await getTokenToServer(accessToken, "/users/me/profile", "/json");

    //         userData.access_token = accessToken;

    //         userData.fullName = response.profile_info.full_name;
    //         userData.citizenship = response.profile_info.citizenship;
    //         userData.sex = response.profile_info.sex;
    //         userData.birthDate = response.profile_info.birthdate;

    //         userData.phone = response.contacts.phone;
    //         userData.email = response.contacts.email;
    //         userData.telegram = response.contacts.telegram;
    //         userData.whatsApp = response.contacts.whatsapp;
    //         userData.vk = response.contacts.vk;

    //         userData.nativeLanguage = response.profile_info.nativeLanguage;
    //         userData.otherLanguage = response.contacts.other_languages;
    //         userData.university = response.profile_info.university;
    //         userData.escortIsPaid = response.profile_info.escort_paid;

    //         userData.id = response.contacts.user_id;
    //         console.log('userData: ', userData);

    //         navigation.navigate('BuddysScreen');
    //     }

    // }, 1);

    return (
        <SafeAreaView style={styles.main}>
            <View style={loading.loading}>
                <Text style={loadingIS.textLoading}>
                    {/* {userData.fullName}
                    {",\n"} */}
                    {languageTranslate(
                        userData.language,
                        "Privet👋",
                        "Privet👋"
                    )}
                </Text>
            </View>
            <TouchableOpacity
                style={loadingIS.button}
                title="loading..."
                onPress={handleLoading}
            >
                <Text style={loadingIS.textButton}>
                    {languageTranslate(userData.language, "Next", "Продолжить")}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export const loadingIS = StyleSheet.create({
    loading: {
        display: "flex",
        flex: 10,
        backgroundColor: "white",
        alignItems: "center",

        justifyContent: "center",
        paddingBottom: "15%",
    },

    textLoading: {
        width: "90%",
        fontWeight: "600",
        fontSize: 36,
        textAlign: "center",
    },
    textLoadingMini: {
        position: "absolute",
        bottom: "15%",
        fontWeight: "200",
        fontSize: 16,
    },

    button: {
        padding: "4%",
        margin: "2%",
        // marginBottom: "20%",

        width: "75%",
        marginLeft: "12.5%",
        alignItems: "center",
        backgroundColor: "black",
        color: "grey",
        borderRadius: 28,
        shadowColor: "grey",
    },
    buttonImg: {
        height: 50,
        width: "60%",
    },
    textButton: {
        color: "white",
        fontSize: 24,
        fontWeight: "600",
    },

    buttonForm: {
        position: "absolute",
        width: "100%",
        bottom: "10%",
    },
});

export default LoadingSettingBuddyScreen;
