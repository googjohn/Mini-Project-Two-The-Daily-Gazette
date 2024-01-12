// set date function
function dateToday() {
    const day_Today = document.querySelector('.date-today');
    const date = new Date();
    const dateOptions = {
        month: 'long',
        weekday: 'long',
        day: '2-digit',
    }
    
    // using iternationalization api for global time format
    const { weekday, day, month } = new Intl.DateTimeFormat('default', dateOptions).formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

    // using a much simpler formatting
    const currentDay = date.toLocaleString('default', { weekday: 'long' });
    const currentDate = date.toLocaleString('default', { day: '2-digit' });
    const currentMonth = date.toLocaleString('default', { month: 'long'});

    return day_Today.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;
} 
// dateToday();

// set time function
function timeNow() {
    const time_Now = document.querySelector('.time-now');
    const date = new Date();

    let hours = date.getHours().toLocaleString();
    let ampm = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours < 10 ? hours = '0' + hours : hours;

    let minutes = date.getMinutes().toLocaleString();
    minutes < 10 ? minutes = '0' + minutes : minutes;

    let seconds = date.getSeconds().toLocaleString();
    seconds < 10 ? seconds = '0' + seconds : seconds;


    return time_Now.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
}

const intervalId = setInterval(timeNow, 1000);
setTimeout(intervalId, 0)
