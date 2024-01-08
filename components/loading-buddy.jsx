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
                <Text style={loading.textLoading}>
                    {languageTranslate(
                        userData.language,
                        "Privet👋",
                        "Privet👋"
                    )}
                </Text>
                <Text style={loading.textLoadingMini}>
                    {languageTranslate(
                        userData.language,
                        "Loading",
                        "Идет загрузка"
                    )}
                </Text>
                <TouchableOpacity
                    style={loading.button}
                    title="loading..."
                    onPress={handleLoading}
                >
                    <Text style={loading.textButton}>skip</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoadingSettingBuddyScreen;
