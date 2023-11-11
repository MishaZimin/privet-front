import React, { Component, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    initialTasksData,
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';


const RouteScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState(initialTasksData);


    return (
        <View style={styles.main}>
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
        </View>
    );
}

export default RouteScreen;
