// import { registerRootComponent } from 'expo';
export var registrationData = {
    user: '',
    language: 'en',
    university: '',
    email: '',
    password: '',
    passwordConfirm: '',
    randomCode: '',
    isNewPassword: false,
};

export var userData = {
    access_token: '',
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
    profileType: '',
};

export var LogInData = {
    user: '',
    university: '',
    email: '',
    password: '',
}

export var initialTasks = [
    { id: 1, text: 'Встреча в аэропорту', completed: false },
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
    { id: 12, text: 'Прохождение медосвидетельствования', completed: false },
    { id: 13, text: 'Продление визы', completed: false },
    { id: 14, text: 'Прохождение дактилоскопии', completed: false }
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

export const sendDataToServer = async (data, adress, contentType) => {
    let badyData = (contentType == "/json") ? JSON.stringify(data) : new URLSearchParams(data).toString();

    try {
        const res = await fetch("https://privet-mobile-app.onrender.com" + adress, {
            method: "POST",
            headers: {
                "Content-Type": "application" + contentType,
            },
            credentials: 'include',
            body: badyData,
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
    // let badyData = (contentType == "/json") ? JSON.stringify(data) : new URLSearchParams(data).toString();

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