
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
    arrivalBookData,
    allarrivalBookArr,
    allArrivalBuddy,
} from '../Utils.jsx';
import { styles } from '../main.jsx';

const AllArrivalsScreen = ({ navigation }) => {


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
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'All Arrivals',
                            'Все приезды')}</Text>
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
                        <Text style={styles.text1}>Buddies Amount: {allArrivalBuddy.length}/{arrivalBookData.maxBuddy}</Text>
                    </TouchableOpacity>
                )}

                {allarrivalBookArr.length > 0 && allarrivalBookArr.map((arrivalData, index) => (
                    <TouchableOpacity key={index} style={styles.buddysStudents} onPress={() => handleArrivalBuddy(arrivalData)}>
                        <Text style={styles.text1}>Arrival ID: {arrivalData.id}</Text>
                        <Text style={styles.text1}>Arrival Date: {arrivalData.arrivalDate}</Text>
                        <Text style={styles.text1}>Group Full Names: {arrivalData.fullName}</Text>
                        <Text style={styles.text1}>Group Countries: {arrivalData.citizenship}</Text>
                        <Text style={styles.text1}>Buddies Amount: {arrivalData.countBuddy}/{arrivalData.maxBuddy}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default AllArrivalsScreen;
