


const getData  = async() => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const API_key = "35ec31ba8dffe480f7c0aa178f1ae6e8";
    const initial_city = "Helsinki";
    
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

const showFutureWeather = (data, latitude, longitude) => {
    const weather_items_list = document.getElementById("items_list");
    weather_items_list.innerHTML = "";

    const times = data.data_1h.time;
    const temps = data.data_1h.temperature;
    const icons = data.data_1h.pictocode;
    const rainProbs = data.data_1h.precipitation_probability;
    const isDaylightArr = data.data_1h.isdaylight;
    
    const pic = {
        //used chatgpt and 
    // https://content.meteoblue.com/en/research-education/specifications/standards/symbols-and-pictograms
    // and downloaded zip of icons fro the page and used chatgpt for a little help with the come implementation
        "1_day": "js/01_day.png",
        "1_night": "js/01_night.png",
        "2_day": "js/02_day.png",
        "2_night": "js/02_night.png",
        "3_day": "js/03_day.png",
        "3_night": "js/03_night.png",
        "4_day": "js/04_day.png",
        "4_night": "js/04_night.png",
        "5_day": "js/05_day.png",
        "5_night": "js/05_night.png",
        "6_day": "js/06_day.png",
        "6_night": "js/06_night.png",
        "7_day": "js/07_day.png",
        "7_night": "js/07_night.png",
        "8_day": "js/08_day.png",
        "8_night": "js/08_night.png",
        "9_day": "js/09_day.png",
        "9_night": "js/09_night.png",
        "10_day": "js/10_day.png",
        "10_night": "js/10_night.png",
        "11_day": "js/11_day.png",
        "11_night": "js/11_night.png",
        "12_day": "js/12_day.png",
        "12_night": "js/12_night.png",
        "13_day": "js/13_day.png",
        "13_night": "js/13_night.png",
        "14_day": "js/14_day.png",
        "14_night": "js/14_night.png",
        "15_day": "js/15_day.png",
        "15_night": "js/15_night.png",
        "16_day": "js/16_day.png",
        "16_night": "js/16_night.png",
        "17_day": "js/17_day.png",
        "17_night": "js/17_night.png",
        "18_day": "js/18_day.png",
        "18_night": "js/18_night.png",
        "19_day": "js/19_day.png",
        "19_night": "js/19_night.png",
        "20_day": "js/20_day.png",
        "20_night": "js/20_night.png",
        "21_day": "js/21_day.png",
        "21_night": "js/21_night.png",
        "22_day": "js/22_day.png",
        "22_night": "js/22_night.png",
        "23_day": "js/23_day.png",
        "23_night": "js/23_night.png",
        "24_day": "js/24_day.png",
        "24_night": "js/24_night.png",
        "25_day": "js/25_day.png",
        "25_night": "js/25_night.png",
        "26_day": "js/26_day.png",
        "26_night": "js/26_night.png",
        "27_day": "js/27_day.png",
        "27_night": "js/27_night.png",
        "28_day": "js/28_day.png",
        "28_night": "js/28_night.png",
        "29_day": "js/29_day.png",
        "29_night": "js/29_night.png",
        "30_day": "js/30_day.png",
        "30_night": "js/30_night.png",
        "31_day": "js/31_day.png",
        "31_night": "js/31_night.png",
        "32_day": "js/32_day.png",
        "32_night": "js/32_night.png",
        "33_day": "js/33_day.png",
        "33_night": "js/33_night.png",
        "34_day": "js/34_day.png",
        "34_night": "js/34_night.png",
        "35_day": "js/35_day.png",
        "35_night": "js/35_night.png",
        "default": "js/day.png" 
    };

    const getLocalIcon = (pictocode, isDaylight) => {
        const key = `${pictocode}_${isDaylight ? "day" : "night"}`;
        return pic[key] || pic["default"];
    };



    for (let i = 0; i < times.length; i += 24) {
        const date = new Date(times[i]);
        const day = date.toLocaleDateString("fi-FI", {
            weekday: "short",
            day: "numeric",
            month: "short"
        });

        const temp = Math.round(temps[i]);
        const rain = rainProbs[i];
        const code = icons[i];
        const isDay = isDaylightArr[i]
        const iconName = getLocalIcon(code, isDay);

        const li = document.createElement("li");
        li.innerHTML = `
            <h4>${day}</h4>
            <img src="${iconName}" alt="Weather icon ${code}" style="width:40px;height:40px;">
            <p>${temp}°C</p>
            <p>Rain probability: ${rain}%</p>
        `;
        weather_items_list.appendChild(li);
    }

    const meteogram_img = document.getElementById("meteogram");
    const API_key = "7Z1Dk4QOVhbrBsSg";
    const url = `https://my.meteoblue.com/images/meteogram?lat=${latitude}&lon=${longitude}&asl=279&tz=Europe%2FZurich&apikey=${API_key}&format=png&dpi=72&lang=en&temperature_units=C&precipitation_units=mm&windspeed_units=kmh`;
    meteogram_img.src = url;
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