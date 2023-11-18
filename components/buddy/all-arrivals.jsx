
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
} from '../utils.jsx';
import { styles } from '../main.jsx';

const AllArrivalsScreen = ({ navigation }) => {
    const [university, setName] = useState('');

    const handleArrivalBuddy = () => {
        navigation.navigate('ArrivalBuddy');
    };

    const handleMyArrivals = () => {
        navigation.navigate('MyArrivals');


    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>AllArrivalsScreen</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleMyArrivals}>
                    <Text style={styles.textButton}>
                        {languageTranslate(
                            userData.language,
                            'My Arrivals',
                            'Мои приезды')}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.text}></Text>

                {arrivalBookData !== '' && (
                    <TouchableOpacity style={styles.buddysStudents} onPress={handleArrivalBuddy}>
                        <Text style={styles.text1}>Arrival ID: {arrivalBookData.id}</Text>
                        <Text style={styles.text1}>Arrival Date: {arrivalBookData.arrivalDate}</Text>
                        <Text style={styles.text1}>Group Full Names: {arrivalBookData.fullName}</Text>
                        <Text style={styles.text1}>Group Countries: {arrivalBookData.citizenship}</Text>
                        <Text style={styles.text1}>Buddies Amount: 0/1</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

export default AllArrivalsScreen;
