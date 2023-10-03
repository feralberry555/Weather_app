const apiKey = "479e842b082406c4861b2872e7a28fef";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.getElementById('loupe');
const searchFavoriteBtn = document.getElementById('favourites');
const weatherIcon = document.querySelector('.weather_icon');

async function checkWeather(city) {   
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

	if(response.status == 404) {
		document.querySelector('.error').style.display = 'block'; 
		document.querySelector('.weather').style.display = 'none';
		document.querySelector('.favourites').style.display = 'none'; 
	} else {
			var data = await response.json();

	document.querySelector('.city').innerHTML = data.name;
	document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c'; //Math.round - возвращает число к округлённое к ближайшему целому числу
	document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
	document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

	if(data.weather[0].main == 'Clouds') {
		weatherIcon.src = 'img/clouds.png';
	} 
	else if(data.weather[0].main == 'Clear') {
		weatherIcon.src = 'img/clear.png';
	}
	else if(data.weather[0].main == 'Rain') {
		weatherIcon.src = 'img/rain.png';
	}
	else if(data.weather[0].main == 'Drizzle') {
		weatherIcon.src = 'img/drizzle.png';
	}
	else if(data.weather[0].main == 'Mist') {
		weatherIcon.src = 'img/mist.png';
	}

	document.querySelector('.weather').style.display = 'block';
	document.querySelector('.error').style.display = 'none'; 

	document.querySelector('.favourites').style.display = 'none';
			}
}

document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		checkWeather(searchBox.value);
	}
}) //Обработчик события связанный с выполнением поиска по клавиши Enter

searchBtn.addEventListener('click', ()=>{
	checkWeather(searchBox.value);
}) //Обработчик события связанный с выполнением поиска по кнопке Поиск

document.addEventListener('keydown', function (e) {
	if (e.key === '1') {
		document.querySelector('.favourites').style.display = 'block';
		document.querySelector('.weather').style.display = 'none';
	}
});

searchFavoriteBtn.onclick = function () {
	document.querySelector('.favourites').style.display = 'block';
	document.querySelector('.weather').style.display = 'none';
};



//async - перед функцией означает что, функция всегда 
//возвращает обещание, а другие значения автоматически заворачиваются в разрешённое обещание.
//Обещание (promise) - специальный объект, который содержи своё состояное.
//Вначале pending («ожидание»), затем – одно из: fulfilled («выполнено успешно») или rejected («выполнено с ошибкой»).

// await - оператор, используется для ожидания окончания promise,
// может быть использован только внутри async function или на 
// верхнем уровне модуля.

//Функция fetch () - это удобный способ отправки HTTP -запросов в JavaScript.
//Она позволяет получать данные с сервера и отправлять данные на сервер, 
//используя различные методы HTTP-запросов. Кроме того, функция fetch () позволяет устанавливать различные 
//параметры запроса, такие как заголовки, методы, тело запроса и т.д.

// Обаботчик события по клавиши
// document.addEventListener('keydown', function (e) {
// 	console.log(e);
// })
// Так можно получить всю инфу о нажатой клавиши, написать этот код и нажать
// клавишу, о которой мы хотим узнать информацию. 
