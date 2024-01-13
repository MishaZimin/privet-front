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
    myArrivals,
} from "../Utils.jsx";
import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";
import { countriesPicker } from "../data-picker/citizenship.jsx";

const MyArrivals = ({ navigation, route }) => {
    const meArrivals = route.params.responseMeArrivals;
    console.log(meArrivals);

    const handleMyArrivalStudent = () => {
        // navigation.navigate("StudentProfileForBuddy");
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    {/* <BackButton /> */}
                    <View style={allArivals.textBlock}>
                        <Text style={allArivals.textHeader}>My Arrivals</Text>
                    </View>
                    {meArrivals.length > 0 ? (
                        meArrivals.map((arrivalData, index) => (
                            <TouchableOpacity
                                key={index}
                                style={allArivals.arrivals}
                                onPress={() =>
                                    handleMyArrivalStudent(
                                        index,
                                        arrivalData.id
                                    )
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
                                    {arrivalData.arrival_id}
                                </Text>

                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Arrival Date: ",
                                        "Дата прибытия: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.arrival_date.slice(0, 10)}
                                </Text>

                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Group Full Names: ",
                                        "Полные имена группы: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.group_full_names.join(", ")}
                                </Text>

                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Group Countries: ",
                                        "Страны группы: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {createCountriesArray(
                                        arrivalData.group_countries,
                                        countriesPicker
                                    ).join(", ")}
                                </Text>
                                <Text style={allArivals.text2}>
                                    {languageTranslate(
                                        userData.language,
                                        "Buddies Amount: ",
                                        "Количество сопровождающих: "
                                    )}
                                </Text>
                                <Text style={styles.text1}>
                                    {arrivalData.buddies_amount}
                                </Text>
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
                </View>
            </ScrollView>
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
        paddingBottom: "13%",
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
        backgroundColor: "rgb(240, 240, 240)",
        color: "grey",
        borderRadius: 40,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
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

const createCountriesArray = (groupCountriesKeys, countriesPicker) => {
    return groupCountriesKeys.map((key) => {
        const country = countriesPicker.find((country) => country.key === key);
        return country ? country.value : null;
    });
};

export default MyArrivals;
