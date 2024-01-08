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
    arrivalBookData,
    allArrivalBuddy,
    getTokenToServer,
} from "../Utils.jsx";
import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";
import Loader from "../loader.jsx";
import BuddysScreen from "./buddy.jsx";

const AllArrivalsScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);

    const allArrivals = route.params.allarrivalBookArr;

    console.log("allArrivals:", allArrivals);

    const handleArrivalBuddy = async (index, indexArrival) => {
        try {
            setLoading(true);
            console.log("------", index, indexArrival);
            const response = await getTokenToServer(
                userData.access_token,
                "/arrivals/" + indexArrival,
                "/json"
            );

            logArrivalData(response);
            navigation.navigate("ArrivalBuddy", {
                index,
                response,
                indexArrival,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMyArrivals = async () => {
        try {
            setLoading(true);
            const responseMeArrivals = await getTokenToServer(
                userData.access_token,
                "/me/arrivals",
                "/json"
            );
            console.log(responseMeArrivals);

            navigation.navigate("MyArrivals", { responseMeArrivals });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
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
                                "All Arrivals",
                                "Все приезды"
                            )}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleMyArrivals}
                    >
                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                "My Arrivals",
                                "Мои приезды"
                            )}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.text}></Text>

                    {allArrivals.length > 0 ? (
                        allArrivals.map((arrivalData, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.buddysStudents}
                                onPress={() =>
                                    handleArrivalBuddy(index, arrivalData.id)
                                }
                            >
                                <Text style={styles.text1}>
                                    Arrival ID: {arrivalData.id}
                                </Text>
                                <Text style={styles.text1}>
                                    Arrival Date: {arrivalData.arrivalDate}
                                </Text>
                                <Text style={styles.text1}>
                                    Group Full Names:{" "}
                                    {arrivalData.fullName.join(", ")}
                                </Text>
                                <Text style={styles.text1}>
                                    Group Countries:{" "}
                                    {arrivalData.group_countries}
                                </Text>
                                <Text style={styles.text1}>
                                    Buddies Amount: {arrivalData.countBuddy}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View>
                            <Text style={styles.studentName}>
                                {languageTranslate(
                                    userData.language,
                                    "No arrival",
                                    "Нет приездов"
                                )}
                            </Text>
                        </View>
                    )}
                </View>
                <Loader loading={loading} text="" />
            </ScrollView>
            <BuddysScreen navigation={navigation} />
        </SafeAreaView>
    );
};

const logArrivalData = (arrivalData) => {
    console.log("");
    console.log("Buddies:");
    arrivalData.buddies.forEach((buddy, index) => {
        console.log(
            `[${index + 1}] Full Name: ${buddy.full_name}, Photo: ${
                buddy.photo
            }`
        );
    });

    console.log("");

    console.log("Students:");
    arrivalData.students.forEach((student, index) => {
        console.log(`[${index + 1}] Full Name: ${student.full_name}`);
        console.log(`    Arrival Date: ${student.arrival_date}`);
        console.log(`    Arrival Point: ${student.arrival_point}`);
        console.log(`    Arrival Time: ${student.arrival_time}`);
        console.log(`    Citizenship: ${student.citizenship}`);
        console.log(`    Comment: ${student.comment}`);
        console.log(`    Flight Number: ${student.flight_number}`);
        console.log(`    Phone: ${student.phone}`);
        console.log(`    Sex: ${student.sex}`);
        console.log(`    Telegram: ${student.telegram}`);
        console.log(`    Tickets: ${student.tickets}`);
        console.log(`    VK: ${student.vk}`);
        console.log("\n");
    });
};

export default AllArrivalsScreen;
