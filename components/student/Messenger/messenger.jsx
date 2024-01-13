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
import WebSocket from "react-native-websocket";

const MessengerScreen = ({ navigation, route }) => {
    const role = route.params.roleId;
    const chats = route.params.chats;

    console.log("--chats--", chats);

    const handleChat = async (index, companion, name) => {
        // console.log(index);

        try {
            const messages = await getData("/messages/" + index);
            navigation.navigate("ChatScreen", {
                index,
                companion,
                name,
                messages,
            });
        } catch (err) {
            console.log("err:", err);
        }
    };

    const handleSupport = () => {
        console.log("go to support");
    };

    return (
        <SafeAreaView style={stylesMessenger.main}>
            <ScrollView style={stylesMessenger.main}>
                <View style={stylesMessenger.form}>
                    <View style={stylesMessenger.header}>
                        <Text style={stylesMessenger.textHeader}>
                            {languageTranslate(
                                userData.language,
                                "Chat",
                                "Чат"
                            )}
                        </Text>
                    </View>
                    <View style={stylesMessenger.profileForm}>
                        {chats.length > 0 ? (
                            chats.map((chat, index) => (
                                <TouchableOpacity
                                    style={[
                                        stylesMessenger.chats,
                                        stylesMessenger.header,
                                    ]}
                                    key={index}
                                    onPress={() =>
                                        handleChat(
                                            chat.chat_id,
                                            chat.chat_with,
                                            chat.chat_with_name
                                        )
                                    }
                                >
                                    <Image
                                        resizeMode="contain"
                                        style={stylesMessenger.avatar}
                                        source={require("../../img/3d-fluency-male-user.png")}
                                    />
                                    <View>
                                        <Text style={stylesMessenger.username}>
                                            {chat.chat_with_name}
                                        </Text>
                                        {chat.last_message ? (
                                            <Text
                                                style={[
                                                    styles.text1,
                                                    stylesMessenger.lastMessage,
                                                ]}
                                            >
                                                {chat.last_message.text.slice(
                                                    0,
                                                    23
                                                )}
                                            </Text>
                                        ) : null}
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View>
                                <Text style={styles.studentName}></Text>
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

        marginBottom: "5%",
        fontSize: 30,
    },

    avatar: {
        width: 50,
        height: 50,

        borderRadius: 30,
        marginRight: 10,
    },
    lastMessage: {
        color: "grey",
        fontSize: 13,
        marginTop: "auto",
        marginBottom: "auto",
    },
    username: {
        fontSize: 16,

        fontWeight: "600",
        marginTop: "auto",
        marginBottom: "auto",
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

    chats: {
        // backgroundColor: "rgba(230, 230, 230, 0.8)",
        padding: "3%",
        marginBottom: "2%",
        // borderRadius: 30,
        width: "100%",
        // borderRadius: 40,

        borderBottomWidth: 1,
        borderColor: "rgba(230, 230, 230, 0.8)",
    },

    chat: {
        backgroundColor: "rgba(221, 220, 220, 0.8)",
        padding: "5%",
        marginBottom: "5%",
        borderRadius: 30,
        width: "100%",
        // borderRadius: 30,
    },
});

export const getData = async (adress) => {
    try {
        const res = await fetch("http://79.174.94.7:8000" + adress, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export default MessengerScreen;
