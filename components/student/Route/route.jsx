import React, { Component, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    initialTasksData,
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';
import BackButton from '../../back-button.jsx';


const RouteScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState(initialTasksData);


    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <BackButton />
                {/* <View style={styles.form}> */}
                <Text style={styles.textHeader}>2.3.3. Маршрут</Text>
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
                {/* </View> */}
            </View></SafeAreaView>
    );
}

export default RouteScreen;
