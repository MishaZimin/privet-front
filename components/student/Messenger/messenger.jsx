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
    Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    messengerArr,
    userData,
    getUserType,
    timliderMessengerArr,
    getTokenToServer,
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import BackButton from "../../back-button.jsx";
import BuddysScreen from "../../Buddy/buddy.jsx";
import StudentsScreen from "../student.jsx";

const MessengerScreen = ({ navigation, route }) => {
    const role = route.params.roleId;
    const chats = route.params.chats;

    console.log("--chats--", chats);

    const handleChat = async (index, companion) => {
        console.log(index);

        try {
            const messages = await getData("/messages/" + index);
            navigation.navigate("ChatScreen", { index, companion, messages });
        } catch (err) {
            console.log("err:", err);
        }
    };

    const handleSupport = () => {
        console.log("go to support");
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>Messenger</Text>
                    </View>
                    {chats.length > 0 ? (
                        chats.map((chat, index) => (
                            <TouchableOpacity
                                style={[
                                    styles.buddysStudents,
                                    stylesMessenger.header,
                                ]}
                                key={index}
                                onPress={() =>
                                    handleChat(chat.id, chat.second_user)
                                }
                            >
                                <Image
                                    source={{ uri: messengerArr[2].photo }}
                                    style={stylesMessenger.avatar}
                                />
                                <View>
                                    <Text style={stylesMessenger.username}>
                                        {chat.second_user.slice(0, 8)}...
                                    </Text>
                                    {/* {chat.messages.length > 0 ? (
                                        <Text
                                            style={[
                                                styles.text1,
                                                stylesMessenger.lastMessage,
                                            ]}
                                        >
                                            {chat.messages[
                                                chat.messages
                                                    .length - 1
                                            ].text.slice(0, 25)}
                                        </Text>
                                    ) : null} */}
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View>
                            <Text style={styles.studentName}>
                                {languageTranslate(
                                    userData.language,
                                    "You have no arrival",
                                    "У вас нет приездов"
                                )}
                            </Text>
                        </View>
                    )}
                    {/* <TouchableOpacity
                        style={styles.button}
                        title="Support"
                        onPress={handleSupport}>
                        <Text style={styles.textButton}>
                            {languageTranslate(userData.language, 'Support', 'Поддержка')}

                        </Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
            {role == 1 ? (
                <StudentsScreen navigation={navigation} />
            ) : (
                <BuddysScreen navigation={navigation} />
            )}
        </SafeAreaView>
    );
};

const stylesMessenger = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    lastMessage: {
        color: "grey",
        fontSize: 13,
    },
    username: {
        fontSize: 16,
    },
});

export const getData = async (adress) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export default MessengerScreen;
