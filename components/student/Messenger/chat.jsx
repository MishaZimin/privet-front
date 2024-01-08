import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Alert,
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
    supportArr,
} from "../../Utils.jsx";
import BackButtonMsg from "../../back-button-msg.jsx";
// import { styles } from '../../main.jsx';

const ChatScreen = ({ navigation, route }) => {
    const [message, setMessage] = useState("");
    const scrollViewRef = useRef();

    const index = route.params.index;
    const companion = route.params.companion;
    const messages = route.params.messages;

    console.log(messages);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleSend = (mes) => {
        if (mes.length > 0) {
            const newMessage = {
                text: message,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            messengerArr[index].messages.push(newMessage);
            setMessage("");

            const newMessageCompanion = {
                text: getRandomMessage(popularMessages),
                sender: "companion",
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            messengerArr[index].messages.push(newMessageCompanion);
        } else {
            Alert.alert("0 букв");
        }
    };

    const handleProfile = () => {
        navigation.navigate("StudentProfileForBuddy");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.header} onPress={handleProfile}>
                    <BackButtonMsg />
                    <Image
                        source={{ uri: messengerArr[2].photo }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>
                        {companion.slice(0, 10)}...
                    </Text>
                </TouchableOpacity>

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.chatContainer}
                    onContentSizeChange={() =>
                        scrollViewRef.current.scrollToEnd({ animated: true })
                    }
                >
                    {messages.map((msg, idx) => (
                        <View
                            key={idx}
                            style={
                                msg.from_user == companion
                                    ? styles.userMessage
                                    : styles.companionMessage
                            }
                        >
                            <Text
                                style={
                                    msg.from_user == companion //! поменять на !=
                                        ? styles.messageText
                                        : styles.messageText1
                                }
                            >
                                {msg.text}
                            </Text>
                            <Text
                                style={
                                    msg.from_user == companion
                                        ? styles.timestampTextUser
                                        : styles.timestampTextComp
                                }
                            >
                                {msg.date_print.slice(5, 10)}{" "}
                                {msg.date_print.slice(11, 16)}{" "}
                            </Text>
                        </View>
                    ))}
                    <Text></Text>
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Введите сообщение"
                        placeholderTextColor="rgb(90, 93, 97)"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => handleSend(message)}
                    >
                        <Text style={styles.sendButtonText}>
                            {languageTranslate(
                                userData.language,
                                " ✉️ ",
                                " ✉️ "
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const popularMessages = [
    // 'Hi, how are you?',
    // 'Hello!',
    // 'What\'s up?',
    // 'How\'s it going?',
    // 'Nice to meet you!',
    // 'Good to see you!',
    // 'Hey there!',
    // 'How are things?',
    // 'Long time no see!',
    // 'What\'s new?',
    "привет",
    "очень большое сообщение очень большое сообщение очень большое сообщение очень большое сообщение очень большое сообщение очень большое сообщение очень большое сообщение",
];

function getRandomMessage(messages) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(24, 25, 29)",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        // marginBottom: 100,
        backgroundColor: "rgb(41, 46, 50)",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        color: "white",
    },
    chatContainer: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        // borderTopWidth: 1,
        // borderTopColor: '#fff',
        backgroundColor: "rgb(41, 46, 50)",
        paddingBottom: "0%",
        paddingTop: "0%",
        paddingLeft: "3%",
        paddingRight: "3%",

        // marginTop: 50,
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: "black",
        // borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
        color: "white",
    },
    sendButton: {
        padding: 10,
        borderRadius: 20,
        // backgroundColor: 'black',
    },
    sendButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "rgb(43, 47, 51)",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        maxWidth: "70%",
    },
    companionMessage: {
        alignSelf: "flex-start",
        backgroundColor: "rgb(43, 47, 51)",
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 7,

        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        maxWidth: "70%",
    },
    messageText: {
        alignSelf: "flex-end",
        color: "white",
    },
    messageText1: {
        alignSelf: "flex-start",
        color: "white",
    },
    timestampTextUser: {
        fontSize: 12,
        color: "grey",
        alignSelf: "flex-end",
    },
    timestampTextComp: {
        fontSize: 12,
        color: "grey",
        alignSelf: "flex-start",
    },
});

export default ChatScreen;
