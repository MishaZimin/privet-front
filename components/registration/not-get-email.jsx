import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

const NotGetEmail = ({ isVisible, setVisible }) => {
    return isVisible ? (
        <View>
            <Text>Не получили письмо?</Text>
            <Button title="Отправить код еще раз" onPress={sendCodeAgain} />
            <Button title="Связаться с поддержкой" onPress={contactSupport} />
            <Button title="Закрыть" onPress={() => setVisible(false)} />
        </View>
    ) : null;
};