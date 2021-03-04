// Seleccionadores
const form = document.querySelector('#form');
const result = document.querySelector('#result');
const container = document.querySelector('.container');

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather);
});

function searchWeather(e){
    e.preventDefault();

    const city = document.querySelector('#city').value
    const country = document.querySelector('#country').value

    //Validacion
    if( city === '' || country === ''){
        printMsj('All fields are required');
        return;
    }

    //Consulta a la API
    consultarAPI(city, country);
};

function consultarAPI(city, country){

    const appID = '45e980ea1d8aa4bb9246e58c41d78224';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;

    // spinner();

    fetch(url)
        .then( answer => answer.json())
        .then( data => {

            cleanHTML();

            if(data.cod === '404'){
                printMsj('City not found');
                return;
            };

            showWeather(data);
            form.reset()
        });
};

function showWeather(data){
    const {name, main: {temp, temp_max, temp_min}} = data;

    const city = document.createElement('p');
    city.textContent = `City: ${name}`;
    city.classList.add('font-bold', 'text-2xl');

    const actual = kelvinTocelcius(temp);
    const max = kelvinTocelcius(temp_max);
    const min = kelvinTocelcius(temp_min);

    const tActual = document.createElement('p');
    tActual.innerHTML = `${actual} &#8451;`;
    tActual.classList.add('font-bold', 'text-6xl')

    const tMax = document.createElement('p');
    tMax.innerHTML = `Temp. max.: ${max} &#8451;`;
    tMax.classList.add('text-xl');

    const tMin = document.createElement('p');
    tMin.innerHTML = `Temp. min.: ${min} &#8451;`;
    tMin.classList.add('text-xl');

    const div = document.createElement('div');
    div.classList.add('text-center', 'text-white');
    div.appendChild(city)
    div.appendChild(tActual);
    div.appendChild(tMin);
    div.appendChild(tMax);

    result.appendChild(div);

};

function cleanHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild)
    }
}

const kelvinTocelcius = degrees => parseInt(degrees - 273); 

function printMsj(msj){

    const alert = document.querySelector('.alert')

    if(!alert){
    const msj = document.createElement('div');
    msj.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alert');
    msj.innerHTML = `
    <strong class="font-bold"> ¡Error! </strong>
    <span class="block"> ${msj} </span>
    `;
    container.appendChild(msj);

    setTimeout(() => {
        msj.remove();
    },3000)}   
};

function spinner(){

    const spinner = document.createElement('div');
    spinner.classList.add('sk-fading-circle')

    spinner.innerHTML = 
        `<div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>`

        result.appendChild(spinner)
}