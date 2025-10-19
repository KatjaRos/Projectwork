
//Project work 2, Weather application, Katja Rossi 1067110-->
// got help from: https://www.geeksforgeeks.org/javascript/build-a-weather-app-in-html-css-javascript/
 // and from:  https://www.w3schools.com/html/html5_geolocation.asp 
 // API:s  from: 
 // www.meteoblue.com+weather-icons,
 // https://openweathermap.org/current
 // geolocation from browser
  //and https://open-meteo.com/ for 24-hour weather
  // and https://www.youtube.com/watch?v=HS7GfTuJgA8&embeds_referring_euri=https%3A%2F%2Fwww.bing.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.bing.com&source_ve_path=Mjg2NjY
// https://www.youtube.com/watch?v=f0U8PP6Kf4c
const getData  = async() => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const API_key = "35ec31ba8dffe480f7c0aa178f1ae6e8";
    const initial_city = "Helsinki,FI";
    
    get_location(async (coords) =>{

        if (coords) {
            const {latitude, longitude }=coords
            const res = await fetch(
                `${url}?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`
            );
            const data = await res.json();
            if (res.ok)
                showWeather(data);

        } else{
            const res = await fetch(`${url}?q=${initial_city}&appid=${API_key}&units=metric`);
            const data = await res.json();
            if(!res.ok)
                return;
            showWeather(data);

        }
});

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
const getFutureData= async() =>{
    API_key =  "7Z1Dk4QOVhbrBsSg";
    const url = "https://my.meteoblue.com/packages/basic-1h_basic-day";

    get_location(async (coords) => {
        let latitude, longitude;

        if (coords) {
            latitude = coords.latitude;
            longitude = coords.longitude;
        } else {
            latitude = 60.1699; 
            longitude = 24.9384;
        }

        try {
            const res = await fetch(`${url}?lat=${latitude}&lon=${longitude}&apikey=${API_key}`);
            const data = await res.json();
            if (res.ok) {
                showFutureWeather(data, latitude, longitude);
            } else {
                console.error("Meteoblue error:", data);
            }
        } catch (e) {
            console.error("Fetch failed:", e);
        }
    });
};
const getHourlyData = async () => {
    const url = "https://api.open-meteo.com/v1/forecast";
    console.log("getHourlyData kutsuttu");
    get_location(async (coords) => {
        let latitude, longitude;
        if (coords) {
            latitude = coords.latitude;
            longitude = coords.longitude;
        } else {
            latitude = 60.1699;
            longitude = 24.9384;
        }

        try {
            const res = await fetch(
                `${url}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m&forecast_days=1&timezone=auto`
            );
            if (!res.ok) {
                return;
            }
            const data = await res.json();

            if (data && data.hourly && data.hourly.time) {
                show24hrWeather(data);
            } else {
                console.warn("No data.");
            }

        } catch (e) {
            console.error("Fetch failed:", e);
        }
    });
};



