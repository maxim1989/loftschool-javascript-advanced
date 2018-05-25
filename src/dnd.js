/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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
let counter = 1,
    xOnDragStart = 0,
    yOnDragStart = 0;

homeworkContainer.style.height = '900px';
homeworkContainer.style.border = '1px solid black';
homeworkContainer.style.position = 'relative';

homeworkContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

homeworkContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text'),
        div = document.getElementById(data),
        left = (xOnDragStart < e.clientX ?
            parseInt(div.style.left) + Math.abs(xOnDragStart - e.clientX) :
            parseInt(div.style.left) - Math.abs(xOnDragStart - e.clientX)),
        top = (yOnDragStart < e.clientY ?
            parseInt(div.style.top) + Math.abs(yOnDragStart - e.clientY) :
            parseInt(div.style.top) - Math.abs(yOnDragStart - e.clientY));

    div.style.left = `${left}px`;
    div.style.top = `${top}px`;
});

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div'),
        colors = ['#CD5C5C', '#F08080', '#FA8072', '#E9967A', '#FFA07A', '#DC143C', '#FF0000', '#B22222', '#8B0000',
            '#ADFF2F', '#7FFF00', '#7CFC00', '#00FF00', '#32CD32', '#98FB98', '#90EE90', '#00FA9A', '#00FF7F',
            '#3CB371', '#2E8B57', '#228B22', '#008000', '#006400', '#9ACD32', '#6B8E23', '#808000', '#556B2F',
            '#66CDAA', '#8FBC8F', '#20B2AA', '#008B8B', '#008080'
        ],
        randomColor = colors[Math.floor(Math.random()*colors.length)];

    console.log(screen);
    div.style.backgroundColor = randomColor;
    div.style.display = 'inline-block';
    div.style.position = 'absolute';
    div.style.top = `${Math.floor(Math.random()*(900 - 100))}px`;
    div.style.left = `${Math.floor(Math.random()*(screen.width - 150))}px`;
    div.style.width = `${Math.floor(Math.random()*(150))}px`;
    div.style.height = `${Math.floor(Math.random()*(100))}px`;
    div.className = 'draggable-div';
    div.draggable = true;
    div.id = `element-${counter}`;
    counter++;

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
        xOnDragStart = e.clientX;
        yOnDragStart = e.clientY;
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.style.display = 'block';

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
