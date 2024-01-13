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
    // const allArrivals = route.params.responseAllArrivals;

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
                    {/* <BackButton /> */}
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
                        style={allArivals.button}
                        onPress={handleMyArrivals}
                    >
                        <Text style={allArivals.textButton}>
                            {languageTranslate(
                                userData.language,
                                "My Arrivals",
                                "Мои приезды"
                            )}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.text}></Text>
                    {/* <View style={styles.profileForm}> */}
                    {allArrivals.length > 0 ? (
                        allArrivals.map((arrivalData, index) => (
                            <TouchableOpacity
                                key={index}
                                style={allArivals.arrivals}
                                onPress={() =>
                                    handleArrivalBuddy(index, arrivalData.id)
                                }
                            >
                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival ID: ",
                                        "ID приезда: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.id}
                                </Text>

                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival Date: ",
                                        "Дата приезда: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.arrivalDate}
                                </Text>

                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Group Full Names: ",
                                        "Полные имена группы: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.fullName.join(", ")}
                                </Text>

                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Group Countries: ",
                                        "Страны группы: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.group_countries.join(", ")}
                                </Text>

                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Buddies Amount: ",
                                        "Количество сопровождающих: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.countBuddy}
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
                    {/* </View> */}
                </View>
                <Loader loading={loading} text="" />
            </ScrollView>
            <BuddysScreen navigation={navigation} />
        </SafeAreaView>
    );
};

export const allArivals = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
    },
    form: {
        flex: 1,
        gap: 0,
        backgroundColor: "white",
    },

    textInputs: {
        flex: 1,
        width: "100%",
        padding: "5%",
        borderRadius: 40,
        justifyContent: "start",
    },

    toDoList: {
        backgroundColor: "rgba(245, 245, 245, 1)",
        padding: "10%",
        margin: "2%",
        borderRadius: 30,
    },

    progress: {
        marginTop: "0%",
        paddingBottom: "3%",
        fontSize: 20,
    },

    taskItem: {
        padding: "5%",
        marginTop: "5%",
        backgroundColor: "rgba(235, 235, 235, 1)",
        padding: "10%",
        borderRadius: 20,
    },

    deadline: {
        color: "red",
    },

    textBlock: {
        width: "65%",
    },

    textHeader: {
        marginTop: "0%",
        paddingBottom: "5%",
        fontSize: 20,
        fontWeight: "600",

        textAlign: "center",
    },

    text: {
        width: "100%",
    },

    text1: {
        padding: "1%",
        width: "100%",
    },
    text2: {
        padding: "1%",
        width: "100%",
        fontWeight: "700",
    },

    textInput: {
        width: "100%",
        padding: "4%",
        marginTop: "0%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
    },

    picker: {
        width: "100%",
        padding: "5%",
        marginTop: "0%",
        borderWidth: 1,
        borderRadius: 40,
        borderColor: "grey",
    },

    inputHeader: {
        marginTop: "10%",
        textAlign: "left",
        marginLeft: "5%",
        marginBottom: "1%",
    },

    unCorrectTextInput: {
        width: "100%",
        padding: "5%",
        marginTop: "0%",
        borderWidth: 1,
        borderRadius: 40,
        borderColor: "red",
    },

    buttons: {
        flex: 1,
        marginTop: "10%",
    },

    button: {
        padding: "5%",
        margin: "2%",
        alignItems: "center",
        backgroundColor: "white",
        color: "grey",
        borderRadius: 40,
        shadowColor: "grey",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },

    textButton: {
        fontWeight: "600",
    },

    img: {
        marginBottom: "100%",
        flex: 1,
        alignItems: "center",
        borderRadius: 30,
        width: "100%",
        height: "100%",
        backgroundColor: "plum",
    },

    arrivals: {
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
        backgroundColor: "rgba(221, 220, 220, 0.8)",
        padding: "10%",
        marginBottom: "5%",
        borderRadius: 30,
        width: "100%",
        borderRadius: 30,
    },

    profileForm: {
        flex: 2,
        width: "90%",
        marginLeft: "5%",
        paddingTop: 0,
        backgroundColor: "white",

        borderRadius: 30,

        shadowColor: "grey",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
    },

    arrival: {
        padding: "10%",
        marginBottom: "5%",
        borderRadius: 30,
        width: "100%",
        borderRadius: 30,
    },
});

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
