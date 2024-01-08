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
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    buddysStudents,
    userData,
} from "../Utils.jsx";
import { styles } from "../main.jsx";
import BackButton from "../back-button.jsx";
import BuddysScreen from "./buddy.jsx";

const BuddysStudentsScreen = ({ navigation }) => {
    console.log("buddysStudents:", buddysStudents);

    const handleStudentProfile = (arrivalID) => {
        navigation.navigate("StudentProfileForBuddy", { arrivalID });
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
                                "Buddys Students ScreenBuddys Students Screen",
                                "Студенты Сопровождающего"
                            )}
                        </Text>
                    </View>

                    {buddysStudents.length > 0 ? (
                        buddysStudents.map((student, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.buddysStudents}
                                onPress={() =>
                                    handleStudentProfile(student.arrivalID)
                                }
                            >
                                <View>
                                    <Text style={styles.studentName}>
                                        Arrival ID: {student.arrivalID}
                                    </Text>
                                    <Text style={styles.studentAge}>
                                        Photo: {student.photo}
                                    </Text>
                                    <Text style={styles.studentName}>
                                        Student Full Name:{" "}
                                        {student.studentFullName}
                                    </Text>
                                    <Text style={styles.studentAge}>
                                        Student Citizenship:{" "}
                                        {student.studentCitizenship}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View>
                            <Text style={styles.studentName}>
                                {languageTranslate(
                                    userData.language,
                                    "You have no students",
                                    "У вас нет студентов"
                                )}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <BuddysScreen navigation={navigation} />
        </SafeAreaView>
    );
};

export default BuddysStudentsScreen;
