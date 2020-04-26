

//загрузка параметров

$(window).on('load', function(){
    newTable(
        hrefQueryParams.cols,
        hrefQueryParams.rows,
    );
});

var hrefQueryParams = getQueryParams(document.location.href);
console.log(hrefQueryParams);

function getQueryParams(href) {
let queryParams = {};
href.substring(href.indexOf('?') + 1, href.length).split('&')
    .forEach(param => {
        const paramKeyValue = param.split('=');
        queryParams[paramKeyValue[0]] = paramKeyValue[1];
    });
return queryParams;
}


//функция создания таблицы

function newTable(cols, rows) {
    let table = document.createElement('table');
    table.className = 'mainTable';
    table.style.borderCollapse = 'collapse';
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            td.style.minWidth = '60px';
            td.style.height = '20px';
            td.style.border = '1px solid black';
            td.appendChild(saveContent(td));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
          
    document.body.appendChild(table);
   
}


//Функция сохранения контента в ячейке таблицы
function saveContent(td, previousValue) {

    let form = document.createElement('form'),
        textarea = document.createElement('textarea'),
        button = document.createElement('button'),
        divForm = document.createElement('div');

    divForm.className = 'form-group';
    button.innerHTML = 'Сохранить';
    button.className = 'btn btn-success';
    textarea.className = 'form-control-sm mr-2';
    if (previousValue !== undefined) {
        textarea.value = previousValue;
    }
    td.innerHTML = '';
    button.onclick = () => {
        let div = document.createElement('div');
        div.style.height = '25px';
        div.innerText = textarea.value;
        div.onclick = () => {
            td.append(saveContent(td, div.innerText));
        };
        divForm.remove();
        td.append(div);
        let buttonDelete = document.createElement('button');
        buttonDelete.type = 'button';
        buttonDelete.innerHTML = 'Удалить';
        buttonDelete.className = 'btn btn-danger';
        buttonDelete.onclick = () => td.append(saveContent(td));
        td.append(buttonDelete);
    };

    form.className = 'form-inline';
    form.append(textarea, button);
    divForm.append(form);
    return divForm;
}

//В блок с функциями добавить элемент “Случайный выбор"

function randomChoice() {
    let divForRandom = newFunction('Случайный выбор');
    let button = document.createElement('button')
    ;

    button.type = 'button';
    button.innerText = 'Magic';

    button.onclick = function()  {
        let td = randomCell();
        magic(td);
    };
    divForRandom.appendChild(button);
    return divForRandom;
}

function randomCell() {
    let rowsNumber = document.querySelectorAll('tr');
    let rowIndex = Math.floor(Math.random() * (rowsNumber.length));
    let colIndex = Math.floor(Math.random() * (rowsNumber[rowIndex].cells.length));
    return rowsNumber[rowIndex].cells[colIndex];
}

function magic(td) {
    if (Math.floor(1 + Math.random() * (15 + 1 - 1)) === 7) {
        td.appendChild(saveContent(td));
    } else {
        td.style.backgroundColor = randomColor();
        randomFontStyle(td);
    }
}

function randomColor() {
    var r=Math.floor(Math.random()*(256));
    var g=Math.floor(Math.random()*(256));
    var b=Math.floor(Math.random()*(256));
    var color='#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
}

function randomFontStyle(td) {
    let newColor = randomColor();
    let newFontSize = Math.floor(15 + Math.random() * (25 + 1 - 15)) + 'pt';
    td.style.color = newColor;
    td.style.fontSize = newFontSize;
    /* если форма есть, то для каждого её внутреннего 
    тега задаем стиль
    */
    if (typeof td.childNodes[0] !== 'undefined') {
        td.childNodes[0].childNodes.forEach((elem) => {
            elem.style.color = newColor;
            elem.style.fontSize = newFontSize;
        });
    }
}

