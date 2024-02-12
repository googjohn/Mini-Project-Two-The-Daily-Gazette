import { timeNow } from "./date.js";
import { getIpInfo, getWeatherData, handleCelcius, handleFahrenheit, handleKelvin } from "./script.js";
document.addEventListener('DOMContentLoaded', handleAll);

// global variables
const weatherContainer = document.querySelector('.weather-container');
const dropdownUl = document.querySelector('.dropdown-inner ul');
const dropdownI = document.querySelector('.dropdown-inner i');
const dropdownInner = document.querySelector('.dropdown-inner');
const timeDigits = parseInt(timeNow().toString().valueOf().slice(0, 8));
const timePm = timeNow().toString().toLowerCase().includes('pm');

const handleWeatherData = async(endpoint) => {
  const { city, loc, region } = await getIpInfo();
  const latitude = loc.slice(0, 7);
  const longitude = loc.slice(8, 16);

  const { currentConditions, days } = await getWeatherData(endpoint, latitude, longitude);
  console.log(currentConditions);

  const dailyForecast = days;
  console.log(dailyForecast);
  const hourlyForecast = days[0].hours;
  const currentTime = currentConditions.datetime;
  console.log(currentTime);
  const timeHourly = days[0].hours[0].datetime;
  const condition = currentConditions.conditions;
  const conditionIcon = currentConditions.icon;
  const currentTemp = currentConditions.temp;
  const description = days[0].description;

  handleCity(city, region);
  tempChangeHandle(currentTemp);
  handleIcon(conditionIcon, condition);
  handleDescription(description);
}

const handleBackground = () => {
  const weatherBanner = document.querySelector('.weather-banner')
  const forecastContainer = document.querySelector('.forecast-container')
  const bg = {
    timePM : "url('./images/icons/weather_backgrounds/dark-blue-sky.jpg') no-repeat top center/cover", 
    timeAM : "url('./images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat top center/cover"
  }

  if (!timePm) {
    if (timeDigits == 12) {
      forecastContainer.style.background = bg.timePM;
      weatherBanner.style.background = bg.timePM;
    } else if (timeDigits < 6) {
      forecastContainer.style.background = bg.timePM;
      weatherBanner.style.background = bg.timePM;
    } else if (timeDigits >= 6) {
      forecastContainer.style.background = bg.timeAM;
      weatherBanner.style.background = bg.timeAM;
    }
  } else {
    if (timeDigits == 12) {
      forecastContainer.style.background = bg.timeAM;
      weatherBanner.style.background = bg.timeAM;
    } else if (timeDigits < 6) {
      forecastContainer.style.background = bg.timeAM;
      weatherBanner.style.background = bg.timeAM;
    } else if (timeDigits >= 6) {
      forecastContainer.style.background = bg.timePM;
      weatherBanner.style.background = bg.timePM;
    }
  }
}

// call inside handleIcon to utilize condition data argument as argument
const handleConditions = (conditionIcon) => {
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
    case 'overcast':
      if (!timePm) {
        if (timeDigits == 12) {
          return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
        } else if (timeDigits < 6) {
          return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';    
        } else if (timeDigits >= 6) {
          return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
        }
      } else {
        if (timeDigits == 12) {
          return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
        } else if (timeDigits < 6) {
          return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
        } else if (timeDigits >= 6) {
          return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
        }
      }
      break;
    default:
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlySunnyDay.svg'
  }
}

// call inside handleWeatherData to utilize condition icon data as argument
function handleIcon(conditionIcon, condition) {
  const currentConditionIcons = document.querySelectorAll('.current-condition-icon');
  currentConditionIcons.forEach( icon => {
    icon.innerHTML = `<img src='${handleConditions(conditionIcon)}' title='${condition}' alt='condition icon'>`;
  })
}
// call inside handleWeatherData to utilize getIpInfo data as argument
function handleCity(city, region) {
  const currentLocation = document.querySelectorAll('.weather-banner .current-location');
  currentLocation.forEach( location => {
    location.textContent = `${city}, ${region}`;
  })
}

// call inside handleWeatherData to utilize temperature data as argument
function handleDescription(description) {
  const weatherDescription = document.querySelector('.weather-description');
  weatherDescription.textContent = description;
}

// call inside handleWeatherData to utilize temperature data as argument
function tempChangeHandle(temperature) {
  const currentTemp = document.querySelectorAll('.current-temp');
  currentTemp.forEach(temp => {
    temp.innerHTML = `${handleCelcius(temperature)}&deg;C`;
  })
  const unitContainer = document.querySelector('.unit-container');
  unitContainer.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('celcius')) {
      currentTemp.forEach(temp => {
        temp.innerHTML = `${handleCelcius(temperature)}&deg;C`;
      })
    } else if (target.classList.contains('fahrenheit')) {
      currentTemp.forEach(temp => {
        temp.innerHTML = `${handleFahrenheit(temperature)}&deg;F`;
      })
    } else if (target.classList.contains('kelvin')) {
      currentTemp.forEach(temp => {
        temp.innerHTML = `${handleKelvin(temperature)}&deg;K`;
      })
    }
  })
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
  weatherContainer.addEventListener('mouseleave', () => {
    dropdownUl.style.display = 'none';
    dropdownInner.classList.remove('active');
    dropdownI.classList.remove('active');
  })
}

function handleAll () {
  handleVisibleElements();
  handleBackground();
  handleWeatherData('timeline');

  document.addEventListener( 'click', event => {
    const target = event.target;
    handleHourDaySelection(target);
    handleDropdownButton(target);

  })
}