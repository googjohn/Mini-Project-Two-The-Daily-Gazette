import { timeNow, dateToday } from "./date.js";
import { getIpGeoLocation, getIpInfo, getWeatherData, handleCelcius, handleFahrenheit, handleKelvin, handleWeekdays } from "./script.js";
document.addEventListener('DOMContentLoaded', handleAll);

// global variables
const hourDayForecast = document.querySelector('.hour-day-cards');
const dropdownUl = document.querySelector('.dropdown-inner ul');
const dropdownI = document.querySelector('.dropdown-inner i');
const dropdownInner = document.querySelector('.dropdown-inner');
const timeDigits = parseInt(timeNow().toString().valueOf().slice(0, 8));
const timePm = timeNow().toString().toLowerCase().includes('pm');
const timeAm = timeNow().toString().toLowerCase().includes('am');

// handles usage of weather data
const handleWeatherData = async(endpoint) => {
  const { city, latitude, longitude, state_prov: province } = await getIpGeoLocation();
  // const { city, loc, region: province } = await getIpInfo();
  // const latitude = loc.slice(0, 7);
  // const longitude = loc.slice(8, 16);

  const weatherData = await getWeatherData(endpoint, latitude, longitude);

  const dailyForecast = weatherData.days;
  const hourlyForecast = weatherData.days[0].hours;
  const timeHourly = weatherData.days[0].hours[0];
  const description = weatherData.days[0].description;
  const currentTime = weatherData.currentConditions.datetime.slice(0,2);  
  
  
  const condition = weatherData.currentConditions.conditions;
  const conditionIcon = weatherData.currentConditions.icon;
  const currentTemp = weatherData.currentConditions.temp;

  handleCity(city, province);
  tempChangeHandle(weatherData);
  handleIcon(conditionIcon, condition, currentTime);
  handleDescription(description);
  handleHourDayForecast(weatherData)
}

// call inside handleIcon to utilize condition data argument as argument
const handleConditions = (conditionIcon, currentTime) => {
  switch (conditionIcon) {
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
    case 'cloudy':
      if (currentTime <= 6) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      } else if (currentTime <= 18) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
      } else if (currentTime <= 23) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      }
      // if (!timePm) {
      //   if (currentTime == 12) {
      //     return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
      //   } else if (currentTime < 6) {
      //     return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';    
      //   } else if (currentTime >= 6) {
      //     return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      //   }
      // } else {
      //   if (currentTime == 12) {
      //     return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      //   } else if (currentTime <= 6) {
      //     return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      //   } else if (currentTime > 6) {
      //     return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
      //   }
      // }
    default:
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlySunnyDay.svg'
  }
}

// call inside handleWeatherData to utilize condition icon data as argument
function handleIcon(conditionIcon, condition, currentTime) {
  const currentConditionIcons = document.querySelectorAll('.current-condition-icon');
  currentConditionIcons.forEach( icon => {
    icon.innerHTML = `<img src='${handleConditions(conditionIcon, currentTime)}' title='${condition == "Overcast" ? "Mostly Cloudy" : condition}' alt='condition icon'>`;
  })
}
// call inside handleWeatherData to utilize getIpInfo data as argument
function handleCity(city, province) {
  const currentLocation = document.querySelectorAll('.weather-banner .current-location');
  currentLocation.forEach( location => {
    location.textContent = `${city}, ${province}`;
  })
}

// call inside handleWeatherData to utilize temperature data as argument
function handleDescription(description) {
  const weatherDescription = document.querySelector('.weather-description');
  weatherDescription.textContent = description;
}

