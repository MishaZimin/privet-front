
var button = document.getElementById('button-test-drive');

button.addEventListener('click', function () {
    alert('Запись на Тест-драйв');
});


var step = 0;

var form = {
    model: 0,
    items: 0,
    color: 'none',
    pay: 'none',
    connection: 'none',
    name: 'none',
    numberPhone: 'none',
};

document.addEventListener('DOMContentLoaded', function () {
    //начало диалога
    const botMessage = document.getElementById('chat-bot');

    var text1 = `Здравствуйте!<br>
    Меня зовут Александр. Я онлайн-консультант автосалона JAECOO.`
    var text2 = `Пожалуйста, ответьте на пару вопросов, чтобы я мог составить для вас предложение с вариантами комплектации и стоимостью.`;
    var text3 = `Выберите автомобиль из списка ниже:`;

    var textMessages = [text1, text2, text3]

    for (let text of textMessages) {
        botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text));
    }

    botMessage.insertAdjacentHTML("beforebegin", selectionCars());
});

//выбор модели машины
function selectionCars() {
    //предложение модели от бота
    var img1 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQovWiJ9FWftZUedKYufuUOo6xoj6ADQlOyA&usqp=CAU`;
    var img2 = `https://chat-jaecoo.okami.ru/img/models/jaecoo_j7.png`;

    var text1 = `машина 1`;
    var text2 = `машина 2`;
    var text3 = `машина 3`;
    var text4 = `машина 4`;

    var buttons = `
        <div class="chat-bot-message">
            <div class="selection-buttons">
                <div class="selection-button">
                    <button class="selection-button-text" onclick="carFunc(1)">
                        <img src="${img2}">
                        <p>${text1}</p>
                    </button>
                </div>
                <div class="selection-button">
                    <button class="selection-button-text" onclick="carFunc(2)">
                        <img src="${img2}">
                        <p>${text2}</p>
                    </button>
                </div>
                <div class="selection-button">
                    <button class="selection-button-text" onclick="carFunc(3)">
                        <img src="${img2}">
                        <p>${text3}</p>
                    </button>
                </div>
                <div class="selection-button">
                    <button class="selection-button-text" onclick="carFunc(4)">
                        <img src="${img2}">
                        <p>${text4}</p>
                    </button>
                </div>
            </div>
        </div>
    `

    return buttons;
}

function carFunc(input) {
    //выбор модели от пользователя
    form.model = input;
    step = 1;

    const botMessage = document.getElementById('chat-bot');
    var text1 = `${input} машина`

    botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));

    botMessage.insertAdjacentHTML("beforebegin", optionList());
}

function optionList() {
    //предложение опций от бота
    var avatar = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIllqDcDCRW2vLNoso6aJp8pOK3Hqahglrg1-SfMB0Q&s`;

    var list = `
        <div id="chat-bot-message">
            <div class="avatar">
                <img src="${avatar}">
            </div>
            <span class="comment-bot-text">
                <p>Выберите нужные опции:</p><br>
                <ul id="itemList">
                    <li><input type="checkbox" value="Двигатель 1.6 Turbo AWD">Двигатель 1.6 Turbo AWD</li>
                    <li><input type="checkbox" value="Двигатель 1.6 Turbo AWD">Двигатель 1.6 Turbo AWD</li>
                    <li><input type="checkbox" value="19-дюймовые алюминиевые литые диски">19-дюймовые алюминиевые литые диски</li>
                    <li><input type="checkbox" value="Адаптивный круиз-контроль (ACC)">Адаптивный круиз-контроль (ACC)</li>
                    <li><input type="checkbox" value="Климат-контроль, 2 зон">Климат-контроль, 2 зоны</li>
                    <li><input type="checkbox" value="Большой сенсорный дисплей 14.8">Большой сенсорный дисплей 14.8</li>
                </ul><br>

                <button id="button-option-list" onclick="choiceEquipment()">Продолжить</button>

                <div id="jsonResult"></div>
            </span>    
        </div>
    `

    return list;
}

function choiceEquipment() {

    //выбор опций от пользователя
    const botMessage = document.getElementById('chat-bot');

    const itemList = document.querySelectorAll('#itemList input[type="checkbox"]:checked');
    const selectedItems = Array.from(itemList).map(item => item.value);

    form.items = selectedItems;
    console.log(form);

    let selected = ``;

    for (let i = 0; i < selectedItems.length; i++) {
        selected += String(selectedItems[i]) + `<br>`;
    }

    botMessage.insertAdjacentHTML("beforebegin", messageTextUser(selected));


    //предложение цвета от бота
    var text1 = `Выберите цвет автомобиля:`
    botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text1));
    botMessage.insertAdjacentHTML("beforebegin", selectionColors());
}

function selectionColors() {
    var img1 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQovWiJ9FWftZUedKYufuUOo6xoj6ADQlOyA&usqp=CAU`;
    var img2 = `https://chat-jaecoo.okami.ru/img/models/jaecoo_j7.png`;

    var text1 = `Белый`;
    var text2 = `Черный`;
    var text3 = `Зеленый`;
    var text4 = `Зеленый с черной крышей`;
    var text5 = `Серебристый`;
    var text6 = `Серебристый с черной крышей`;
    var text7 = `Серый`;
    var text8 = `Серый с черной крышей`;

    var buttons = `
        <div class="chat-bot-message">
            <div class="selection-colors">

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('White')">
                        <div id="color-white"></div>
                        <p>${text1}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('Black')">
                        <div id="color-black"></div>

                        <p>${text2}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('Silver')">
                        <div id="color-green"></div>
                        
                        <p>${text3}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" 
                        onclick="colorFunc('Grey')">
                        <div id="color-green-balack-roof"></div>

                        <p>${text4}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" onclick="colorFunc('White')">
                        <div id="color-silver"></div>
                        <p>${text5}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" onclick="colorFunc('Black')">
                        <div id="color-silver-balack-roof"></div>

                        <p>${text6}</p>
                    </button>
                </div>
                <div class="selection-color">
                    <button class="selection-color-text" onclick="colorFunc('Silver')">
                        <div id="color-grey"></div>
                        
                        <p>${text7}</p>
                    </button>
                </div>

                <div class="selection-color">
                    <button class="selection-color-text" onclick="colorFunc('Grey')">
                        <div id="color-grey-balack-roof"></div>

                        <p>${text8}</p>
                    </button>
                </div>
            </div>
        </div>
    `

    return buttons;

}

