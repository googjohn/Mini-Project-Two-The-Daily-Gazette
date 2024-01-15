const weatherLocation = document.querySelector('.weather-location-track');

weatherLocation.addEventListener('click', (event) => {
    const target = event.target;
    console.log(target);
})

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

    temperature.innerHTML = Math.floor(tempConvert(result.main.temp)) + '&deg;';

}
getWeatherData();

function tempConvert(temp) {
    const kelvin = 274.15;
    const celcius = temp - kelvin;
    
    return celcius;
}