
var button = document.getElementById('button-test-drive');

button.addEventListener('click', function () {
    alert('Запись на Тест-драйв');
});


var step = 0;

document.addEventListener('DOMContentLoaded', function () {
    const botMessage = document.getElementById('chat-bot');

    var text1 = `Здравствуйте!<br>
    Меня зовут Александр. Я онлайн-консультант автосалона JAECOO.`
    var text2 = `Пожалуйста, ответьте на пару вопросов, чтобы я мог составить для вас предложение с вариантами комплектации и стоимостью.`;
    var text3 = `Выберите автомобиль из списка ниже:`;


    var textMessages = [text1, text2, text3]

    if (step === 0) {

        for (let text of textMessages) {
            botMessage.insertAdjacentHTML("beforebegin", messageText(text));
        }

        botMessage.insertAdjacentHTML("beforebegin", selectionButtons());
    }
    if (step === 1) {
        var text = `finish`

        botMessage.insertAdjacentHTML("beforebegin", messageText(text));
    }
});

function messageText(text) {
    var avatar = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIllqDcDCRW2vLNoso6aJp8pOK3Hqahglrg1-SfMB0Q&s`;

    var message = `
        <div id="chat-bot-message">
            <div class="avatar">
                <img src="${avatar}">
            </div>
            <span class="comment-text">
                ${text}
            </span>
        </div>
    `

    return message;
}

function selectionButtons() {
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
    step = 1;


    const botMessage = document.getElementById('chat-bot');
    var text1 = `Зафиксировал, ${input} машина`
    var text2 = `Выберите нужные опции:`


    botMessage.insertAdjacentHTML("beforebegin", messageText(text1));
    botMessage.insertAdjacentHTML("beforebegin", messageText(text2));
}