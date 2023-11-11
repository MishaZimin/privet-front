//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../main.jsx';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from '../../Utils.jsx';


const ArrivalSubmitted = ({ navigation }) => {
    const handleProfile = () => {
        navigation.navigate('StudentProfileScreen');
    };

    const handleToDoList = () => {
        navigation.navigate('ToDoListScreen');
    };

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>Arrival Submitted</Text>

                </View>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>Ваш приезд был передан вашей сопровождающей организации, спасибо!</Text>
                    <Text style={styles.textHeader}>Информациия о приезде будет отображаться в разделе "Список задач"</Text>
                    <Text style={styles.textHeader}>"Вы также можете сообщить нам дополнительную информацию о вас в вашем профиле"</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    title=""
                    onPress={handleProfile}>

                    <Text style={styles.textButton}>
                        Указать дополнительную информацию
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    title="2-3 sec"
                    onPress={handleToDoList}>

                    <Text style={styles.textButton}>
                        Перейти к списку задач
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ArrivalSubmitted;