// call inside handleWeatherData to utilize temperature data as argument
function tempChangeHandle(weatherData) {
  const currTemp = weatherData.currentConditions.temp;
  const hourTemp = weatherData.days[0].hours[0].temp;
  const dayTemp = weatherData.days[0].temp;

  const hourlyCard = document.querySelectorAll('.hourly-item');
  const dailyCard = document.querySelectorAll('.daily-item');
  const currentTemp = document.querySelectorAll('.current-temp');
  currentTemp.forEach(tempItem => {
    tempItem.setAttribute('title', 'Temperature in Celcius')
    tempItem.innerHTML = `${handleCelcius(currTemp)}&deg;C`;
  })
  const unitContainer = document.querySelector('.unit-container');
  unitContainer.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('celcius')) {
      currentTemp.forEach(tempItem => {
        tempItem.setAttribute('title', 'Temperature in Celcius')
        tempItem.innerHTML = `${handleCelcius(currTemp)}&deg;C`;
      })
      if (hourlyCard) {
        hourlyCard.forEach(tempItem => {
          tempItem.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `${handleCelcius(hourTemp)}&deg;C`;
          // tempItem.innerHTML = `${handleCelcius(hourTemp)}&deg;C`;
        })
      }
      if (dailyCard) {
        dailyCard.forEach(tempItem => {
          tempItem.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `${handleCelcius(dayTemp)}&deg;C`;
          // tempItem.innerHTML = `${handleCelcius(dayTemp)}&deg;C`;
        })
      }
    } else if (target.classList.contains('fahrenheit')) {
      currentTemp.forEach(tempItem => {
        tempItem.setAttribute('title', 'Temperature in Fahrenheit')
        tempItem.innerHTML = `${handleFahrenheit(currTemp)}&deg;F`;
      })
      if (hourlyCard) {
        hourlyCard.forEach(tempItem => {
          tempItem.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `${handleFahrenheit(hourTemp)}&deg;F`;
          // tempItem.innerHTML = `${handleFahrenheit(hourTemp)}&deg;F`;
        })
      }
      if (dailyCard) {
        dailyCard.forEach(tempItem => {
          tempItem.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `${handleFahrenheit(dayTemp)}&deg;F`;
          // tempItem.innerHTML = `${handleFahrenheit(dayTemp)}&deg;F`;
        })
      }
    } else if (target.classList.contains('kelvin')) {
      currentTemp.forEach(tempItem => {
        tempItem.setAttribute('title', 'Temperature in Kelvin')
        tempItem.innerHTML = `${handleKelvin(currTemp)}&deg;K`;
      })
      if (hourlyCard) {
        hourlyCard.forEach(tempItem => {
          tempItem.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `${handleKelvin(hourTemp)}&deg;K`;
          // tempItem.innerHTML = `${handleKelvin(hourTemp)}&deg;K`;
        })
      }
      if (dailyCard) {
        dailyCard.forEach(tempItem => {
          tempItem.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `${handleKelvin(dayTemp)}&deg;K`;
          // tempItem.innerHTML = `${handleKelvin(dayTemp)}&deg;K`;
        })
      }
    }
  })
}

