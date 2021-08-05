const weatherResult = document.querySelector('.weather__result');
const submitForm = document.querySelector('.submit-form');
const inputCity = document.querySelector('.input-city');
const errMessageSpan = document.querySelector('.error-message');
const dateEl = document.querySelector('.date');
const temperatureEl = document.querySelector('.temperature');
const cityEl = document.querySelector('.city');
const descriptionEl = document.querySelector('.description');
const windEl = document.querySelector('.wind');
const timeEl = document.querySelector('.time');
const humidityEl = document.querySelector('.humidity');

const getWeather = async city => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c3dc5919a38b3e215555255e7839b78f`
        const res = await fetch(url);
        if (!res.ok) {
            const message = `An error has occurred: ${res.status}, city not found`;
            throw new Error(message);
        }
        const data = await res.json();
        return data;
}

const showInConsole = (name, country, main, description, temp, speed, timezone) => {
    console.log('----------------------------------------------');
    console.log(`The weather in city ${name} in ${country}.`);
    console.log('----------------------------------------------');
    console.log(`Today: ${main}, ${description}.`);
    console.log('----------------------------------------------');
    console.log(`The temperature is ${temp} Kelvin / ${convertToCelsius(temp)} degrees Celsius.`);
    console.log('----------------------------------------------');
    console.log(`The wind speed is ${speed} m/s or ${convertToKilPerHour(speed)} km/h.`);
    console.log('----------------------------------------------');
    console.log(`Current time in ${name} is ${getCurrentTimeInCity(timezone)}.`);
    console.log('----------------------------------------------');
}

const convertToCelsius = temp => {
    return Math.floor(temp - 273.15);
}


const convertToKilPerHour = speed =>  {
    return Math.ceil(speed * 18 / 5);
}

const getCurrentTimeInCity = timezone => {
    const date = new Date();
    const actualTime = new Date((date.getTime())+timezone*1000).toISOString();
    let result = actualTime.match(/\d\d:\d\d/);
    return result[0];
}

const showWeather = data => {
    const { main, description } = data.weather[0];
    const { name, timezone } = data;
    const { temp, humidity } = data.main;
    const { country } = data.sys;
    const { speed } = data.wind;

    const date = new Date();

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    weatherResult.classList.add('weather__result--active');

    errMessageSpan.textContent = '';
    dateEl.textContent = `${weekdays[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}`;
    temperatureEl.textContent = `${convertToCelsius(temp)}°C`;
    cityEl.textContent = `${name}, ${country}`;
    descriptionEl.textContent = `${main}, ${description}`;
    windEl.textContent = `Wind: ${convertToKilPerHour(speed)} km/h`;
    timeEl.textContent = getCurrentTimeInCity(timezone);
    humidityEl.textContent = `Humidity: ${humidity}%`;

    showInConsole(name, country, main, description, temp, speed, timezone);
}

const showError = err => {
    weatherResult.classList.remove('weather__result--active');
    errMessageSpan.textContent = err.message;
}

const getCity = e => {
    e.preventDefault();
    getWeather(inputCity.value)
        .then(data => {
            return showWeather(data);
        })
        .catch(err => {
            return showError(err);
        });
    inputCity.value = '';
};

submitForm.addEventListener('submit', getCity);

let ml4 = {};
ml4.opacityIn = [0,1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;

anime.timeline({loop: true})
    .add({
        targets: '.ml4 .letters-1',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
    })
    .add({
    targets: '.ml4 .letters-1',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
    })
    .add({
    targets: '.ml4 .letters-2',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
    })
    .add({
    targets: '.ml4 .letters-2',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
    })
    .add({
    targets: '.ml4 .letters-3',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
    })
    .add({
    targets: '.ml4 .letters-3',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
    })
    .add({
    targets: '.ml4',
    opacity: 0,
    duration: 500,
    delay: 500
});

