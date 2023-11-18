
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    buddysStudents
} from '../utils.jsx';
import { styles } from '../main.jsx';

const BuddysStudentsScreen = ({ navigation }) => {
    const [university, setName] = useState('');

    const handleStudentProfile = (arrivalID) => {
        navigation.navigate('StudentProfileForBuddy', { arrivalID });
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>BuddysStudentsScreen</Text>
                </View>

                {buddysStudents.map((student, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.buddysStudents}
                        onPress={() => handleStudentProfile(student.arrivalID)}
                    >
                        <View>
                            <Text style={styles.studentName}>Arrival ID: {student.arrivalID}</Text>
                            <Text style={styles.studentAge}>Photo: {student.photo}</Text>
                            <Text style={styles.studentName}>Student Full Name: {student.studentFullName}</Text>
                            <Text style={styles.studentAge}>Student Citizenship: {student.studenCizenship}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default BuddysStudentsScreen;
