import { timeNow } from "./date.js";

// fetch ip info of user using apiip.net
async function getIpInfo() {
    const apiKey = '71dfe1b9-37c2-4046-9a8b-3a79951cd795'
    const apiUrl = `https://apiip.net/api/check?&accessKey=${apiKey}`

    const response = await fetch(apiUrl);

    const result = await response.json();

    return result;
}

// get weather data from openweathermap.org
async function getWeatherData() {
    const locationData = await getIpInfo();
    const lat = locationData.latitude;
    const lon = locationData.longitude;
    const city = locationData.city;

    const apiKey = '5c2780f0e27163175249dc2144f8ca64';
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`


    const response = await fetch(openWeatherUrl);

    const result = await response.json();

    const location = document.querySelector('.location');
    location.textContent = city;

    const iconUrl = `https://openweathermap.org/img/w/${result.weather[0].icon}.png`

    const weatherIcon = document.querySelector('.weather-icon');

    weatherIcon.innerHTML = `<img src=${iconUrl} alt="weather icon">`

    const temperature = document.querySelector('.temp');

    temperature.innerHTML = celciusHandle(result.main.temp) + '&deg;C';

    const unitContainer = document.querySelector('.unit.dropdown ul');
    unitContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('celcius')) {
            return temperature.innerHTML = celciusHandle(result.main.temp) + '&deg;C';
        } else if (target.classList.contains('fahrenheit')) {
            return temperature.innerHTML = fahrenheitHandle(result.main.temp) + '&deg;F';
        } else if (target.classList.contains('kelvin')) {
            return temperature.innerHTML = result.main.temp + '&deg;K';
        }
    })
}
getWeatherData();

function backgroundHandle() {
    const weatherLocContainer = document.querySelector('.weather-loc-container');
    const dropdownUl = document.querySelector('.weather-loc-container .dropdown ul');

    if (parseInt(timeNow().toString().valueOf().slice(0,8)) > 5) {

        if (timeNow().toString().toLowerCase().includes('pm')) {
            weatherLocContainer.style.backgroundImage = 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)'
            dropdownUl.style.background = 'rgba(36, 57, 73, .7)'
        } else {
            weatherLocContainer.style.backgroundImage = 'linear-gradient(to right, #0acffe 0%, #495aff 100%)'
            dropdownUl.style.background = 'rgba(9, 85, 226, 0.5)'
        }
        
    } else if (parseInt(timeNow().toString().valueOf().slice(0,8)) < 5)  {
        
        if (timeNow().toString().toLowerCase().includes('am')) {
            weatherLocContainer.style.backgroundImage = 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)'
            dropdownUl.style.background = 'rgba(36, 57, 73, .7)'

        } else {
            weatherLocContainer.style.backgroundImage = 'linear-gradient(to right, #0acffe 0%, #495aff 100%)'
            dropdownUl.style.background = 'rgba(9, 85, 226, 0.5)'
        }
    }
}

backgroundHandle();

function celciusHandle(temp) {
    const kelvinBase = 274.15;
    const kelvinValue = temp
    const celcius = (kelvinValue - kelvinBase).toFixed(2);
    return celcius
}

function fahrenheitHandle(temp) {
    const kelvinBase = 274.15;
    const kelvinValue = temp
    const celcius = (kelvinValue - kelvinBase);
    const fahrenheit = ((celcius * (1.8)) + 32).toFixed(2);
    return fahrenheit;
}
