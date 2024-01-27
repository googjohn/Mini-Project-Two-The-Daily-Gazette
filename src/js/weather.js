import { timeNow } from "./date.js";

// fetch ip info of user using apiip.net
export async function getIpInfo() {
    const apiKey = '71dfe1b9-37c2-4046-9a8b-3a79951cd795'
    const apiUrl = `https://apiip.net/api/check?&accessKey=${apiKey}`

    // const ipInfoKey = '6fb133d2b718e1'
    // const ipInfoUrl = `https://ipinfo.io/json?token=${ipInfoKey}`

    const response = await fetch(apiUrl);
    // const req = await fetch(ipInfoUrl);
    
    const result = await response.json();
    // const res = await req.json();
    // console.log(res);
    // return res;
    console.log(result);
    return result;
}

async function getIpGeoLocation() {

    const ipAdd = await getIpInfo();

    const ipgeoApikey = 'fea457340ea143e192d5d3309e2d17c0'
    const ipgeoUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeoApikey}&ip=${ipAdd.ip}`

    const response = await fetch(ipgeoUrl)

    const result = await response.json();
    
    return result;
}


// get weather data 
async function getWeatherData(endpoint) {
    const locationData = await getIpGeoLocation();
    const lat = locationData.latitude;
    const lon = locationData.longitude;
    const city = locationData.city;

    const apiKey = '5c2780f0e27163175249dc2144f8ca64';
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const api_Key = '3UX7T3ZEVQE5URAYQUM7WP8ZH';
    const visualCrossingUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/${endpoint}/${lat},${lon}?&key=${api_Key}&iconSet=icons1`

    const req = await fetch(openWeatherUrl);
    const res = await req.json();

    const response = await fetch(visualCrossingUrl);

    const result = await response.json();
    
    const icon = result.currentConditions.icon
    const condition = result.currentConditions.conditions
    const currentTemp = result.currentConditions.temp
    const description = result.description

    const location = document.querySelector('.location');
    location.textContent = city;

    // const iconUrl = `https://openweathermap.org/img/w/${result.weather[0].icon}.png`
    // const iconUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?IconSet=icons1&aggregateHours=24&combinationMethod=aggregate&shortColumnNames=true&contentType=json&unitGroup=metric&locationMode=single&locations=${lat},${lon}&forecastDays=7&key=${api_Key}`

    const weatherIcon = document.querySelector('.weather-icon');

    weatherIcon.innerHTML = `<img src="${conditionHandle(icon)}" title="${condition}" alt="">`

    const temperature = document.querySelector('.weather-loc-container .temp');
    temperature.innerHTML = celciusHandle(currentTemp) + '&deg;C';
    
    const locationInner = document.querySelector('.location-inner');
    locationInner.textContent = city;

    const iconDescription = document.querySelector('.icon-description');
    const iconTempContainer = document.querySelector('.icon-temp-container');

    iconTempContainer.firstElementChild.innerHTML =
        `<img src="${conditionHandle(icon)}" title="${condition}" alt="">`

    iconTempContainer.lastElementChild.innerHTML = celciusHandle(currentTemp) + '&deg;C';
    
    const weatherDescription = document.querySelector('.weather-description');
    weatherDescription.textContent = description;

    const weatherLocContainer = document.querySelector('.weather-loc-container');

    // weatherLocContainer.title = `title="${result.weather[0].description}"`

    weatherForecastHandle(result);
    tempChangeHandle(currentTemp);
}

function tempChangeHandle(currentTemp){
    const temperature = document.querySelector('.weather-loc-container .temp');
    const iconTempContainer = document.querySelector('.icon-temp-container');
    const hourlyForecast = document.querySelectorAll('.hourly-forecast .hourly-item .temp');

    const unitContainer = document.querySelector('.unit.dropdown ul');
    unitContainer.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target.classList.contains('celcius')) {
            temperature.innerHTML = celciusHandle(currentTemp) + '&deg;C';
            iconTempContainer.lastElementChild.innerHTML = celciusHandle(currentTemp) + '&deg;C';
            hourlyForecast.forEach(item => {
                item.innerHTML = celciusHandle(currentTemp) + '&deg;C'
            })
        } else if (target.classList.contains('fahrenheit')) {
            temperature.innerHTML = Math.floor(currentTemp) + '&deg;F';
            iconTempContainer.lastElementChild.innerHTML = Math.floor(currentTemp) + '&deg;F';
            hourlyForecast.forEach(item => {
                item.innerHTML = Math.floor(currentTemp) + '&deg;F'
            })
        } else if (target.classList.contains('kelvin')) {
            temperature.innerHTML = kelvinHandle(currentTemp) + '&deg;K';
            iconTempContainer.lastElementChild.innerHTML = kelvinHandle(currentTemp) + '&deg;K';
            hourlyForecast.forEach(item => {
                item.innerHTML = kelvinHandle(currentTemp) + '&deg;K'
            })
        }
    })
}

