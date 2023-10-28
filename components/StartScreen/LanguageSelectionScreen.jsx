//2.2.1. Выбор языка

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

var languageSelection = 'Русский';

const LanguageSelectionScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('Русский');


    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        console.log('--------------------');
        console.log(language);
        languageSelection = language;
    };

    const handleContinue = () => {
        console.log('selctor:', languageSelection);

        navigation.navigate('WelcomeScreen');
    };

    return (
        <View style={styles.main}>
            <View style={styles.language}>
                <Text style={styles.text}>Выберите язык приложения:</Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.button, selectedLanguage === 'Русский' ? styles.selectedButton : {}]}
                        onPress={() => handleLanguageChange('Русский')}>
                        <Text style={styles.buttonText}>Русский</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedLanguage === 'English' ? styles.selectedButton : {}]}
                        onPress={() => handleLanguageChange('English')}>
                        <Text style={styles.buttonText}>English</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.next}
                    onPress={handleContinue}>
                    <Text style={styles.buttonText}>Далее</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    buttons: {
        flex: 2,

    },
    button: {
        padding: '5%',
        alignItems: 'center',

    },
    buttonText: {},

    language: {
        flex: 1,
        width: '80%',
        margin: '10%',
        padding: '10%',

        alignItems: 'center',

        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderRadius: 40,
    },

    text: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 40,
    },

    selectedButton: {
        padding: '5%',
        alignItems: 'center',

        backgroundColor: 'white',

        borderRadius: 40,
    },

    next: {
        padding: '5%',
        margin: '2%',

        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 40,
    },
});

export default LanguageSelectionScreen;
