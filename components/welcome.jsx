//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from './main.jsx';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    userData,
} from './Utils.jsx';
import BackButton from './back-button.jsx';


const WelcomeScreen = ({ navigation }) => {
    const handleRegister = () => {
        navigation.navigate('RegistrationISScreen');
    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.main}>
                <View style={styles.form}>
                    <BackButton />
                    <View style={styles.textBlock}>
                        <Text style={styles.textHeader}>Privet👋</Text>
                    </View>

                    {/* <Image
                    style={styles.img}
                    source={require('./img/d29e31c59a395ddf644fea8cc04fb79b.jpg')} /> */}
                    <TouchableOpacity
                        style={styles.button}
                        title="2-3 sec"
                        onPress={handleRegister}>

                        <Text style={styles.textButton}>
                            {languageTranslate(
                                userData.language,
                                'Sign Up',
                                'Зарегистрироваться')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;