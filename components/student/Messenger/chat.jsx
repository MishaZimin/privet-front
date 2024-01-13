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
// import { useNavigation } from "@react-navigation/native";

const ChatScreen = ({ navigation, route }) => {
    const [message, setMessage] = useState("");
    const scrollViewRef = useRef();
    const [ws, setWs] = useState(null);
    const [localMessages, setLocalMessages] = useState([]);

    const index = route.params.index;
    const companion = route.params.companion;
    const name = route.params.name;

    // console.log(name);а

    const messages = route.params.messages;

    // console.log(messages);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    useEffect(() => {
        const url = "ws://79.174.94.7:8000/ws?token=" + userData.access_token;

        const newWs = new WebSocket(url);

        console.log(url);

        newWs.onopen = () => {
            console.log("WebSocket connection established");
            setWs(newWs);
        };

        newWs.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
        };

        newWs.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        newWs.onmessage = (msg) => {
            console.log("WebSocket msg:", msg);
        };

        return () => {
            if (newWs && newWs.close) {
                newWs.close();
            }
        };
    }, []);

    const handleSend = (mes) => {
        try {
            if (mes.length > 0 && ws && ws.readyState === WebSocket.OPEN) {
                const newMessage = {
                    text: mes,
                    sender: "user",
                    date_print: new Date().toISOString([]),

                    from_user: "companion",
                    id: message[message.length - 1].id + 1,
                    attachment: "",
                    chat_id: index,
                    read: false,
                };
                setLocalMessages([...localMessages, newMessage]);
                setMessage("");
                const messageObject = {
                    type: "send_message",
                    chat_id: +index,
                    text: mes,
                };

                console.log("messageObject:", JSON.stringify(messageObject));
                ws.send(JSON.stringify(messageObject));
            } else {
                Alert.alert("нет соединения с WebSocket-сервером");
            }
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    };

    const handleProfile = () => {
        navigation.navigate("StudentProfileForBuddy");
    };

    // const navigationBack = useNavigation();

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.header} onPress={handleProfile}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePress}
                    >
                        <Image
                            resizeMode="contain"
                            style={styles.back}
                            source={require("../../img/return.png")}
                        />
                    </TouchableOpacity>
                    <Image
                        source={{
                            uri: "http://79.174.94.7:8000/images/0ae7d1fd-de81-4913-b73d-b3b2699abbad.jpg",
                        }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>{name}</Text>
                </TouchableOpacity>

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.chatContainer}
                    onContentSizeChange={() =>
                        scrollViewRef.current.scrollToEnd({ animated: true })
                    }
                >
                    {messages.concat(localMessages).map((msg, idx) => (
                        <View
                            key={idx}
                            style={
                                msg.from_user != companion
                                    ? styles.userMessage
                                    : styles.companionMessage
                            }
                        >
                            <Text
                                style={
                                    msg.from_user != companion
                                        ? styles.messageText
                                        : styles.messageText1
                                }
                            >
                                {msg.text}
                            </Text>
                            <Text
                                style={
                                    msg.from_user != companion
                                        ? styles.timestampTextUser
                                        : styles.timestampTextComp
                                }
                            >
                                {/* {msg.date_print.slice(5, 10)}{" "} */}
                                {msg.date_print.slice(11, 16)}
                            </Text>
                        </View>
                    ))}
                    <Text></Text>
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Сообщение"
                        placeholderTextColor="rgb(90, 93, 97)"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => handleSend(message)}
                    >
                        {/* components/img/send.png */}

                        <Image
                            resizeMode="contain"
                            style={styles.imgSend}
                            source={require("../../img/send.png")}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,

        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "rgb(240,240,240)",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        color: "black",

        fontWeight: "600",
    },
    chatContainer: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,

        backgroundColor: "white",

        paddingBottom: "0%",
        paddingTop: "1%",
        paddingLeft: "3%",
        paddingRight: "3%",

        shadowColor: "grey",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    textInput: {
        flex: 1,
        height: 40,
        borderColor: "black",

        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
        color: "black",

        fontSize: 18,
    },
    sendButton: {
        padding: 10,
        borderRadius: 20,
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

        backgroundColor: "rgb(216, 188, 238)",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 15,

        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,

        marginVertical: 5,
        maxWidth: "70%",
    },
    companionMessage: {
        alignSelf: "flex-start",
        backgroundColor: "rgb(243, 217, 156)",
        borderRadius: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 7,

        paddingTop: 10,
        paddingBottom: 5,
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
        marginVertical: 5,
        maxWidth: "70%",
    },
    messageText: {
        fontSize: 16,

        alignSelf: "flex-end",
        color: "black",
    },
    messageText1: {
        alignSelf: "flex-start",
        fontSize: 16,

        color: "black",
    },
    timestampTextUser: {
        fontSize: 10,
        color: "black",
        alignSelf: "flex-end",

        fontWeight: "500",

        marginTop: 3,
    },
    timestampTextComp: {
        fontSize: 10,
        color: "black",
        alignSelf: "flex-start",
        fontWeight: "500",

        marginTop: 3,
    },
    imgSend: {
        width: 20,
        height: 20,

        marginRight: "1%",
        marginTop: "1%",
    },

    button: {
        alignItems: "left",

        marginRight: 15,
        marginLeft: 5,
    },
    back: {
        width: 25,
        height: 25,
    },
});

export default ChatScreen;
