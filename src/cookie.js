/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

/**
 * Отрисовка таблицы кук при первичной загрузке.
 */
window.addEventListener('load', () => {
    filter();
});

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    filter();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    const cookies = prepareCookies();

    // Если добавляется cookie, с именем уже существующией cookie
    if (addNameInput.value in cookies) {
        deleteRow(addNameInput.value);
    }

    document.cookie = `${addNameInput.value}=${addValueInput.value}`;

    if (filterNameInput.value.length === 0 ||
        addNameInput.value.indexOf(filterNameInput.value) >= 0 ||
        addValueInput.value.indexOf(filterNameInput.value) >= 0) {

        listTable.appendChild(createTr(addNameInput.value, addValueInput.value));
    }
    // addNameInput.value = ''; // todo test fail
    // addValueInput.value = ''; // todo test fail
});

/**
 * Делегировать удаление куки с BUTTON на tbody
 */
listTable.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        deleteRow(e.target.dataset.key);
    }
});

/**
 * Удалить куку из таблицы и из хранилища кук.
 * @param {string} key 
 */
function deleteRow(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    listTable.querySelector(`.cookie-${key}`).remove();
}

/**
 * Фильтровать куки и добавить в таблицу.
 */
function filter() {
    const cookies = prepareCookies();
    
    listTable.innerHTML = '';

    for (let c in cookies) {
        if (cookies.hasOwnProperty(c)) {
            if (filterNameInput.value.length === 0 ||
                c.indexOf(filterNameInput.value) >= 0 ||
                cookies[c].indexOf(filterNameInput.value) >= 0) {
                
                listTable.appendChild(createTr(c, cookies[c]));
            }
        }
    }
}

/**
 * Преобразовать куки в объект.
 */
function prepareCookies() {
    const splitCookiesBySpace = document.cookie.split('; '),
        result = {};
    
    splitCookiesBySpace.forEach(item => {
        const [key, value] = item.split('=');

        result[key] = value;
    });

    return result;

}

function createTd(text) {
    const td = document.createElement('td');

    td.textContent = text;

    return td;
}

function createTr(key, value) {
    const tr = document.createElement('tr');

    tr.className = `cookie-${key}`;
    tr.appendChild(createTd(key));
    tr.appendChild(createTd(value));
    tr.appendChild(createButton(key));

    return tr;
}

function createButton(key) {
    const td = createTd(),
        button = document.createElement('button');

    td.appendChild(button);
    button.textContent = 'Delete';
    button.dataset.key = key;

    return button;
}
