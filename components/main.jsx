import { StyleSheet, StatusBar } from "react-native";
import * as Font from "expo-font";

// const fonts = () =>
//     Font.loadAsync({
//         "proxima-nova": require("../assets/fonts/proximanova_black.ttf"),
//     });

// loadFonts().then(() => {
//     styles.main.fontFamily = "proxima-nova";
// });

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",

        // fontFamily: "proxima-nova",
    },

    form: {
        display: "flex",
        flex: 1,
        // width: "100%",
        margin: "0%",
        marginTop: "0%",
        padding: "7%",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
        justifyContent: "space-between",

        marginBottom: 60,
    },

    textInputs: {
        flex: 1,
        width: "100%",
        padding: "5%",
        borderRadius: 40,
        justifyContent: "start",
    },

    toDoList: {
        backgroundColor: "rgba(245, 245, 245, 1)",
        padding: "10%",
        margin: "2%",
        borderRadius: 30,
    },

    progress: {
        marginTop: "0%",
        paddingBottom: "3%",
        fontSize: 20,
    },

    taskItem: {
        padding: "5%",
        marginTop: "5%",
        backgroundColor: "rgba(235, 235, 235, 1)",
        padding: "10%",
        borderRadius: 20,
    },

    deadline: {
        color: "black",
    },

    textBlock: {
        width: "65%",
    },

    textHeader: {
        marginTop: "0%",
        paddingBottom: "5%",
        fontSize: 20,
        fontWeight: "600",

        textAlign: "center",
    },

    text: {
        width: "100%",
    },

    text1: {
        padding: "1%",
        width: "100%",
    },

    textInput: {
        width: "100%",
        padding: "4%",
        marginTop: "0%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "grey",
    },

    picker: {
        width: "100%",
        padding: "5%",
        marginTop: "0%",
        borderWidth: 1,
        borderRadius: 40,
        borderColor: "grey",
    },

    inputHeader: {
        marginTop: "10%",
        textAlign: "left",
        marginLeft: "5%",
        marginBottom: "1%",
    },

    unCorrectTextInput: {
        width: "100%",
        padding: "5%",
        marginTop: "0%",
        borderWidth: 1,
        borderRadius: 40,
        borderColor: "red",
    },

    buttons: {
        flex: 1,
        marginTop: "10%",
    },

    button: {
        padding: "5%",
        margin: "2%",
        alignItems: "center",
        backgroundColor: "rgb(240, 240, 240)",
        color: "grey",
        borderRadius: 40,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    img: {
        marginBottom: "100%",
        flex: 1,
        alignItems: "center",
        borderRadius: 30,
        width: "100%",
        height: "100%",
        backgroundColor: "plum",
    },

    buddysStudents: {
        backgroundColor: "white",
        padding: "8%",
        marginBottom: "5%",
        borderRadius: 30,
        width: "100%",
        borderRadius: 40,

        shadowColor: "grey",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
    },

    buddysStudent: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "silver",
        padding: "5%",
        marginBottom: "5%",
        borderRadius: 30,
        width: "100%",
        borderRadius: 30,
    },
});
