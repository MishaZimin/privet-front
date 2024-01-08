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
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>
                            {languageTranslate(
                                userData.language,
                                "Arrival",
                                "Приезд"
                            )}
                        </Text>
                    </View>
                    <View style={styles.buddysStudents}>
                        {arrivalStudents.map((student, index) => (
                            <View key={index} style={styles.buddysStudent}>
                                <Text style={styles.text1}>
                                    Full Name: {student.full_name}
                                </Text>
                                <Text style={styles.text1}>
                                    Sex: {student.sex}
                                </Text>
                                <Text style={styles.text1}>
                                    Arrival Date: {student.arrival_date}
                                </Text>
                                <Text style={styles.text1}>
                                    Arrival Time:{" "}
                                    {student.arrival_time.slice(0, 8)}
                                </Text>
                                <Text style={styles.text1}>
                                    Flight Number: {student.flight_number}
                                </Text>
                                <Text style={styles.text1}>
                                    Arrival Point: {student.arrival_point}
                                </Text>
                                <Text style={styles.text1}>
                                    Citizenship: {student.citizenship}
                                </Text>
                                <Text style={styles.text1}>
                                    Phone: {student.phone}
                                </Text>
                                <Text style={styles.text1}>
                                    Telegram: {student.telegram}
                                </Text>
                                <Text style={styles.text1}>
                                    VK: {student.vk}
                                </Text>
                                <Text style={styles.text1}>
                                    Comment: {student.comment}
                                </Text>
                                <Text style={styles.text1}>
                                    Tickets: {student.tickets}
                                </Text>
                            </View>
                        ))}
                        {arrivalBuddys.map((buddy, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.buddysStudent}
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
                                <View style={styles.buttons}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() =>
                                            handleDelete(buddy.full_name)
                                        }
                                    >
                                        <Text style={styles.textButton}>
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
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={styles.button}
                                title=""
                                onPress={handleSignUp}
                            >
                                <Text style={styles.textButton}>
                                    {languageTranslate(
                                        userData.language,
                                        "Sign up for this visit",
                                        "Записаться на этот приезд"
                                    )}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                title=""
                                onPress={handleApprove}
                            >
                                <Text style={styles.textButton}>
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
});

export const putSignUpArrival = async (token, adress, contentType) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "PUT",
                headers: {
                    Accept: "application" + contentType,
                    Authorization: "Bearer " + token,
                },
            }
        );
        const responseData = await res.json();
        console.log("----------------");
        console.log(adress, responseData);
        console.log("----------------");

        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

const deleteBuddy = async (data, token, adress) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                method: "DELETE",
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

function findIdByName(name, data) {
    for (let item of data) {
        if (item.full_name === name) {
            return item.id;
        }
    }
    return null;
}

export default ArrivalBuddy;