function colorFunc(input) {
    form.color = input;

    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input} color`

    botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));


    var text2 = `Как планируете приобретать автомобиль?`

    botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text2));
    botMessage.insertAdjacentHTML("beforebegin", selectionPay());
}

function selectionPay() {
    var img1 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQovWiJ9FWftZUedKYufuUOo6xoj6ADQlOyA&usqp=CAU`;
    var img2 = `https://chat-jaecoo.okami.ru/img/models/jaecoo_j7.png`;

    var text1 = `Кредит`;
    var text2 = `Наличные`;
    var text3 = `Трейд-Ин`;

    var buttons = `
        <div class="chat-bot-message">
            <div class="selection-colors">
                <div class="selection-color">
                    <button class="selection-color-text" onclick="payFunc('Кредит')">
                        <p>${text1}</p>
                    </button>
                </div>    
                <div class="selection-color">
                    <button class="selection-color-text" onclick="payFunc('Наличные')">
                        <p>${text2}</p>
                    </button>
                </div>  
                <div class="selection-color">
                    <button class="selection-color-text" onclick="payFunc('Трейд-Ин')">
                        <p>${text3}</p>
                    </button>
                </div>   
            </div>
        </div>
    `

    return buttons;

}

function payFunc(input) {
    form.pay = input;

    console.log(form);

    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input}`

    botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));
    //botMessage.insertAdjacentHTML("beforebegin", selectionPay());

    var text2 = `Вы хотите получить расчет стоимости автомобиля звонком по телефону или через WhatsApp?`
    botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text2));
    botMessage.insertAdjacentHTML("beforebegin", selectionNumber());
}

function selectionNumber() {
    var img1 = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQovWiJ9FWftZUedKYufuUOo6xoj6ADQlOyA&usqp=CAU`;
    var img2 = `https://chat-jaecoo.okami.ru/img/models/jaecoo_j7.png`;

    var text1 = `По телефону`;
    var text2 = `Через WhatsApp`;

    var buttons = `
        <div class="chat-bot-message">
            <div class="selection-colors">
                <div class="selection-color">
                    <button class="selection-color-text" onclick="numberFunc('По телефону')">
                        <p>${text1}</p>
                    </button>
                </div>    
                <div class="selection-color">
                    <button class="selection-color-text" onclick="numberFunc('Через WhatsApp')">
                        <p>${text2}</p>
                    </button>
                </div>   
            </div>
        </div>
    `

    return buttons;

}

function numberFunc(input) {
    form.connection = input;

    const botMessage = document.getElementById('chat-bot');

    var text1 = `${input}`

    botMessage.insertAdjacentHTML("beforebegin", messageTextUser(text1));
    //botMessage.insertAdjacentHTML("beforebegin", selectionPay());

    var text2 = `Спасибо, это были все вопросы.`
    var text3 = `Наш менеджер свяжется с Вами и предложит автомобили из наличия или под заказ.`
    var text4 = `Оставьте ваше имя и телефон:`
    botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text2));
    botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text3));
    botMessage.insertAdjacentHTML("beforebegin", messageTextBot(text4));

    //botMessage.insertAdjacentHTML("beforebegin", selectionNumber());
}







function messageTextBot(text) {
    var avatar = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIllqDcDCRW2vLNoso6aJp8pOK3Hqahglrg1-SfMB0Q&s`;

    var message = `
        <div id="chat-bot-message">
            <div class="avatar">
                <img src="${avatar}">
            </div>
            <span class="comment-bot-text">
                ${text}
            </span>
        </div>
    `

    return message;
}

function messageTextUser(text) {
    var avatar = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIllqDcDCRW2vLNoso6aJp8pOK3Hqahglrg1-SfMB0Q&s`;

    var message = `
        <div id="chat-user-message">
            <span class="comment-user-text">
                ${text}
            </span>
        </div>
    `

    return message;
}
