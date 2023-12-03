

import React, { Component, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    initialInfo,
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';
import BackButton from '../../back-button.jsx';


const InfoScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState(initialInfo);


    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <BackButton />
                <Text style={styles.textHeader}>2.3.4. Информационный справочник</Text>
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                        // <TouchableOpacity onPress={() => toggleTask(item.id)}>
                        <TouchableOpacity style={styles.form}>
                            <Text>
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />

            </View>
        </SafeAreaView>
    );
}

export default InfoScreen;

