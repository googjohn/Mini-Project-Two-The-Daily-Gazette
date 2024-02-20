import { timeNow } from "./date.js";

// fetch ip info of user using apiip.net
export async function getIpInfo() {
  // const apiKey = '71dfe1b9-37c2-4046-9a8b-3a79951cd795'
  // const apiUrl = `https://apiip.net/api/check?&accessKey=${apiKey}`

  const ipInfoKey = '6fb133d2b718e1'
  const ipInfoUrl = `https://ipinfo.io/json?token=${ipInfoKey}`

  // const response = await fetch(apiUrl);
  const req = await fetch(ipInfoUrl);

  // const result = await response.json();
  const res = await req.json();
  console.log(res);
  return res;
  // console.log(result);
  // return result;
}

// this seems redundant with the use of getIpInfo() but this is actually more precise in city result
// also i tried if in this simple way can bypass cors blocking by using ipinfo that allows cors to get ip - it did not :D
// did not work because still would be requesting from client side XD
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
  console.log(res);

  const response = await fetch(visualCrossingUrl);
  const result = await response.json();
  console.log(result);

  const icon = result.currentConditions.icon
  const condition = result.currentConditions.conditions
  const currentTemp = result.currentConditions.temp
  const description = result.days[0].description

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

  // const iconDescription = document.querySelector('.icon-description');
  const iconTempContainer = document.querySelector('.icon-temp-container');

  iconTempContainer.firstElementChild.innerHTML =
    `<img src="${conditionHandle(icon)}" title="${condition}" alt="">`

  iconTempContainer.lastElementChild.innerHTML = celciusHandle(currentTemp) + '&deg;C';

  const weatherDescription = document.querySelector('.weather-description');
  weatherDescription.textContent = description;

  // const weatherLocContainer = document.querySelector('.weather-loc-container');

  // weatherLocContainer.title = `title="${result.weather[0].description}"`

  weatherForecastHandle(result);
  tempChangeHandle(currentTemp);
}

function tempChangeHandle(currentTemp) {
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
    case 'partly-cloudy-night':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlyCloudyNight.svg'
    case 'rain':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/ModerateRain.svg'
    case 'clear-day':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlySunnyDay.svg'
    case 'clear-night':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyClearNight.svg'
    case 'cloudy-day':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg'
    case 'cloudy-night':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg'
    default:
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlySunnyDay.svg'
  }
}

function backgroundHandle() {
  const weatherLocContainer = document.querySelector('.weather-loc-container');
  const dropdownUl = document.querySelector('.weather-loc-container .dropdown .weather-loc-box');

  const weatherContainerBackgroundNight = "url('./images/icons/weather_backgrounds/sky-clear-night.jpg') no-repeat center center/cover"
  const dropdownUlBackgroundNight = "url('./images/icons/weather_backgrounds/sky-clear-night.jpg') no-repeat center center/cover"
  const weatherContainerBackgroundDay = "url('./images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center center/cover"
  const dropdownUlBackgroundDay = "url('./images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center center/cover"

  const timeDigits = parseInt(timeNow().toString().valueOf().slice(0, 8))
  const timePm = timeNow().toString().toLowerCase().includes('pm')

  if (timePm) {
    if (timeDigits > 5) {
      weatherLocContainer.style.background = weatherContainerBackgroundNight;
      dropdownUl.style.background = dropdownUlBackgroundNight;
    } else {
      weatherLocContainer.style.background = weatherContainerBackgroundDay;
      dropdownUl.style.background = dropdownUlBackgroundDay;
    }
    if (timeDigits === 12) {
      weatherLocContainer.style.background = weatherContainerBackgroundDay;
      dropdownUl.style.background = dropdownUlBackgroundDay;
    }
  } else {
    if (timeDigits < 5) {
      weatherLocContainer.style.background = weatherContainerBackgroundNight;
      dropdownUl.style.background = dropdownUlBackgroundNight;
    } else {
      weatherLocContainer.style.background = weatherContainerBackgroundDay;
      dropdownUl.style.background = dropdownUlBackgroundDay;
    }

    if (timeDigits === 12) {
      weatherLocContainer.style.background = weatherContainerBackgroundNight;
      dropdownUl.style.background = dropdownUlBackgroundNight;
    }
  }
}

