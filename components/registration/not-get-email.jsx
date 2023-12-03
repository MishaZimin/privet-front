import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../back-button.jsx';

const NotGetEmail = ({ isVisible, setVisible }) => {
    return isVisible ? (
        <View>
            <BackButton />
            <Text>Не получили письмо?</Text>
            <Button title="Отправить код еще раз" onPress={sendCodeAgain} />
            <Button title="Связаться с поддержкой" onPress={contactSupport} />
            <Button title="Закрыть" onPress={() => setVisible(false)} />
        </View>
    ) : null;
};