function conditionHandle(condition) {
    switch (condition) {
        case 'partly-cloudy-day':         
            return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlyCloudyDay.svg'   
            // return 'https://i.ibb.co/PZQXH8V/27.png';   
        case 'partly-cloudy-night':           
            return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlyCloudyNight.svg'   
            // return 'https://i.ibb.co/Kzkk59k/15.png';   
        case 'rain':           
            return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/ModerateRain.svg'   
            // return 'https://i.ibb.co/kBd2NTS/39.png';    
        case 'clear-day':           
            return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlySunnyDay.svg'   
            // return 'https://i.ibb.co/rb4rrJL/26.png';    
        case 'clear-night':            
            return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyClearNight.svg'   
            // return 'https://i.ibb.co/1nxNGHL/10.png';
        case 'cloudy':
            return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg'   
            // return 'https://openweathermap.org/img/w/04n.png'
        default:
            return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlySunnyDay.svg'   
            // return 'https://i.ibb.co/rb4rrJL/26.png';
    }
}

function backgroundHandle() {
    const weatherLocContainer = document.querySelector('.weather-loc-container');
    const dropdownUl = document.querySelector('.weather-loc-container .dropdown .weather-loc-box');

    const weatherContainerBackgroundNight = "url('./images/icons/weather_backgrounds/sky-clear-night.jpg') no-repeat center center/cover"
    const dropdownUlBackgroundNight =  "url('./images/icons/weather_backgrounds/sky-clear-night.jpg') no-repeat center center/cover"
    const weatherContainerBackgroundDay = "url('./images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center center/cover"
    const dropdownUlBackgroundDay = "url('./images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center center/cover"

    const timeDigits = parseInt(timeNow().toString().valueOf().slice(0,8))
    const timePm = timeNow().toString().toLowerCase().includes('pm')

    if (timePm) {
        if (timeDigits > 5) {             
            weatherLocContainer.style.background = weatherContainerBackgroundNight;
            dropdownUl.style.background = dropdownUlBackgroundNight;
        }
        if (timeDigits === 12) {
            weatherLocContainer.style.background = weatherContainerBackgroundDay;
            dropdownUl.style.background = dropdownUlBackgroundDay;
        }
    } else {
        if (timeDigits < 5 ) {
            weatherLocContainer.style.background = weatherContainerBackgroundNight;
            dropdownUl.style.background = dropdownUlBackgroundNight;
        } else {
            weatherLocContainer.style.background = weatherContainerBackgroundDay;
            dropdownUl.style.background = dropdownUlBackgroundDay;
        }

        if (timeDigits === 12) {
            
            // hourlyItem.forEach(item => {
            //     item.style.boxShadow = 
            //         '4px -3px 10px 0 rgba(0, 0, 0, 0.25), -4px 4px 10px 0 rgba(255, 255, 255, 0.3)';
            // })

            weatherLocContainer.style.background = weatherContainerBackgroundNight;
            dropdownUl.style.background = dropdownUlBackgroundNight;
        }
    }
}

