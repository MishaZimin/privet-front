import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BackButtonMsg = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.back}>🔙</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        alignItems: 'left',
        // width: '95%',
    },
    back: {

        paddingRight: '3%',
        color: 'white',
        fontSize: 22,
    }
});

export default BackButtonMsg;