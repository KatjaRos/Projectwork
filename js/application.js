

const getData  = async() => {

    
    const initial_city = "Helsinki";
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const API_key = "35ec31ba8dffe480f7c0aa178f1ae6e8";

    const res = await fetch(`${url}?q=${initial_city}&appid=${API_key}&units=metric`
);
    const data = await res.json();
    if(!res.ok)
        return;
    showWeather(data);

    city_Button = document.getElementById("location-submit");
    city_Button.addEventListener("click", async () => {
        const city = document.getElementById("location-input").value.trim().toLowerCase();
        const res = await fetch(`${url}?q=${city}&appid=${API_key}&units=metric`
);
        const data = await res.json();
        if(!res.ok)
            return;
        showWeather(data);
    });

};
const showWeather= async(data)=>{
    const location_text = document.getElementById("location");
    const temp_text = document.getElementById("temp");
    const wind = document.getElementById("wind")
    const more_info = document.getElementById("info");
    const weather_img = document.getElementById("weather-img")
    location_text.textContent = data.name;
    weather_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    temp_text.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`
    more_info.textContent =`Clarity: ${data.weather[0].description}`;

};
getData();