//2.2.2. Приветственный экран

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';



const LoadingScreen = ({ navigation }) => {
    const handleLoading = () => {
        navigation.navigate('LanguageSelectionScreen');
    };

    setTimeout(() => {
        navigation.navigate('LanguageSelectionScreen');
    }, 3000);

    return (
        <View style={styles.main}>
            <View style={styles.loading}>
                <Text style={styles.text}>Loading...</Text>
                {/* <Image
                    style={styles.img}
                    source={require('./img/d29e31c59a395ddf644fea8cc04fb79b.jpg')} /> */}
                {/* <TouchableOpacity
                    style={styles.next}
                    title="2-3 sec"
                    onPress={handleLoading}
                >
                    <Text>skip</Text>
                </TouchableOpacity> */}
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
    loading: {
        flex: 1,
        width: '80%',
        margin: '10%',
        padding: '10%',

        alignItems: 'center',

        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderRadius: 40,
    },

    img: {
        marginBottom: '100%',
        flex: 4,
        alignItems: 'center',
        borderRadius: 40,
        width: '100%',
        height: '100%',

    },

    text: {
        flex: 1,
        alignItems: 'center',
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

export default LoadingScreen;
