// import { registerRootComponent } from 'expo';
import { SafeAreaView } from "react-native-safe-area-context";
export var userData = {
    language: "ru",
    access_token: "",
    id: "",
    photo: "",
    fullName: "",
    citizenship: "",
    city: "",
    sex: "",
    birthDate: "",
    phone: "",
    email: "",
    telegram: "",
    whatsApp: "",
    vk: "",
    nativeLanguage: "",
    otherLanguage: "",
    university: "",
    escortIsPaid: false,
    user: "",
    buddyStatus: "No",

    lastBuddy: "",
    institute: "",
    studyProgram: "",
    lastArrivalDate: "",
    lastVisaExpiration: "",
    accommodation: "",
    buddysComment: "",
};

export var arrivalBookData = {
    id: "",
    arrivalDate: "",
    flightNumber: "",
    arrivalPoint: "",
    comment: "",
    tickets: "",

    fullName: "",
    sex: null,
    arrivalTime: "",
    citizenship: "",
    phone: "",
    telegram: "",
    whatsApp: "",
    vk: "",

    countBuddy: 1,
    maxBuddy: 2,
};

export var arrivalBookDataArr = [];

export var allArrivalBuddy = [
    {
        photo: "",
        fullName: "buddy 1",
    },
];

export var StudentData = {
    language: "en",
    access_token: "",
    id: "",

    photo: "",
    university: "",
    city: "",
    fullName: "",
    birdthDate: "",
    phone: "",
    email: "",
    telegram: "",
    whatsApp: "",
    vk: "",
    nativeLanguage: "",
    otherLanguage: "",
    user: "",

    institute: "",
    studyProgram: "",
    lastArrivalExpiration: "",
    lastVisaExpiration: "",
    accommodation: "",
    buddysComment: "",
};

export var BuddyData = {
    language: "en",
    access_token: "",
    id: "",
    photo: "",
    fullName: "",
    citizenship: "",
    sex: "",
    birdthDate: "",
    phone: "",
    email: "",
    telegram: "",
    whatsApp: "",
    vk: "",
    nativeLanguage: "",
    otherLanguage: "",
    university: "",
    escortIsPaid: "",
    user: "",
    buddyStatus: "",
};

export var LogInData = {
    user: "",
    university: "",
    email: "",
    password: "",
};

export var registrationData = {
    user: "",
    language: "en",
    university: "",
    email: "",
    password: "",
    passwordConfirm: "",
    isNewPassword: false,
};

export var allArrivals = [];

export var myArrivals = [];

export var allarrivalBookArr = [
    {
        id: "123",
        arrivalDate: "01.01.2023",
        flightNumber: "11111",
        arrivalPoint: "2222",
        comment: "comment",
        tickets: "№4324",

        fullName: "name student 1",
        sex: 1,
        arrivalTime: "3:30 am",
        citizenship: "china",
        phone: "+786895489622",
        telegram: "@tg-student-1",
        whatsApp: "+786895489622",
        vk: "@vk-student-1",

        countBuddy: 0,
        maxBuddy: 1,

        buddy: [],
    },
    {
        id: "322",
        arrivalDate: "04.05.2023",
        flightNumber: "452343",
        arrivalPoint: "66554",
        comment: "comment",
        tickets: "№4321",

        fullName: "name student 2",
        sex: 2,
        arrivalTime: "7:40 am",
        citizenship: "usa",
        phone: "+77546676446",
        telegram: "@tg-student-2",
        whatsApp: "+775466764446",
        vk: "@vk-student-2",

        countBuddy: 0,
        maxBuddy: 2,

        buddy: [],
    },
];

export var messengerArr = [
    {
        photo: "https://github.com/Gernarav/PRIVET/raw/master/img.png",
        fullName: "support ",
        lastMessage: "",
        messages: [],
    },
    {
        photo: "https://krasivosti.pro/uploads/posts/2021-08/1630005282_18-krasivosti-pro-p-kapibara-smeshnaya-zhivotnie-krasivo-foto-18.jpg",
        fullName: "student 0",
        lastMessage: "",
        messages: [],
    },
    {
        photo: "https://gagaru.club/uploads/posts/2023-06/1686243330_gagaru-club-p-kapibara-s-tikvoi-krasivo-instagram-7.jpg",
        fullName: "student 1",
        lastMessage: "",
        messages: [],
    },
];

export var timliderMessengerArr = [{}];

export var invitationsData = [];

// export var buddysStudents = [
//     { arrivalID: '#1', photo: 'photo1', studentFullName: 'name1', studenCizenship: 'China' },
//     { arrivalID: '#2', photo: 'photo2', studentFullName: 'name2', studenCizenship: 'UK' },
//     { arrivalID: '#3', photo: 'photo3', studentFullName: 'name3', studenCizenship: 'KZ' },
// ];

export var buddysStudents = [];

