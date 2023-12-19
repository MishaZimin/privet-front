import { StyleSheet, StatusBar } from 'react-native';



export const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: 'white',
    },

    form: {
        display: 'flex',
        flex: 1,
        width: '90%',
        margin: '5%',
        marginTop: '0%',
        padding: '7%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'space-between',
    },

    textInputs: {
        flex: 1,
        width: '100%',
        padding: '5%',
        borderRadius: 40,
        justifyContent: 'start',
    },

    // loading: {
    //     display: 'flex',
    //     flex: 1,
    //     width: '90%',
    //     margin: '5%',
    //     marginTop: '0%',
    //     padding: '7%',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(235, 235, 235, 1)',
    //     borderRadius: 30,
    //     justifyContent: 'center',
    // },

    toDoList: {
        backgroundColor: 'rgba(225, 225, 225, 1)',
        padding: '10%',
        marginBottom: '10%',
        borderRadius: 30,
    },

    progress: {
        marginTop: '5%',
        paddingBottom: '3%',
        fontSize: 20,
    },

    taskItem: {
        padding: '5%',
        marginTop: '5%',
        backgroundColor: 'rgba(235, 235, 235, 1)',
        padding: '10%',
        borderRadius: 20,
    },

    deadline: {
        color: 'red',
    },

    textHeader: {
        marginTop: '5%',
        paddingBottom: '15%',
        fontSize: 20,
    },

    text: {
        width: '100%',
    },

    text1: {
        padding: '1%',
        width: '100%',
    },

    textInput: {
        width: '100%',
        padding: '5%',
        marginTop: '0%',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'grey',
    },

    picker: {
        width: '100%',
        padding: '5%',
        marginTop: '0%',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'grey',
    },

    inputHeader: {
        marginTop: '10%',
        textAlign: 'left',
        marginLeft: '5%',
        marginBottom: '1%',
    },

    unCorrectTextInput: {
        width: '100%',
        padding: '5%',
        marginTop: '0%',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'red',
    },

    buttons: {
        flex: 1,
        marginTop: '10%',
    },

    button: {
        padding: '5%',
        margin: '2%',
        alignItems: 'center',
        backgroundColor: 'rgb(240, 240, 240)',
        color: 'grey',
        borderRadius: 40,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    img: {
        marginBottom: '100%',
        flex: 1,
        alignItems: 'center',
        borderRadius: 30,
        width: '100%',
        height: '100%',
        backgroundColor: 'plum',
    },

    buddysStudents: {
        backgroundColor: 'rgba(220, 220, 220, 0.8)',
        padding: '10%',
        marginBottom: '5%',
        borderRadius: 30,
        width: '100%',
        borderRadius: 40,
    }
});