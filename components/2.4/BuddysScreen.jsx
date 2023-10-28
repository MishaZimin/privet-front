//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BuddysScreen = ({ navigation }) => {
    const handleBuddys = () => {
        // Перейти к экрану регистрации
        // navigation.navigate('RegistrationForm');
    };

    return (
        <View style={styles.main}>
            <Text>
                2.4. Экраны и функционал для Сопровождающего (Сопровождающего, Бадди)
            </Text>
        </View>
    );
};

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
    },
});

export default BuddysScreen;
