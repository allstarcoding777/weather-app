const apiKey = "9e0ac90150cb2c38c075937a5cbd8eac";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="; // Changed units to imperial for Fahrenheit

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F"; 
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " mph";
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "assets/images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "assets/images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "assets/images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "assets/images/drizzle.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "assets/images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "assets/images/snow.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});