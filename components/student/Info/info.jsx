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
    initialInfo,
} from "../../Utils.jsx";
import { styles } from "../../main.jsx";
import BackButton from "../../back-button.jsx";
import StudentsScreen from "../student.jsx";
import { form } from "../../registration/registration-IS.jsx";

const InfoScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState(initialInfo);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handlePress = (itemId) => {
        setSelectedItemId(itemId === selectedItemId ? null : itemId);
    };
    return (
        <SafeAreaView style={form.main}>
            <View style={form.main}>
                <View style={form.form}>
                    {/* <BackButton /> */}
                    <View style={form.textBlock}>
                        <Text style={[form.textHeader, { marginBottom: -90 }]}>
                            Информационный справочник
                        </Text>
                    </View>
                    <FlatList
                        style={info.flat}
                        data={tasks}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    info.form,
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
                                        📍Адреса общежитий УрФУ: {"\n"}
                                        1️⃣общежитие – ул. Большакова, 79, {"\n"}
                                        📞: +7 (343) 257-33-95
                                        {"\n"}
                                        2️⃣общежитие – ул. Большакова, 77,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 257-92-79{"\n"}
                                        3️⃣общежитие – ул. Малышева, 140,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 375-47-10{"\n"}
                                        4️⃣общежитие – ул. Большакова, 71,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 257-25-53{"\n"}
                                        5️⃣общежитие – ул. Малышева, 144,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 375-45-46{"\n"}
                                        6️⃣общежитие – ул. Чапаева, 16а,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 257-01-61{"\n"}
                                        7️⃣общежитие – ул. Коминтерна, 3,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 375-45-42{"\n"}
                                        8️⃣общежитие – ул. Комсомольская, 70,
                                        {"\n"} 📞: +7 (343) 375-48-67{"\n"}
                                        9️⃣общежитие – ул. Фонвизина, 8,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 375-44-05{"\n"}
                                        🔟общежитие – ул. Ленина, 66,{"\n"} 📞:
                                        +7 (343) 375-45-61{"\n"}
                                        1️⃣1️⃣общежитие – ул. Коминтерна, 5,{
                                            "\n"
                                        }{" "}
                                        📞: +7 (343) 375-44-92{"\n"}
                                        1️⃣2️⃣общежитие – ул. Большакова, 79,
                                        {"\n"} 📞: +7 (343) 375-46-60{"\n"}
                                        1️⃣3️⃣общежитие – ул. Комсомольская, 66а,
                                        {"\n"}
                                        📞: +7 (343) 375-47-97{"\n"}
                                        1️⃣4️⃣общежитие – ул. Коминтерна, 1а,
                                        {"\n"} 📞: +7 (343) 375-45-36{"\n"}
                                        1️⃣5️⃣общежитие – ул. Коминтерна, 11,
                                        {"\n"} 📞: +7 (343) 375-47-19{"\n"}
                                        1️⃣6️⃣общежитие – ул. Малышева, 127а,
                                        {"\n"} 📞: +7 (343) 375-47-50{"\n"}
                                        НВК 1 общежитие – ул. 100-летия
                                        Уральского университета, 6{"\n"}
                                        НВК 2 общежитие – ул. 100-летия
                                        {"\n"}
                                        {"\n"}
                                        📜Правила проживания в общежитии
                                        {"\n"}
                                        Общежития открыты для студентов УрФУ с 6
                                        утра до 1 ночи (в случае позднего
                                        прибытия, пожалуйста, получите
                                        разрешение на вход от администрации
                                        общежития заранее).{"\n"}
                                        ☝️Жители общежития обязаны: {"\n"}-
                                        ❤️‍🩹Соблюдать правила и регламент кампуса,
                                        правила здоровья и безопасности, правила
                                        пожарной безопасности и санитарные нормы
                                        {"\n"}- 🫴Предотвратить любой ущерб или
                                        потерю имущества общежития; поддерживать
                                        комнаты и общие помещения чистыми и
                                        аккуратными{"\n"}- 🚿Эффективно
                                        использовать воду, электричество и газ
                                        {"\n"}- 🔇Предотвратить любой чрезмерный
                                        шум. Тишина должна строго соблюдаться с
                                        11 вечера до 7 утра{"\n"}-
                                        💲Компенсировать любое отсутствующее или
                                        поврежденное имущество при выезде из
                                        общежития{"\n"}
                                        Не разрешается: -{"\n"}- 💼Использование
                                        комнат, общественных пространств или
                                        общих зон для проведения любой
                                        коммерческой или деловой деятельности
                                        {"\n"}- 💰Обмен, сдача в аренду или
                                        продажа имущества общежития{"\n"}-
                                        🕯️Хранение и использование
                                        легковоспламеняющихся жидкостей{"\n"}-
                                        🔄Переход в другую комнату или общежитие
                                        без разрешения Международного офиса УрФУ
                                        {"\n"}- 🚬Курение{"\n"}- 🍺Употребление
                                        алкоголя или хранение/употребление любых
                                        наркотических веществ{"\n"}-
                                        🛏️Перемещение мебели/оборудования из
                                        одной комнаты в другую{"\n"}- 🏗️Любая
                                        реконструкция без надлежащего разрешения
                                        администрации общежития{"\n"} {"\n"}
                                        🏡 Вне кампуса Если вы предпочитаете
                                        жилье вне кампуса, проектный офис
                                        "Платное Жильё" Союза Студентов УрФУ
                                        может помочь с поиском частного жилья в
                                        соответствии с вашими требованиями и,
                                        при необходимости, может помочь найти
                                        соседа по комнате.{"\n"}
                                        Контакты проектного офиса “Платное
                                        Жильё”:{"\n"}
                                        👥группа VK: https://vk.com/rent_flats
                                        {"\n"}
                                        📍адрес: ул. Мира, д. 19, ГУК-309,{"\n"}
                                        📞тел.: +7 (999) 559-61-12
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

export const info = StyleSheet.create({
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

export default InfoScreen;