function weatherForecastHandle(weatherData) {

    const hourlyForecastContainer = document.querySelector('.hourly-forecast')
    const moreForecast = document.querySelector('.more-forecast')

    const timeDigits = parseInt(timeNow().toString().valueOf().slice(0,8))
    const timePm = timeNow().toString().toLowerCase().includes('pm')

    const hourlyForecast = weatherData.days[1].hours.slice(0, 5)
    // .length < 6 ? 
    //     (weatherData.days[1].hours.slice((timeDigits + 10), (weatherData.days[1].hours.length + 12))) : weatherData.days[1].hours.slice((timeDigits + 12), weatherData.days[1].hours.length)

    for (let ii = 0; ii < hourlyForecast.length; ii++) {
        const hourForecast = hourlyForecast[ii];
        const hourlyItemContainer = document.createElement('div');
        hourlyItemContainer.classList = 'hourly-item'
        console.log(hourForecast);

        hourlyItemContainer.innerHTML = 
            `<span class="time">
                ${
                    hourForecast.datetime.slice(0,2) == 0 ?
                    12 :
                    hourForecast.datetime.slice(0,2)
                }${timePm ? "PM" : "AM"}</span>
            <span class="icon"><img src="${conditionHandle(hourForecast.icon)}" title="${hourForecast.conditions}"></span>
            <span class="temp">${celciusHandle(hourForecast.temp)}&deg;C</span>`
        
        hourlyForecastContainer.appendChild(hourlyItemContainer)
        
        const boxShadowLightUp = '-4px 4px 10px 0 rgba(255, 255, 255, 0.3), 4px -4px 10px 0 rgba(0, 0, 0, 0.25)';
        const boxShadowLightDown = '4px -4px 10px 0 rgba(255, 255, 255, 0.3), -4px 4px 10px 0 rgba(0, 0, 0, 0.25)';

        if (timePm) {
            if (timeDigits > 5) {           
                hourlyItemContainer.style.boxShadow = boxShadowLightUp
                moreForecast.style.boxShadow = boxShadowLightUp
            } else {
                hourlyItemContainer.style.boxShadow = boxShadowLightDown
                moreForecast.style.boxShadow = boxShadowLightDown
            }
            if (timeDigits === 12) {
                hourlyItemContainer.style.boxShadow = boxShadowLightDown
                moreForecast.style.boxShadow = boxShadowLightDown
            } 
        } else {
            if (timeDigits === 12) {
                hourlyItemContainer.style.boxShadow = boxShadowLightUp
                moreForecast.style.boxShadow = boxShadowLightUp
            } 
            if (timeDigits < 5) {
                hourlyItemContainer.style.boxShadow = boxShadowLightDown
                moreForecast.style.boxShadow = boxShadowLightDown
            } else {
                hourlyItemContainer.style.boxShadow = boxShadowLightUp
                moreForecast.style.boxShadow = boxShadowLightUp
            }
        }
        // hourlyItemContainer.addEventListener('mouseover', ()=> {
            // hourlyItemContainer.style.boxShadow =
            //     '4px -3px 10px 0 rgba(255, 255, 255, 0.3), -4px 4px 10px 0 rgba(0, 0, 0, 0.25)'
        // })
        // hourlyItemContainer.addEventListener('mouseout', ()=> {
            // hourlyItemContainer.style.boxShadow =
                // '4px -3px 10px 0 rgba(0, 0, 0, 0.25), -4px 4px 10px 0 rgba(255, 255, 255, 0.3)'
        // })
    }

}


function celciusHandle(temp) {
    const kelvinBase = 274.15;
    const celcius = Math.floor((temp - 32) * (5/9));
    return celcius
}

function fahrenheitHandle(temp) {
    const kelvinBase = 274.15;
    const fahrenheit = Math.floor((temp * (1.8)) + 32);
    return fahrenheit;
}

function kelvinHandle(temp) {
    const kelvinBase = 274.15;
    const kelvin = Math.floor(celciusHandle(temp) + kelvinBase);
    return kelvin;
}

const hourDayTab = document.querySelector('.hour-day-tab');

hourDayTab.addEventListener('click', event => {
    const target = event.target;
    hourDayTabHandle(target)
})

function hourDayTabHandle(target) {
    const hourTab = document.querySelector('.hour-tab')
    const dayTab = document.querySelector('.day-tab')
    
    if (target === hourTab) {
        hourTab.style.borderBottom = '2px solid var(--aqua-clr)' 
        dayTab.style.borderBottom = 'none'
    } else {
        dayTab.style.borderBottom = '2px solid var(--aqua-clr)'
        hourTab.style.borderBottom = 'none'
    }
}

const dropdownInner = document.querySelector('.dropdown-inner')
dropdownInner.addEventListener('click', event => {
    dropdownButtonHandle(event);
})

function dropdownButtonHandle(event) {
    const dropdownUl = document.querySelector('.dropdown-inner ul');
    const dropdownI = document.querySelector('.dropdown-inner i');
    const weatherLocBox = document.querySelector('.weather-loc-box')

    const target = event.target;
        
    if (target === dropdownI) {
        dropdownI.classList.add('active')
        if (dropdownUl.style.display === 'block') {
            dropdownUl.style.display = 'none';
            dropdownI.classList.remove('active')
        } else {
            dropdownUl.style.display = 'block';
        }
    } else {
        dropdownUl.style.display = 'none';
        dropdownI.classList.remove('active')
    }
}

function init() {
    backgroundHandle();
    getWeatherData('timeline');
}


document.addEventListener('DOMContentLoaded', ()=> {
    init();
})

