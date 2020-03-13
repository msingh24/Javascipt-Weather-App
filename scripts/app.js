const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();



const updateUI = (data) => {
   
    // destructure, faster way
    // const { cityDets, weather } = data;
    const cityDets = data.cityDets;
    const weather = data.weather;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    // Tenary operator
    // does the same thing as the if statement
    // first option returns if true
    // second option returns if false

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';


    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);


    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

// // used for async function
// const updateCity = async (city) => {
//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);
//     return {cityDets,weather};
//         // cityDets: cityDets, (if names are the same write it like that)
//         // weather: weather
// };


cityForm.addEventListener('submit', e => {
    // prevent refreshing
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with a new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    
    // set the local storage
        localStorage.setItem('city', city);
});

// if theres a city get it and put it in the dom

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
         .then(data => updateUI(data))
         .catch(err => console.log(err));
} 