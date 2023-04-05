// Import stylesheets

// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon/
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее

let API = "https://pokeapi.co/api/v2/pokemon/";
// console.log(API);

let app = document.querySelector("#app");
let modal = document.querySelector(".modal")
let modalBody = document.querySelector('.modal_body');
let prev = "";
let next = "";

async function cards(link = API){
    let res = await fetch(link);
    let data  = await res.json();
    app.innerHTML = '';
    data.results.forEach((elem,id)=>{
        app.innerHTML += `<button onclick="modalCall(${id})" class="btns">${elem.name}</button>`
    })
};
cards()

async function modalCall(id){
    modal.style.display = "block"; 
    let res = await fetch(API);
    let results = await res.json();
    fetch(results.results[id].url).then((res)=> res.json()).then((info)=>{

        console.log(results)
        modalBody.innerHTML ="";
        modalBody.innerHTML += `
        <h2>More Information</h2>
        <li><img class="imgPok" src="${info.sprites.front_default}" alt=""></li>
        <li><strong>Name:</strong> ${info.name}</li>
        <li><strong>Height:</strong> ${info.height}</li>
        <li><strong>Weight:</strong> ${info.weight}</li>
        <li><strong>Type:</strong> ${info.types[0].type.name}</li>
        <button class="btnOk">Ok</button>
        `
        document.querySelector(".btnOk").addEventListener('click',()=>{
            modal.style.display='none' 
        })
    })
}
// modalCall(1);
// prevBtn();
// modalCall(5);
// async function pokList(url) {
//     let res = await fetch(url);
//     let data = await res.json();
//     render(data.results);
//     nextLink = data.next;
//     prevLink = data.previous;
//   }
  
//   pokList(API);


// !
async function prevBtn(){
    let res = await fetch(API);
    let data = await res.json();
    console.log(data);
    prev = data.next;
    if(prev === null){
        alert("Here is no list");
        return;
    }
    console.log(prev);
    API = prev;
    cards(prev);

}


async function nextBtn(){
    let res = await fetch(API);
    let data = await res.json();
    console.log(data);
    next = data.previous;
    if(next === null){
        alert("Here is no list");
        return;
    }
    console.log(next);
    API = next;
    cards(next);

}


document.querySelector("#next").addEventListener('click', nextBtn);
document.querySelector("#prev").addEventListener('click', prevBtn);