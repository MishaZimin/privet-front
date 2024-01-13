//2.2.2. Приветственный экран

import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    FlatList,
} from "react-native";
import { styles } from "../main.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    languageTranslate,
    userData,
    allarrivalBookArr,
    getTokenToServer,
    messengerArr,
} from "../Utils.jsx";
import BackButton from "../back-button.jsx";
import Loader from "../loader.jsx";

const ArrivalBuddy = ({ navigation, route }) => {
    const indexArrival = route.params.index;
    const arrivalInf = route.params.response;
    const indexInAllArrivals = route.params.indexArrival;

    const arrivalStudents = arrivalInf.students;
    // const arrivalBuddys = arrivalInf.buddies;

    const [arrivalBuddys, setArrivalBuddys] = useState(arrivalInf.buddies);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const responsePutSignUpArrival = await putSignUpArrival(
                userData.access_token,
                "/arrivals/sign-up/" + indexInAllArrivals,
                "/json"
            );
            if (
                responsePutSignUpArrival.detail ==
                "Buddy has been added to arrival"
            ) {
                const response1 = await getTokenToServer(
                    userData.access_token,
                    "/arrivals/" + indexInAllArrivals,
                    "/json"
                );

                setArrivalBuddys(response1.buddies);
            } else {
                Alert.alert("Arrival already has max amount of buddies");
            }
        } catch (err) {
            Alert.alert("Error: ", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = () => {
        Alert.alert("приезд утвержден");
    };

    const handleDelete = async (name) => {
        try {
            setLoading(true);
            const allBuddies = await getTokenToServer(
                userData.access_token,
                "/buddies",
                "/json"
            );

            const resultId = findIdByName(name, allBuddies);

            console.log(resultId);

            const deleteInf = {
                buddy_id: resultId,
                arrival_id: +indexInAllArrivals,
            };

            const responseDelete = await deleteBuddy(
                deleteInf,
                userData.access_token,
                "/arrivals/delete-buddy/"
            );

            if (
                responseDelete.detail == "Buddy has been deleted from arrival"
            ) {
                const response1 = await getTokenToServer(
                    userData.access_token,
                    "/arrivals/" + indexInAllArrivals,
                    "/json"
                );

                setArrivalBuddys(response1.buddies);
            }
        } catch (err) {
            Alert.alert("Error: ", err);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileBuddy = (index) => {
        navigation.navigate("BuddyProfileForIS");
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    {/* <BackButton /> */}
                    <View style={stylesBuddy.textBlock}>
                        <Text style={stylesBuddy.textHeader}>
                            {languageTranslate(
                                userData.language,
                                "Arrival",
                                "Приезд"
                            )}
                        </Text>
                    </View>
                    <View style={stylesBuddy.buddysStudents}>
                        {arrivalStudents.map((student, index) => (
                            <View key={index} style={stylesBuddy.buddysStudent}>
                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Full Name",
                                        "Полное имя"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.full_name}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Sex",
                                        "Пол"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.sex}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival Date",
                                        "Дата приезда"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.arrival_date}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival Time",
                                        "Время приезда"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.arrival_time.slice(0, 5)}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Flight Number",
                                        "Номер рейса"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.flight_number}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival Point",
                                        "Пункт прибытия"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.arrival_point}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Citizenship",
                                        "Гражданство"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.citizenship}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Contacts",
                                        "Контакты"
                                    )}
                                </Text>

                                <View style={stylesBuddy.contactContainer}>
                                    <Image
                                        resizeMode="contain"
                                        style={stylesBuddy.imgContact}
                                        source={require("../img/3d-fluency-telephone-handset.png")}
                                    />
                                    <Text style={styles.text1}>
                                        {student.phone}
                                    </Text>
                                </View>

                                {/* <View style={stylesBuddy.contactContainer}>
                                    <Image
                                        resizeMode="contain"
                                        style={stylesBuddy.imgContact}
                                        source={require("../img/3d-fluency-whatsapp-logo.png")}
                                    />
                                    <Text style={stylesBuddy.text1}>
                                        {student.whatsApp}
                                    </Text>
                                </View> */}

                                <View style={stylesBuddy.contactContainer}>
                                    <Image
                                        resizeMode="contain"
                                        style={stylesBuddy.imgContact}
                                        source={require("../img/3d-fluency-telegram-logo.png")}
                                    />
                                    <Text style={stylesBuddy.text1}>
                                        {student.telegram}
                                    </Text>
                                </View>

                                <View style={stylesBuddy.contactContainer}>
                                    <Image
                                        resizeMode="contain"
                                        style={stylesBuddy.imgContact}
                                        source={require("../img/3d-fluency-vk-logo.png")}
                                    />
                                    <Text style={stylesBuddy.text1}>
                                        {student.vk}
                                    </Text>
                                </View>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Comment",
                                        "Комментарий"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.comment}
                                </Text>

                                <Text style={stylesBuddy.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Tickets",
                                        "Билеты"
                                    )}
                                </Text>
                                <Text style={stylesBuddy.text1}>
                                    {student.tickets}
                                </Text>
                            </View>
                        ))}
                        {arrivalBuddys.map((buddy, index) => (
                            <TouchableOpacity
                                key={index}
                                style={stylesBuddy.buddysStudent}
                                onPress={() => handleProfileBuddy(index)}
                            >
                                <View style={stylesBuddy.form}>
                                    <Image
                                        source={{ uri: messengerArr[2].photo }}
                                        style={stylesBuddy.avatar}
                                    />
                                    <Text style={styles.text1}>
                                        {buddy.full_name}
                                    </Text>
                                </View>
                                <View style={stylesBuddy.buttons}>
                                    <TouchableOpacity
                                        style={stylesBuddy.button}
                                        onPress={() =>
                                            handleDelete(buddy.full_name)
                                        }
                                    >
                                        <Text style={stylesBuddy.textButton}>
                                            {languageTranslate(
                                                userData.language,
                                                "Remove",
                                                "Удалить"
                                            )}
                                            {/* {languageTranslate(
                                                userData.language,
                                                "Remove an Accompanying Person from the Arrival",
                                                "Удалить Сопровождающего из приезда"
                                            )} */}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <View style={stylesBuddy.buttons}>
                            <TouchableOpacity
                                style={stylesBuddy.button}
                                title=""
                                onPress={handleSignUp}
                            >
                                <Text style={stylesBuddy.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        "Sign up for this visit",
                                        "Записаться на этот приезд"
                                    )}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesBuddy.button}
                                title=""
                                onPress={handleApprove}
                            >
                                <Text style={stylesBuddy.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        "Approve this arrival",
                                        "Утвердить этот приезд"
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Loader loading={loading} text="" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const stylesBuddy = StyleSheet.create({
    form: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textBlock: {
        width: "65%",
    },

    text1: {
        padding: "1%",
        width: "100%",
    },

    textHeader: {
        marginTop: "0%",
        paddingBottom: "5%",
        fontSize: 20,
        fontWeight: "600",

        textAlign: "center",
    },

    buddysStudents: {
        backgroundColor: "white",
        padding: "8%",
        marginBottom: "5%",
        borderRadius: 30,
        width: "100%",
        borderRadius: 40,

        shadowColor: "grey",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
    },

    buddysStudent: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "black",
        padding: "5%",
        marginBottom: "5%",

        borderRadius: 0,
    },
    buttons: {
        flex: 1,
        // width: "40%",

        marginTop: "5%",
        // marginBottom: "25%",
    },
    button: {
        padding: "5%",
        margin: "2%",
        alignItems: "center",
        backgroundColor: "black",
        color: "grey",
        borderRadius: 30,
    },
    textButton: {
        fontWeight: "700",
        textAlign: "center",

        color: "white",
    },

    text2: {
        padding: "1%",
        width: "100%",
        fontWeight: "700",
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
});

export const putSignUpArrival = async (token, adress, contentType) => {
    try {
        const res = await fetch("http://79.174.94.7:8000" + adress, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        });

        // console.log(res);

        const responseData = await res.json();

        return responseData;
    } catch (err) {
        console.log(adress, err);
        // throw err;
    }
};

const deleteBuddy = async (data, token, adress) => {
    try {
        const res = await fetch("http://79.174.94.7:8000" + adress, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            method: "DELETE",
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

function findIdByName(name, data) {
    for (let item of data) {
        if (item.full_name === name) {
            return item.id;
        }
    }
    return null;
}

export default ArrivalBuddy;