const showFutureWeather = (data, latitude, longitude) => {
    const weather_items_list = document.getElementById("items-list");
    weather_items_list.innerHTML = "";

    const times = data.data_1h.time;
    const temps = data.data_1h.temperature;
    const icons = data.data_1h.pictocode;
    const rainProbs = data.data_1h.precipitation_probability;
    
    const pic = {
        //used chatgpt and 
    // https://content.meteoblue.com/en/research-education/specifications/standards/symbols-and-pictograms
    // and downloaded zip of icons fro the page and used chatgpt for a little help with the come implementation
        "1_day": "media/01_day.png",
        "1_night": "media/01_night.png",
        "2_day": "media/02_day.png",
        "2_night": "media/02_night.png",
        "3_day": "media/03_day.png",
        "3_night": "media/03_night.png",
        "4_day": "media/04_day.png",
        "4_night": "media/04_night.png",
        "5_day": "media/05_day.png",
        "5_night": "media/05_night.png",
        "6_day": "media/06_day.png",
        "6_night": "media/06_night.png",
        "7_day": "media/07_day.png",
        "7_night": "media/07_night.png",
        "8_day": "media/08_day.png",
        "8_night": "media/08_night.png",
        "9_day": "media/09_day.png",
        "9_night": "media/09_night.png",
        "10_day": "media/10_day.png",
        "10_night": "media/10_night.png",
        "11_day": "media/11_day.png",
        "11_night": "media/11_night.png",
        "12_day": "media/12_day.png",
        "12_night": "media/12_night.png",
        "13_day": "media/13_day.png",
        "13_night": "media/13_night.png",
        "14_day": "media/14_day.png",
        "14_night": "media/14_night.png",
        "15_day": "media/15_day.png",
        "15_night": "media/15_night.png",
        "16_day": "media/16_day.png",
        "16_night": "media/16_night.png",
        "17_day": "media/17_day.png",
        "17_night": "media/17_night.png",
        "18_day": "media/18_day.png",
        "18_night": "media/18_night.png",
        "19_day": "media/19_day.png",
        "19_night": "media/19_night.png",
        "20_day": "media/20_day.png",
        "20_night": "media/20_night.png",
        "21_day": "media/21_day.png",
        "21_night": "media/21_night.png",
        "22_day": "media/22_day.png",
        "22_night": "media/22_night.png",
        "23_day": "media/23_day.png",
        "23_night": "media/23_night.png",
        "24_day": "media/24_day.png",
        "24_night": "media/24_night.png",
        "25_day": "media/25_day.png",
        "25_night": "media/25_night.png",
        "26_day": "media/26_day.png",
        "26_night": "media/26_night.png",
        "27_day": "media/27_day.png",
        "27_night": "media/27_night.png",
        "28_day": "media/28_day.png",
        "28_night": "media/28_night.png",
        "29_day": "media/29_day.png",
        "29_night": "media/29_night.png",
        "30_day": "media/30_day.png",
        "30_night": "media/30_night.png",
        "31_day": "media/31_day.png",
        "31_night": "media/31_night.png",
        "32_day": "media/32_day.png",
        "32_night": "media/32_night.png",
        "33_day": "media/33_day.png",
        "33_night": "media/33_night.png",
        "34_day": "media/34_day.png",
        "34_night": "media/34_night.png",
        "35_day": "media/35_day.png",
        "35_night": "media/35_night.png",
        "default": "media/day.png" 
    };
    const getLocalIcon = (code, isDay) => {
        const key = `${code}_${isDay ? "day" : "night"}`;
        return pic[key] || pic["default"];
    };

    for (let i = 0; i < times.length; i += 24) {
        const date = new Date(times[i]);
        const day = date.toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "short" });
        const temp = Math.round(temps[i]);
        const rain = rainProbs[i];
        const code = icons[i];
 
        const isDay = data.data_1h.isdaylight[i] === 1;
        const iconName = getLocalIcon(code, isDay) || "media/day.png";

        const li = document.createElement("li");
        li.innerHTML = `<h4>${day}</h4>
        <img src="${iconName}" alt="Weather Icon">
        <p>${temp}°C</p>
        <p>Rain probability: ${rain}%</p>`;
        weather_items_list.appendChild(li);
    }

    const meteogram_img = document.getElementById("meteogram");
    const API_key = "7Z1Dk4QOVhbrBsSg";
    meteogram_img.src = `https://my.meteoblue.com/images/meteogram?lat=${latitude}&lon=${longitude}&asl=279&tz=Europe%2FZurich&apikey=${API_key}&format=png&dpi=72&lang=en&temperature_units=C&precipitation_units=mm&windspeed_units=kmh`;
};
const show24hrWeather= (data)=>{
    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;
    const winds = data.hourly.wind_speed_10m;
    const hour_list = document.getElementById("hourly-list");
    hour_list.innerHTML ="";
    for (let i = 0; i < 24; i++){
        const time = new Date(times[i]).toLocaleTimeString("fi-FI",{
            hour: "2-digit", minute: "2-digit"});
        const temp =temps[i];
        const wind = winds[i];

        const li = document.createElement("li");
        li.innerHTML = `<strong>${time}</strong><br>
            ${temp}°C<br>
            Wind: ${wind} m/s;
        `;
        hour_list.appendChild(li)
    }
};

const get_location = (callback)=>{

    if (!navigator.geolocation) {
        alert("Browser doesn't support geolocation");
        callback(null);
        return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        callback({ latitude, longitude});
    },
    (error) => {
        console.log("Location search failed:", error);
        alert("Location not found, default city used")
        callback(null);
    }
    );
    
};

getData();
getFutureData();
getHourlyData();



