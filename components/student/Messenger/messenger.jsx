//2.2.3. Регистрация Сопровождающего


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    messengerArr,
    userData,
    timliderMessengerArr
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';
import BackButton from '../../back-button.jsx';

const MessengerScreen = ({ navigation }) => {

    const handleChat = (index) => {
        navigation.navigate('ChatScreen', { index });
    };

    const handleSupport = () => {
        console.log('go to support');
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>Messenger</Text>
                    </View>
                    {messengerArr.length > 0 ? messengerArr.map((arrival, index) => (
                        <TouchableOpacity style={[styles.buddysStudents, stylesMessenger.header]} key={index} onPress={() => handleChat(index)}>
                            <Image source={{ uri: messengerArr[index].photo }} style={stylesMessenger.avatar} />
                            <View>
                                <Text style={stylesMessenger.username}>{messengerArr[index].fullName}</Text>
                                {messengerArr[index].messages.length > 0
                                    ? <Text style={
                                        [styles.text1, stylesMessenger.lastMessage]}>
                                        {messengerArr[index].messages[messengerArr[index].messages.length - 1].text.slice(0, 25)}
                                    </Text>
                                    : null}
                            </View>
                        </TouchableOpacity>
                    )) :
                        <View>
                            <Text style={styles.studentName}>
                                {languageTranslate(
                                    userData.language,
                                    'You have no arrival',
                                    'У вас нет приездов')}
                            </Text>
                        </View>
                    }
                    {/* <TouchableOpacity
                        style={styles.button}
                        title="Support"
                        onPress={handleSupport}>
                        <Text style={styles.textButton}>
                            {languageTranslate(userData.language, 'Support', 'Поддержка')}

                        </Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const stylesMessenger = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,

    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    lastMessage: {
        color: 'grey',
        fontSize: 13,
    },
    username: {
        fontSize: 16,

    },


});

export default MessengerScreen;