function borderOptions() {
    let options = [];
    ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].forEach(
        (borderStyle) => {
            let option = document.createElement('option');
            option.innerText = borderStyle;
            options.push(option);
        }
    );
    return options;
}

//удаление строки
deleteRowBut.onclick = function() {
    let rowsNumber = document.querySelectorAll('tr');
    if (rowForDelete.value < 1 || rowForDelete.value > rowsNumber.length
        || rowForDelete.value.match(/([^0-9])/g)) {
        alert('Строки с таким номером в таблице нет');
    } else {
        rowsNumber[rowForDelete.value - 1].remove();
    }
};

//удаление столбца
deleteColBut.onclick = function() {
    let colsNumber = document.querySelectorAll('td');
    let rowsNumber = document.querySelectorAll('tr');
    if (colForDelete.value/rowsNumber.value < 1 || colForDelete.value/rowsNumber.value > colsNumber.length
        || colForDelete.value.match(/([^0-9])/g)) {
        alert('Столбца с таким номером в таблице нет');
    } else {
        let i=0;
        let k=colsNumber.length;
        let t=colsNumber.length/rowsNumber.length
        while (i <= k) {
        colsNumber[colForDelete.value - 1+i].remove();
        i=i+t;
    }
}}

//удаление таблицы
deleteTableBut.onclick = function() {
    document.querySelector('table').remove();
    $("#tableHeader").css("visibility", "hidden");
};

//magic
magicBut.onclick = function()  {
    let td = randomCell();
    magic(td);
};

//добавление заголовка
addCaptionBut.onclick = () => {
    tableHeader.innerText = inputCaptionName.value;
    $("#tableHeader").css("visibility", "visible");
    $("#tableHeader").css("margin-left", "40px");

};

//Оформление границ

let option = document.createElement('option')
;
option.innerText = 'Выберите стиль рамки';
option.disabled = true;
option.selected = true;
selectBorder.appendChild(option);

borderOptions().forEach((option) => selectBorder.appendChild(option));

inputBorderWidth.oninput = function() {
    changeBorderBut.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ';
    if (selectBorder.value !== '' && selectBorder.value !== 'Выберите стиль рамки') {
        changeBorderBut.innerText += ' и рамка ' + select.value;
    }
};

selectBorder.onchange = function() {
    if (inputBorderWidth.value !== '') {
        changeBorderBut.innerText = changeBorderBut.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ' +
            'и рамка ' + selectBorder.value;
    } else {
        changeBorderBut.innerText = 'Применить' + ' ' + 'рамка ' + selectBorder.value;
    }
};


changeBorderBut.onclick = function() {
let tdList = document.querySelectorAll('td');
tdList.forEach((td) =>
    td.style.border = `${inputBorderWidth.value}px ${selectBorder.value}`
);
};

//добавление строки

addRow.onclick = function() {
    let table = document.getElementsByClassName('mainTable')[0];
    let tr = document.createElement('tr');
    let rowsNumber = document.querySelectorAll('tr');
    let cellsNumber = document.querySelectorAll('td');
    let colsNumber = cellsNumber.length/rowsNumber.length;
        for (let j = 0; j < colsNumber; j++) {
            let td = document.createElement('td');
            td.style.minWidth = '60px';
            td.style.height = '20px';
            td.style.border = '1px solid black';
            td.appendChild(saveContent(td));
            tr.appendChild(td);
        }
        table.appendChild(tr);

      return tr;
}

//добавление столбца

addCol.onclick = function () {
    let table = document.getElementsByClassName('mainTable')[0];
    let trArr = table.getElementsByTagName('tr');
    let rowsNumber = document.querySelectorAll('tr');
    for (let j = 0; j < rowsNumber.length; j++) {
        td = trArr[j].insertCell(hrefQueryParams.cols);
        td.style.minWidth = '60px';
        td.style.height = '20px';
        td.style.border = '1px solid black';
        td.appendChild(saveContent(td));
        trArr[j].appendChild(td);
    }
}