//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StudentsScreen = ({ navigation }) => {
    const handleToDoList = () => {
        // Перейти к экрану регистрации
        // navigation.navigate('RegistrationForm');
    };

    return (
        <View style={styles.main}>
            <Text>2.3. Экраны и функционал для Иностранного Студента (ИС)</Text>
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

export default StudentsScreen;
