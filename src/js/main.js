const myKey = config.KEY;
const LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const KEY = `&appid=${myKey}`;
const UNITS = '&units=metric';
const input = document.querySelector('.weather__body-input');
const button = document.querySelector('.weather__body-button');
const City = document.querySelector('.weather__body-city');
const imgWeather = document.querySelector('.weather__body-photo');
const temperature = document.querySelector('.weather__body-temp');
const humidity = document.querySelector('.weather__body-hum');
const windSp = document.querySelector('.weather__body-wind');
const error = document.querySelector('.weather__body-error');
const getWeather = () => {
	const inputValue = input.value || 'Warsaw';
	const URL = LINK + inputValue + KEY + UNITS;
	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const wind = res.data.wind.speed;
			const weatherId = res.data.weather[0].id;
			City.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + '℃';
			humidity.textContent = hum + '%';
			windSp.textContent = Math.floor(wind) + 'm/s';
			error.textContent = '';
			input.value = '';
			if (weatherId >= 200 && weatherId < 300) {
				imgWeather.setAttribute('src', '../../dist/img/thunder.png');
			} else if (weatherId >= 300 && weatherId < 400) {
				imgWeather.setAttribute('src', '../../dist/img/cloud.png');
			} else if (weatherId >= 500 && weatherId < 600) {
				imgWeather.setAttribute('src', '../../dist/img/rain.png');
			} else if (weatherId >= 600 && weatherId < 700) {
				imgWeather.setAttribute('src', '../../dist/img/ice.png');
			} else if (weatherId >= 700 && weatherId < 800) {
				imgWeather.setAttribute('src', '../../dist/img/drizzle.png');
			} else if (weatherId === 800) {
				imgWeather.setAttribute('src', '../../dist/img/sun.png');
			} else if (weatherId >= 800 && weatherId < 900) {
				imgWeather.setAttribute('src', '../../dist/img/sun-cloud.png');
			} else {
				imgWeather.setAttribute('src', '../../forecast.png');
			}
		})
		.catch(() => (error.textContent = 'Please enter a valid city name'));
};
const enter = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};
getWeather();
input.addEventListener('keyup', enter);
button.addEventListener('click', getWeather);
