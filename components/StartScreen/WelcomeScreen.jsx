//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const handleRegister = () => {
        navigation.navigate('RegistrationForm');
    };

    return (
        <View style={styles.main}>
            <View style={styles.hello}>
                <View style={styles.textBlock}>
                    <Text style={styles.text}>Privet</Text>

                </View>

                <Image
                    style={styles.img}
                    source={require('./img/d29e31c59a395ddf644fea8cc04fb79b.jpg')} />
                <TouchableOpacity
                    style={styles.next}
                    title="2-3 sec"
                    onPress={handleRegister}>
                    <Text>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',

    },
    hello: {
        flex: 1,
        width: '80%',
        margin: '10%',
        padding: '10%',

        alignItems: 'center',

        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderRadius: 40,
    },

    textBlock: {
        flex: 1,
        alignItems: 'center',
    },

    img: {
        marginBottom: '100%',
        flex: 4,
        alignItems: 'center',
        borderRadius: 30,
        width: '100%',
        height: '100%',

    },

    text: {
        color: 'black',
    },

    button: {
        backgroundColor: 'white',
        padding: '10%',
        color: 'black',

    },

    next: {
        padding: '5%',
        margin: '2%',

        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 40,
    },
});

export default WelcomeScreen;
