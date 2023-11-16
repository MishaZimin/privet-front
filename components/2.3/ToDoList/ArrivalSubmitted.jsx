//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
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
        navigation.navigate('StudentsScreen');
    };

    return (
        <ScrollView style={styles.main}>
            <View style={styles.form}>
                <View style={styles.textBlock}>
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Arrival Submitted',
                            'Приезд зарегистрирован')}</Text>

                </View>
                {/* <View style={styles.textBlock}> */}
                <Text style={styles.text}>
                    {languageTranslate(
                        userData.language,
                        'Your arrival has been conveyed to your accompanying organization, thank you!',
                        'Ваш приезд был передан вашей сопровождающей организации, спасибо!')}

                </Text>
                <Text style={styles.text}>
                    {languageTranslate(
                        userData.language,
                        '',
                        '')}

                </Text>
                <Text style={styles.text}>
                    {languageTranslate(
                        userData.language,
                        'Arrival information will be displayed in the "Task List" section',
                        'Информациия о приезде будет отображаться в разделе "Список задач"')}

                </Text>
                <Text style={styles.text}>
                    {languageTranslate(
                        userData.language,
                        '',
                        '')}

                </Text>
                <Text style={styles.text}>
                    {languageTranslate(
                        userData.language,
                        'You can also tell us additional information about you in your profile',
                        'Вы также можете сообщить нам дополнительную информацию о вас в вашем профиле')}

                </Text>

                {/* </View> */}
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        title=""
                        onPress={handleProfile}>

                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Provide additional information',
                                'Указать дополнительную информацию')}

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title="2-3 sec"
                        onPress={handleToDoList}>

                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Go to Student Screen',
                                'Перейти на главную')}

                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

export default ArrivalSubmitted;
