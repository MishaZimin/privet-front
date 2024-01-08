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

const MyArrivals = ({ navigation, route }) => {
    const meArrivals = route.params.responseMeArrivals;
    console.log(meArrivals);
    const [university, setName] = useState("");

    const handleMyArrivalStudent = () => {
        // navigation.navigate("StudentProfileForBuddy");
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>My Arrivals</Text>
                    </View>
                    {meArrivals.length > 0 ? (
                        meArrivals.map((arrivalData, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.buddysStudents}
                                onPress={() =>
                                    handleMyArrivalStudent(
                                        index,
                                        arrivalData.id
                                    )
                                }
                            >
                                <Text style={styles.text1}>
                                    Arrival ID: {arrivalData.arrival_id}
                                </Text>
                                <Text style={styles.text1}>
                                    Arrival Date:{" "}
                                    {arrivalData.arrival_date.slice(0, 10)}
                                </Text>
                                <Text style={styles.text1}>
                                    Group Full Names:{" "}
                                    {arrivalData.group_full_names.join(", ")}
                                </Text>
                                <Text style={styles.text1}>
                                    Group Countries:{" "}
                                    {arrivalData.group_countries.join(", ")}
                                </Text>
                                <Text style={styles.text1}>
                                    Buddies Amount: {arrivalData.buddies_amount}
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

export default MyArrivals;
