import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)',
    },

    form: {
        display: 'flex',
        flex: 1,
        width: '90%',
        margin: '5%',
        padding: '7%',

        alignItems: 'center',

        backgroundColor: 'rgba(235, 235, 235, 1)',
        borderRadius: 30,
        justifyContent: 'space-between',

        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },

    textInputs: {
        flex: 1,
        width: '100%',
        padding: '10%',

        alignItems: 'center',
        borderRadius: 40,

        justifyContent: 'start',
    },

    toDoList: {
        backgroundColor: 'rgba(225, 225, 225, 1)',
        padding: '10%',

        borderRadius: 30,
    },

    progress: {
        marginTop: '10%',
        paddingBottom: '10%',
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
        paddingBottom: '10%',
        fontSize: 20,
    },

    text: {
        width: '100%',
    },

    textInput: {
        width: '100%',
        padding: '5%',
        marginTop: '10%',

        borderWidth: 1,
        borderRadius: 40,

        borderColor: 'grey',
    },

    unCorrectTextInput: {
        width: '100%',
        padding: '5%',
        marginTop: '10%',

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

        backgroundColor: 'white',
        borderRadius: 40,

        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    img: {
        marginBottom: '100%',
        flex: 4,
        alignItems: 'center',
        borderRadius: 30,
        width: '100%',
        height: '100%',
    },
});