import React, { Component, useState } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    LogInData,
    registrationData,
    languageTranslate,
    getJSONFromServer,
    sendJSONToServer,
    initialTasksData,
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import BackButton from "../../back-button.jsx";
import StudentsScreen from "../student.jsx";
import { form } from "../../registration/registration-IS.jsx";

const RouteScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState(initialTasksData);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handlePress = (itemId) => {
        setSelectedItemId(itemId === selectedItemId ? null : itemId);
    };
    return (
        <SafeAreaView style={form.main}>
            <View style={form.main}>
                {/* <BackButton /> */}
                {/* <View style={styles.form}> */}
                <View style={{ paddingBottom: 160 }}>
                    <View style={form.textBlock}>
                        <Text style={[form.textHeader, { marginBottom: -90 }]}>
                            Маршрут
                        </Text>
                    </View>
                    <FlatList
                        style={route.flat}
                        data={tasks}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    route.form,
                                    {
                                        backgroundColor:
                                            selectedItemId === item.id
                                                ? "white"
                                                : "white",
                                    },
                                ]}
                                onPress={() => handlePress(item.id)}
                            >
                                <Text>
                                    {item.id}. {item.text}
                                </Text>
                                {selectedItemId === item.id && (
                                    <Text
                                        style={{
                                            marginTop: 10,
                                            color: "black",
                                            paddingHorizontal: "4%",
                                            paddingBottom: "4%",
                                            fontSize: 14,
                                        }}
                                    >
                                        📍**Адрес**: площадь Бахчиванджи, 1
                                        🎯**Цель**: встретить иностранного
                                        студента в аэропорту ### ☝️**Сделать
                                        заранее**: 1️⃣ Заранее рассчитайте время
                                        прибытия в аэропорт, чтобы не опоздать.
                                        2️⃣ Заранее узнайте, как выглядит ваш
                                        иностранный студент, или сообщите ему о
                                        том, как выглядите вы, чтобы найти друг
                                        друга в аэропорту. 3️⃣ Перед отправкой в
                                        аэропорт проверьте, не задержан или не
                                        отменен ли рейс вашего иностранного
                                        студента. Сделать это можно на сайте
                                        [**Онлайн-табло
                                        Кольцово**](https://svx.aero/board/).
                                        Из-за разных обстоятельств рейс может
                                        быть задержан или отменен. Если рейс
                                        задержан, выезжайте к новому времени
                                        прибытия рейса. Если рейс отменен,
                                        уточните у вашего иностранного студента
                                        новое время его прибытия.
                                    </Text>
                                )}
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </View>
            <StudentsScreen navigation={navigation} />
        </SafeAreaView>
    );
};

export const route = StyleSheet.create({
    flat: {
        paddingTop: 0,
    },
    form: {
        width: "90%",
        marginLeft: "5%",
        marginBottom: "2%",
        padding: "4%",
        // padding: "7%",
        alignItems: "left",
        backgroundColor: "white",
        borderRadius: 30,

        shadowColor: "grey",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
});

export default RouteScreen;