// handle hour and day cards forecast
const handleHourDayForecast = (weatherData) => {
  const hourForecast = document.querySelector('.hourly-forecast');
  const dayForecast = document.querySelector('.daily-forecast');
  const dailyForecast = weatherData.days;
  const hourlyForecast = weatherData.days[0].hours;
  const currentTime = weatherData.currentConditions.datetime.slice(0,2); //check if needs to be parseInt()

  let itemCountHourly = 0;

  for (let key in hourlyForecast) {

    const hourlyCondition = hourlyForecast[key].conditions;
    const hourlyIcon = hourlyForecast[key].icon;
    const hourlyTemp = hourlyForecast[key].temp;
    const hourlyPrecip = hourlyForecast[key].precipprob;
    const hourlyTime = hourlyForecast[key].datetime.slice(0,2);

    const hourlyCard = document.createElement('div');
      hourlyCard.setAttribute('class', 'hourly-item');
      hourlyCard.innerHTML = 
        `<span class="time">${hourlyTime}${
          hourlyTime < 12  ? 'AM' : 'PM'}</span>
        <span class="icon">
          <img src="${handleConditions(hourlyIcon, hourlyTime)}" title="${hourlyCondition == "Overcast" ? "Mostly Cloudy" : hourlyCondition}">
        </span>
        <span class="hourly-temp" title="Temperature">${handleCelcius(hourlyTemp)}&deg;C</span>
        <span class="precipitate" title="Probability of rain">${hourlyPrecip}%</span>`;
    
      if (key >= parseInt(currentTime)) {
        hourForecast.appendChild(hourlyCard);
        itemCountHourly++;   
      }
    
    if (itemCountHourly > 6) {
      break;
    }
  }

  // const currentDate = dailyForecast[0].datetime.slice(8,10);
  // console.log(currentDate, typeof currentDate);
  
  const weekdays = ['Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const now = new Date()
  const day = now.getDay()
  console.log(day, typeof day) // 2 use as index to for weekdays

  const date = now.getDate();
  console.log(date, typeof date) // 20

  const daynow = now.toLocaleString('default', {weekday: 'short'})
  console.log(daynow) // Tue

  const month = now.toLocaleString('default', {month: 'short'})

  let itemCountDaily = 0;

  for (let key in dailyForecast) {
    const dailyCondition = dailyForecast[key].conditions;
    const dailyIcon = dailyForecast[key].icon;
    const dailyTemp = dailyForecast[key].temp;
    const dailyPrecip = dailyForecast[key].precipprob;
    const forecastDays = dailyForecast[key].datetime.slice(8,10)
    console.log(forecastDays, typeof forecastDays) // [20...] convert daynow and then convert to day and then use to get weekday
    const parseDays = dailyForecast[key].datetime
    const pd = Date.parse(parseDays)
    console.log(pd)

    const whatdate = pd / 1000 / 60 / 60 / 24 / 12 / 365
    console.log(whatdate)

    if (forecastDays >= date) {
      const dailyCard = document.createElement('div');
        dailyCard.setAttribute('class', 'daily-item');
        dailyCard.innerHTML = 
          `<span class="day">${month + forecastDays}</span>
          <span class="icon">
            <img src="${handleConditions(dailyIcon)}" title="${dailyCondition == "Overcast" ? "Mostly Cloudy" : dailyCondition}">
          </span>
          <span class="daily-temp" title="Temperature">${handleCelcius(dailyTemp)}&deg;C</span>
          <span class="precipitate" title="Probabality of rain">${dailyPrecip}%</span>`;
        dayForecast.appendChild(dailyCard);
      itemCountDaily++;
    }
    if (itemCountDaily > 6) {
      break;
    }
  }

  tempChangeHandle(weatherData)
}

// background according to time of day and (weather condition soon to follow)
const handleBackground = () => {
  const weatherBanner = document.querySelector('.weather-banner');
  const forecastContainer = document.querySelector('.forecast-container');

  const hourlyCards = document.querySelectorAll('.hourly-item');
  const dailyCards = document.querySelectorAll('.daily-item');
  const boxShadowLightDown = '-4px 4px 10px 0 rgba(255, 255, 255, 0.3), 4px -4px 10px 0 rgba(0, 0, 0, 0.25)';
  const boxShadowLightDownInset = '-4px 4px 10px 0 rgba(255, 255, 255, 0.3) inset, 4px -4px 10px 0 rgba(0, 0, 0, 0.25) inset';

  const bg = {
    pm : "url('./images/icons/weather_backgrounds/sky-clear-night.jpg') no-repeat center/cover", 
    am : "url('./images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center/cover",
    amCloudy : "url('./images/icons/weather_backgrounds/sky-clouds-background.jpg') no-repeat center/cover",
  }

  if (!timePm) {
    if (timeDigits == 12) {
      forecastContainer.style.background = bg.pm;
      weatherBanner.style.background = bg.pm;
      hourlyCards.forEach(card => {
        card.style.boxShadow = boxShadowLightDown;
        mouseOverNight(card, boxShadowLightDownInset)
        mouseOutNight(card, boxShadowLightDown)
      })
      dailyCards.forEach(card => {
        card.style.boxShadow = boxShadowLightDown;
        mouseOverNight(card, boxShadowLightDownInset)
        mouseOutNight(card, boxShadowLightDown)
      })
      dropdownUl.style.boxShadow = boxShadowLightDown;
      mouseOverNight(dropdownUl, boxShadowLightDownInset)
      mouseOutNight(dropdownUl, boxShadowLightDown)
    } else if (timeDigits < 6) {
      forecastContainer.style.background = bg.pm;
      weatherBanner.style.background = bg.pm;
      hourlyCards.forEach(card => {
        card.style.boxShadow = boxShadowLightDown;
        mouseOverNight(card, boxShadowLightDownInset)
        mouseOutNight(card, boxShadowLightDown)
      })
      dailyCards.forEach(card => {
        card.style.boxShadow = boxShadowLightDown;
        mouseOverNight(card, boxShadowLightDownInset)
        mouseOutNight(card, boxShadowLightDown)
      })
      dropdownUl.style.boxShadow = boxShadowLightDown;
      mouseOverNight(dropdownUl, boxShadowLightDownInset)
      mouseOutNight(dropdownUl, boxShadowLightDown)
    } else if (timeDigits >= 6) {
      forecastContainer.style.background = bg.am;
      weatherBanner.style.background = bg.am;
    }
  } else {
    if (timeDigits == 12) {
      forecastContainer.style.background = bg.am;
      weatherBanner.style.background = bg.am;
    } else if (timeDigits < 6) {
      forecastContainer.style.background = bg.am;
      weatherBanner.style.background = bg.am;
    } else if (timeDigits >= 6) {
      forecastContainer.style.background = bg.pm;
      weatherBanner.style.background = bg.pm;
      hourlyCards.forEach(card => {
        card.style.boxShadow = boxShadowLightDown;
        mouseOverNight(card, boxShadowLightDownInset)
        mouseOutNight(card, boxShadowLightDown)
      })
      dailyCards.forEach(card => {
        card.style.boxShadow = boxShadowLightDown;
        mouseOverNight(card, boxShadowLightDownInset)
        mouseOutNight(card, boxShadowLightDown)
      })
      dropdownUl.style.boxShadow = boxShadowLightDown;
      mouseOverNight(dropdownUl, boxShadowLightDownInset)
      mouseOutNight(dropdownUl, boxShadowLightDown)
    }
  }
}

// call inside document event listener to utilize event target as argument
const handleHourDaySelection = (target) => { 

  const hourlyForecast = document.querySelector('.hourly-forecast');
  const dailyForecast = document.querySelector('.daily-forecast');
  const prevElement = target.previousElementSibling;
  const nextElement = target.nextElementSibling;

  if (target.classList.contains('hour-tab')) {
    if (target.classList.contains('active')) {
      dailyForecast.style.display = 'none';
      dailyForecast.classList.remove('active');
    } else {
      target.classList.add('active');
      nextElement.classList.remove('active');
      hourlyForecast.style.display = 'flex';
      dailyForecast.style.display = 'none'
    }
  } else if (target.classList.contains('day-tab')) {
    if (target.classList.contains('active')) {
      hourlyForecast.style.display = 'none';
      dailyForecast.style.display = 'flex';
    } else {
      target.classList.add('active');
      prevElement.classList.remove('active');
      dailyForecast.style.display = 'flex';
      hourlyForecast.style.display = 'none'
    }
  }
}

// call inside document event listener to utilize event target as argument
const handleDropdownButton = (target) => {
  if (target) {
    if (target === dropdownI || target === dropdownInner) {
      dropdownI.classList.add('active');
      dropdownInner.classList.add('active');
      if (dropdownUl.style.display != 'block') {
        dropdownUl.style.display = 'block';
      } else {
        dropdownUl.style.display = 'none';
        dropdownI.classList.remove('active');
        dropdownInner.classList.remove('active');
      }
    } else {
      dropdownUl.style.display = 'none';
      dropdownI.classList.remove('active');
      dropdownInner.classList.remove('active');
    }
  } else {
    dropdownUl.style.display = 'none';
    dropdownI.classList.remove('active');
    dropdownInner.classList.remove('active');
  }
}

function handleVisibleElements() {
    dropdownUl.style.display = 'none';
    dropdownInner.classList.remove('active');
    dropdownI.classList.remove('active');
}

function mouseOverNight (obj, style) {
  obj.addEventListener('mouseover', () => {
    obj.style.boxShadow = style;
  })
}
function mouseOutNight (obj, style) {
  obj.addEventListener('mouseout', () => {
    obj.style.boxShadow = style;
  })
}

function handleAll () {
  handleBackground();
  handleWeatherData('timeline');

  document.addEventListener( 'click', event => {
    const target = event.target;
    handleHourDaySelection(target);
    handleDropdownButton(target);
  })

  const weatherContainer = document.querySelector('.weather-container');
  weatherContainer.addEventListener('mouseleave', handleVisibleElements)
}