export var initialTasksData = [
    {
        id: 1,
        text: "Встреча в аэропорту ",
        completed: false,
        deadline: "\nDeadline: 11.11.2023 4:30 pm",
    },
    { id: 2, text: "Оплата и заселение в хостел", completed: false },
    { id: 3, text: "Прохождение медосмотра", completed: false },
    { id: 4, text: "Оформление сим-карты", completed: false },
    { id: 5, text: "Обмен денег", completed: false },
    {
        id: 6,
        text: "Перевод и нотариальное заверение паспорта",
        completed: false,
    },
    { id: 7, text: "Оформление банковской карты", completed: false },
    { id: 8, text: "Оформление документов о зачислении", completed: false },
    { id: 9, text: "Оформление страховки", completed: false },
    { id: 10, text: "Оформление документов на общежитие", completed: false },
    { id: 11, text: "Оформление пропуска", completed: false },
    { id: 12, text: "Оформление студенческого билета", completed: false },
    {
        id: 13,
        text: "Прохождение медосвидетельствования",
        completed: false,
        deadline: "\nDeadline: 11.11.2023 4:30 pm",
    },
    {
        id: 14,
        text: "Продление визы",
        completed: false,
        deadline: "\nDeadline: 11.11.2023 4:30 pm",
    },
    {
        id: 15,
        text: "Прохождение дактилоскопии",
        completed: false,
        deadline: "\nDeadline: 11.11.2023 4:30 pm",
    },
];

export var showTasks = {
    airport_meeting: false,
    bank_card: false,
    dormitory_documents: false,
    enrollment_documents: false,
    fingerprinting: [false, "2024-03-05"],
    insurance: false,
    medical_examinated: false,
    medical_tests: [false, null],
    money_exchange: false,
    motel_checked_in: false,
    passport_translated: false,
    sim_card_created: false,
    student_ID: true,
    user_id: "86a37105-55d7-4b04-88e5-68898574a89e",
    visa_extension: [false, null],
};

export var initialInfo = [
    { id: 1, text: "Визовый режим", completed: false },
    { id: 2, text: "COVID-ограничения", completed: false },
    { id: 3, text: "Правила поселения в общежитие", completed: false },
    { id: 4, text: "Правила пребывания в стране", completed: false },
    {
        id: 5,
        text: "Карта мест первой и второй необходимости (мага",
        completed: false,
    },
    { id: 6, text: "Карта достопримечательностей", completed: false },
    { id: 7, text: "История города", completed: false },
];

export const languageTranslate = (language, en, ru) => {
    switch (language) {
        case "en":
            return en;
        case "ru":
            return ru;
    }
};

export function getUserType(userType) {
    switch (userType) {
        case 1:
            return "Student";
        case 2:
            return "Buddy";
        case 3:
            return "Teamleader";
    }
}

export const getJSONFromServer = async () => {
    const serverURL =
        "https://privet-mobile-app.onrender.com/openapi.json/register";

    try {
        const response = await fetch(serverURL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Данные с сервера:", data);
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw error;
    }
};

export const sendChangePasswordToServer = async (data, adress, contentType) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "PATCH",
                headers: {
                    Accept: "application" + contentType,
                    "Content-Type": "application" + contentType,
                },
                credentials: "include",
                body: JSON.stringify(data),
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export const sendChangeProfileToServer = async (
    data,
    adress,
    contentType,
    token
) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "POST",
                headers: {
                    Accept: "application" + contentType,
                    "Content-Type": "application" + contentType,
                    Authorization: "Bearer " + token,
                },
                credentials: "include",
                body: JSON.stringify(data),
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export const sendDataToServer = async (data, adress, contentType) => {
    let bodyData =
        contentType == "/json"
            ? JSON.stringify(data)
            : new URLSearchParams(data).toString();

    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application" + contentType,
                },
                credentials: "include",
                body: bodyData,
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export const getUserByEmailFromServer = async (adress, contentType) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application" + contentType,
                },
                credentials: "include",
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export const getDataFromServer = async (adress, contentType) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application" + contentType,
                },
                credentials: "include",
                // body: badyData,
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export const getTokenToServer = async (token, adress, contentType) => {
    try {
        const res = await fetch(
            "https://privet-mobile-app.onrender.com" + adress,
            {
                method: "GET",
                headers: {
                    Accept: "application" + contentType,
                    Authorization: "Bearer " + token,
                },
            }
        );
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
};

export function getValueByKey(number, arr) {
    const language = arr.find((item) => item.key === number);
    // console.log(number, language);
    if (language) {
        return language.value;
    } else {
        return "Not chosen";
    }
}

// export const sendJSONToServer = async (data,) => {
//     const serverURL = 'https://privet-mobile-app.onrender.com/register';

//     const headers = {
//         'Content-Type': 'application/json',
//     };

//     try {
//         const response = await fetch(serverURL, {
//             method: 'POST',
//             headers: headers,
//             body: data,
//         });
//         console.log('HTTP-статус:', response.status);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data_1 = await response.json();
//         console.log('Данные с сервера после отправки:', data_1);
//         return data_1;
//     } catch (error) {
//         console.error('Ошибка при отправке данных:', error);
//         throw error;
//     }
// };
