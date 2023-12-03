//2.2.1. Выбор языка

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from '../../Utils.jsx';
import { styles } from '../../main.jsx';
import BackButton from '../../back-button.jsx';



const ChangeLanguageScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(userData.language);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        console.log('--------------------');
        console.log(language);
        userData.language = language;

    };
    console.log('=====', userData);
    const handleContinue = () => {
        console.log('selctor language:', userData.language);

        //проверка на IS/Buddy
        if (userData.user == 1) {
            navigation.navigate('LoadingSettingISScreen');
        }
        else {
            navigation.navigate('LoadingSettingBuddyScreen');
        }
    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <Text style={styles.textHeader}>
                        {languageTranslate(
                            userData.language,
                            'Chainge Language',
                            'Сменить язык')}
                    </Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[languageStyles.button, selectedLanguage === 'ru' ? languageStyles.selectedButton : {}]}
                            onPress={() => handleLanguageChange('ru')}>
                            <Text style={styles.buttonText}>Русский</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[languageStyles.button, selectedLanguage === 'en' ? languageStyles.selectedButton : {}]}
                            onPress={() => handleLanguageChange('en')}>
                            <Text style={languageStyles.buttonText}>English</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleContinue}>
                        <Text style={languageStyles.buttonText}>
                            {languageTranslate(
                                userData.language,
                                'Next',
                                'Далее')}</Text>
                    </TouchableOpacity>
                </View>
            </View></SafeAreaView>
    );
};

export const languageStyles = StyleSheet.create({

    buttons: {
        flex: 2,

    },
    button: {
        padding: '5%',
        alignItems: 'center',
    },
    buttonText: {},

    selectedButton: {
        padding: '5%',
        alignItems: 'center',

        backgroundColor: 'white',

        borderRadius: 40,

        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

});

export default ChangeLanguageScreen;
