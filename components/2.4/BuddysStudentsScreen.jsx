
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
} from '../Utils.jsx';
import { styles } from '../main.jsx';

const BuddysStudentsScreen = ({ navigation }) => {
    const [university, setName] = useState('');

    const handleStudentProfile = () => {
        navigation.navigate('StudentProfileForBuddy');

    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>BuddysStudentsScreen</Text>
                </View>

                {/* {buddysStudents.map((name, index) => (
                    <View style={styles.buddysStudents}>
                        <Text key={index} style={styles.studentName}>{name}</Text>
                    </View>
                ))} */}

                {buddysStudents.map((student, index) => (
                    <TouchableOpacity style={styles.buddysStudents} onPress={handleStudentProfile}>
                        <View key={index}>
                            <Text style={styles.studentName}>Arrival ID: {student.arrivalID}</Text>
                            <Text style={styles.studentAge}>Photo: {student.photo}</Text>
                            <Text style={styles.studentName}>Student Full Name: {student.studentFullName}</Text>
                            <Text style={styles.studentAge}>Studen Cizenship: {student.studenCizenship}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </ScrollView>
    );
};

export default BuddysStudentsScreen;
