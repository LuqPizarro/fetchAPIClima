// Seleccionadores
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const contenido = document.querySelector('.container');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    //Validacion
    if( ciudad === '' || pais === ''){
        imprimirAlerta('Todos los campos son obligatorios');
        return;
    }

    //Consulta a la API
    consultarAPI(ciudad, pais);
};

function consultarAPI(ciudad, pais){

    const appID = '45e980ea1d8aa4bb9246e58c41d78224';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    // spinner();

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {

            limpiarHTML();

            if(datos.cod === '404'){
                imprimirAlerta('Ciudad no encontrada');
                return;
            };

            mostrarClima(datos);
        });
};

function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min}} = datos;

    const city = document.createElement('p');
    city.textContent = `Ciudad: ${name}`;
    city.classList.add('font-bold', 'text-2xl');

    const actual = kelvinAcelcius(temp);
    const max = kelvinAcelcius(temp_max);
    const min = kelvinAcelcius(temp_min);

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

    resultado.appendChild(div);

};

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

const kelvinAcelcius = grados => parseInt(grados - 273); 

function imprimirAlerta(mensaje){

    const alerta = document.querySelector('.alerta')

    if(!alerta){
    const msj = document.createElement('div');
    msj.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');
    msj.innerHTML = `
    <strong class="font-bold"> ¡Error! </strong>
    <span class="block"> ${mensaje} </span>
    `;
    contenido.appendChild(msj);

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

        resultado.appendChild(spinner)
}