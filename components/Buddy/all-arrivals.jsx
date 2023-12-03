
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
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
import BackButton from '../back-button.jsx';

const AllArrivalsScreen = ({ navigation }) => {
    console.log('allarrivalBookArr:', allarrivalBookArr);


    const handleArrivalBuddy = (index) => {
        console.log('------', index);
        navigation.navigate('ArrivalBuddy', index);
    };

    const handleMyArrivals = () => {
        navigation.navigate('MyArrivals');
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

                    {allarrivalBookArr.length > 0 ? allarrivalBookArr.length > 0 && allarrivalBookArr.map((arrivalData, index) => (
                        <TouchableOpacity key={index} style={styles.buddysStudents} onPress={() => handleArrivalBuddy(index)}>
                            <Text style={styles.text1}>Arrival ID: {arrivalData.id}</Text>
                            <Text style={styles.text1}>Arrival Date: {arrivalData.arrivalDate}</Text>
                            <Text style={styles.text1}>Group Full Names: {arrivalData.fullName}</Text>
                            <Text style={styles.text1}>Group Countries: {arrivalData.citizenship}</Text>
                            <Text style={styles.text1}>Buddies Amount: {arrivalData.countBuddy}/{arrivalData.maxBuddy}</Text>
                        </TouchableOpacity>
                    )) :
                        <View>
                            <Text style={styles.studentName}>
                                {languageTranslate(
                                    userData.language,
                                    'No arrival',
                                    'Нет приездов')}
                            </Text>

                        </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllArrivalsScreen;