// go back later for proper timing logic
function weatherForecastHandle(weatherData) {

  const hourlyForecastContainer = document.querySelector('.hourly-forecast')
  const moreForecast = document.querySelector('.more-forecast')

  const timeDigits = parseInt(timeNow().toString().valueOf().slice(0, 8))
  const timePm = timeNow().toString().toLowerCase().includes('pm')
  const timeAm = timeNow().toString().toLowerCase().includes('am')

  const hourlyForecast = weatherData.days[0].hours.slice(12, 17)
  console.log(weatherData);
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
          hourForecast.datetime.slice(0, 2) == 0 ?
          12 :
          hourForecast.datetime.slice(0, 2)
        }
        ${
          timePm ? "PM" : "AM"
        }
      </span>
      <span class="icon"><img src="${conditionHandle(hourForecast.icon)}" title="${hourForecast.conditions}"></span>
      <span class="temp">${celciusHandle(hourForecast.temp)}&deg;<span class="temp-unit">C</span></span>`

    hourlyForecastContainer.appendChild(hourlyItemContainer)

    const dropdownUl = document.querySelector('.dropdown-inner ul');
    const boxShadowLightUp = '4px -4px 10px 0 rgba(255, 255, 255, 0.3), -4px 4px 10px 0 rgba(0, 0, 0, 0.25)';
    const boxShadowLightDown = '-4px 4px 10px 0 rgba(255, 255, 255, 0.3), 4px -4px 10px 0 rgba(0, 0, 0, 0.25)'; //check later for changes
    const boxShadowLightUpInset = '4px -4px 10px 0 rgba(255, 255, 255, 0.3) inset, -4px 4px 10px 0 rgba(0, 0, 0, 0.25) inset'; '4px -4px 10px 0 rgba(255, 255, 255, 0.3) inset, -4px 4px 10px 0 rgba(0, 0, 0, 0.25) inset'
    const boxShadowLightDownInset = '-4px 4px 10px 0 rgba(255, 255, 255, 0.3) inset, 4px -4px 10px 0 rgba(0, 0, 0, 0.25) inset';

    if (timePm) {
      if (timeDigits > 5) {
        hourlyItemContainer.style.boxShadow = boxShadowLightDown;
        moreForecast.style.boxShadow = boxShadowLightDown;
        dropdownUl.style.boxShadow = boxShadowLightDown;
        mouseOverNight(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightDownInset);
        mouseOutNight(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightDown);
      } else if (timeDigits <= 5) {
        hourlyItemContainer.style.boxShadow = boxShadowLightUp;
        moreForecast.style.boxShadow = boxShadowLightUp;
        dropdownUl.style.boxShadow = boxShadowLightUp;
        mouseOverDay(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightUpInset);
        mouseOutDay(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightUp);
      } else if (timeDigits === 12) {
        hourlyItemContainer.style.boxShadow = boxShadowLightUp;
        moreForecast.style.boxShadow = boxShadowLightUp;
        dropdownUl.style.boxShadow = boxShadowLightUp;
        mouseOverDay(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightUpInset);
        mouseOutDay(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightUp);
      }
    } else if (timeAm) {
      if (timeDigits === 12) {
        hourlyItemContainer.style.boxShadow = boxShadowLightDown;
        moreForecast.style.boxShadow = boxShadowLightDown;
        dropdownUl.style.boxShadow = boxShadowLightDown;
        mouseOverNight(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightDownInset);
        mouseOutNight(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightDown);
      } else if (timeDigits < 5) {
        hourlyItemContainer.style.boxShadow = boxShadowLightDown;
        moreForecast.style.boxShadow = boxShadowLightDown;
        dropdownUl.style.boxShadow = boxShadowLightDown;
        mouseOverNight(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightDownInset);
        mouseOutNight(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightDown);
      } else if (timeDigits > 5) {
        hourlyItemContainer.style.boxShadow = boxShadowLightUp;
        moreForecast.style.boxShadow = boxShadowLightUp;
        dropdownUl.style.boxShadow = boxShadowLightUp;
        mouseOverDay(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightUpInset);
        mouseOutDay(hourlyItemContainer, moreForecast, dropdownUl, boxShadowLightUp);
      }
    }
  }
}

function mouseOverDay(obj1, obj2, obj3, style) {
  obj1.addEventListener('mouseover', () => {
    obj1.style.boxShadow = style;
  })
  obj2.addEventListener('mouseover', () => {
    obj2.style.boxShadow = style;
  })
  obj3.addEventListener('mouseover', () => {
    obj3.style.boxShadow = style;
  })
}
function mouseOverNight(obj1, obj2, obj3, style) {
  obj1.addEventListener('mouseover', () => {
    obj1.style.boxShadow = style;
  })
  obj2.addEventListener('mouseover', () => {
    obj2.style.boxShadow = style;
  })
  obj3.addEventListener('mouseover', () => {
    obj3.style.boxShadow = style;
  })
}
function mouseOutDay(obj1, obj2, obj3, style) {
  obj1.addEventListener('mouseout', () => {
    obj1.style.boxShadow = style;
  })
  obj2.addEventListener('mouseout', () => {
    obj2.style.boxShadow = style;
  })
  obj3.addEventListener('mouseout', () => {
    obj3.style.boxShadow = style;
  })
}
function mouseOutNight(obj1, obj2, obj3, style) {
  obj1.addEventListener('mouseout', () => {
    obj1.style.boxShadow = style;
  })
  obj2.addEventListener('mouseout', () => {
    obj2.style.boxShadow = style;
  })
  obj3.addEventListener('mouseout', () => {
    obj3.style.boxShadow = style;
  })
}

function celciusHandle(temp) {
  return Math.floor((temp - 32) * (5 / 9));
}

function fahrenheitHandle(temp) {
  return Math.floor((temp * (1.8)) + 32);
}

function kelvinHandle(temp) {
  const kelvinBase = 274.15;
  return Math.floor(celciusHandle(temp) + kelvinBase);
}

// const hourDayTab = document.querySelector('.hour-day-tab');

// hourDayTab.addEventListener('click', event => {
//   const target = event.target;
//   hourDayTabHandle(target)
// })

// function hourDayTabHandle(target) {
//   const hourTab = document.querySelector('.hour-tab')
//   const dayTab = document.querySelector('.day-tab')

//   if (target === hourTab) {
//     hourTab.style.borderBottom = '2px solid var(--aqua-clr)'
//     dayTab.style.borderBottom = 'none'
//   } else {
//     dayTab.style.borderBottom = '2px solid var(--aqua-clr)'
//     hourTab.style.borderBottom = 'none'
//   }
// }

const dropdownInner = document.querySelector('.dropdown-inner')
dropdownInner.addEventListener('click', event => {
  dropdownButtonHandle(event);
})

function dropdownButtonHandle(event) {
  const dropdownUl = document.querySelector('.dropdown-inner ul');
  const dropdownI = document.querySelector('.dropdown-inner i');
  // const weatherLocBox = document.querySelector('.weather-loc-box')

  const target = event.target;

  if (target) {
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
  } else {
    dropdownUl.style.display = 'none';
  }
}


function init() {
  backgroundHandle();
  getWeatherData('timeline');
}


document.addEventListener('DOMContentLoaded', () => {
  init();
})
