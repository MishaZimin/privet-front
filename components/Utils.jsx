// import { registerRootComponent } from 'expo';


export var userData = {
    language: 'en',
    access_token: '',
    id: '',
    photo: '',
    fullName: '',
    citizenship: '',
    city: '',
    sex: '',
    birthDate: '',
    phone: '',
    email: '',
    telegram: '',
    whatsApp: '',
    vk: '',
    nativeLanguage: '',
    otherLanguage: '',
    university: '',
    escortIsPaid: false,
    user: '',
    buddyStatus: 'No',

    lastBuddy: '',
    institute: '',
    studyProgram: '',
    lastArrivalDate: '',
    lastVisaExpiration: '',
    accommodation: '',
    buddysComment: '',
};

export var arrivalBookData = {
    id: '123',
    arrivalDate: '01.01.2023',
    flightNumber: '11111',
    arrivalPoint: '2222',
    comment: 'comment',
    tickets: '№4324',

    fullName: 'name student',
    sex: 1,
    arrivalTime: '3:30 am',
    citizenship: 'china',
    phone: '+78689548962',
    telegram: '@tg-student',
    whatsApp: '+78689548962',
    vk: '@vk-student',

    countBuddy: 1,
    maxBuddy: 2,
};

export var allArrivalBuddy = [{
    photo: '',
    fullName: 'buddy 1',
}];

export var StudentData = {
    language: 'en',
    access_token: '',
    id: '',

    photo: '',
    university: '',
    city: '',
    fullName: '',
    birdthDate: '',
    phone: '',
    email: '',
    telegram: '',
    whatsApp: '',
    vk: '',
    nativeLanguage: '',
    otherLanguage: '',
    user: '',

    institute: '',
    studyProgram: '',
    lastArrivalExpiration: '',
    lastVisaExpiration: '',
    accommodation: '',
    buddysComment: '',
}

export var BuddyData = {
    language: 'en',
    access_token: '',
    id: '',
    photo: '',
    fullName: '',
    citizenship: '',
    sex: '',
    birdthDate: '',
    phone: '',
    email: '',
    telegram: '',
    whatsApp: '',
    vk: '',
    nativeLanguage: '',
    otherLanguage: '',
    university: '',
    escortIsPaid: '',
    user: '',
    buddyStatus: '',
}


export var LogInData = {
    user: '',
    university: '',
    email: '',
    password: '',
}

export var registrationData = {
    user: '',
    language: 'en',
    university: '',
    email: '',
    password: '',
    passwordConfirm: '',
    isNewPassword: false,
};

export var allArrivals = [];

export var myArrivals = [];

export var allarrivalBookArr = [];


// export var buddysStudents = [
//     { arrivalID: '#1', photo: 'photo1', studentFullName: 'name1', studenCizenship: 'China' },
//     { arrivalID: '#2', photo: 'photo2', studentFullName: 'name2', studenCizenship: 'UK' },
//     { arrivalID: '#3', photo: 'photo3', studentFullName: 'name3', studenCizenship: 'KZ' },
// ];

export var buddysStudents = [];

export var initialTasksData = [
    { id: 1, text: 'Встреча в аэропорту', completed: false, deadline: '\nDeadline: 11.11.2023 4:30 pm' },
    { id: 2, text: 'Оплата и заселение в хостел', completed: false },
    { id: 3, text: 'Прохождение медосмотра', completed: false },
    { id: 4, text: 'Оформление сим-карты', completed: false },
    { id: 5, text: 'Обмен денег', completed: false },
    { id: 6, text: 'Перевод и нотариальное заверение паспорта', completed: false },
    { id: 7, text: 'Оформление банковской карты', completed: false },
    { id: 8, text: 'Оформление документов о зачислении', completed: false },
    { id: 9, text: 'Оформление страховки', completed: false },
    { id: 10, text: 'Оформление документов на общежитие', completed: false },
    { id: 11, text: 'Оформление пропуска / студенческого билета', completed: false },
    { id: 12, text: 'Прохождение медосвидетельствования', completed: false, deadline: '\nDeadline: 11.11.2023 4:30 pm' },
    { id: 13, text: 'Продление визы', completed: false, deadline: '\nDeadline: 11.11.2023 4:30 pm' },
    { id: 14, text: 'Прохождение дактилоскопии', completed: false, deadline: '\nDeadline: 11.11.2023 4:30 pm' }
];

export var initialInfo = [
    { id: 1, text: 'Визовый режим', completed: false },
    { id: 2, text: 'COVID-ограничения', completed: false },
    { id: 3, text: 'Правила поселения в общежитие', completed: false },
    { id: 4, text: 'Правила пребывания в стране', completed: false },
    { id: 5, text: 'Карта мест первой и второй необходимости (мага', completed: false },
    { id: 6, text: 'Карта достопримечательностей', completed: false },
    { id: 7, text: 'История города', completed: false },
];


export const languageTranslate = (language, en, ru) => {
    switch (language) {
        case 'en': return en;
        case 'ru': return ru;
    };
};

export const getJSONFromServer = async () => {
    const serverURL = 'https://privet-mobile-app.onrender.com/openapi.json/register';

    try {
        const response = await fetch(serverURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Данные с сервера:', data);
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const sendChangePasswordToServer = async (data, adress, contentType) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "PATCH",
            headers: {
                "Accept": "application" + contentType,
                "Content-Type": "application" + contentType,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
}

export const sendChangeProfileToServer = async (data, adress, contentType, token) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "POST",
            headers: {
                "Accept": "application" + contentType,
                "Content-Type": "application" + contentType,
                "Authorization": "Bearer " + token,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
}

export const sendDataToServer = async (data, adress, contentType) => {
    let bodyData = (contentType == "/json") ? JSON.stringify(data) : new URLSearchParams(data).toString();

    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "POST",
            headers: {
                "Content-Type": "application" + contentType,
            },
            credentials: 'include',
            body: bodyData,
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
}

export const getUserByEmailFromServer = async (adress, contentType) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "GET",
            headers: {
                "Content-Type": "application" + contentType,
            },
            credentials: 'include',
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
}

export const getDataFromServer = async (adress, contentType) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "GET",
            headers: {
                "Content-Type": "application" + contentType,
            },
            credentials: 'include',
            // body: badyData,
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
    }
}

export const getTokenToServer = async (token, adress, contentType) => {
    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "GET",
            headers: {
                "Accept": "application" + contentType,
                "Authorization": "Bearer " + token,
            },
        });
        const responseData = await res.json();
        console.log(adress, responseData);
        return responseData;
    } catch (err) {
        console.log(adress, err);
        throw err;
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