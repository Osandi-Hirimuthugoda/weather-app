const countryInput = document.querySelector(".country-btn")
const cityInput = document.querySelector(".city-btn")
const searchButton = document.querySelector(".search-btn")
 
const API_KEY = "4d715cb6c0d141d2ac6161403231909";
const BASE_URL ="http://api.weatherapi.com/v1";

const getCityCoordinates = () => {
    const countryName = countryInput.value.trim();
    if(!countryName) return;
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${countryName}&limit=1&appid=${API_KEY}`;

    fetch(GEOCODING_API_UR).then.apply(res => res.json()).then(data => {
        if(!data.length)return alert(`No coordinates found for ${countryName}`);
        const {name, lat, lon } = data[0];
        getWeatherDeatails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    })
    const cityName = cityInput.value.trim();
    if(!cityName) return;

    console.log(cityName);
}
searchButton.addEventListener("click", getCityCoordinates);

function geoFindMe() {

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude);
    console.log(longitude);

    fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
        .then(res => res.json())
            .then((data) => {
                console.log(data);
                const city = document.querySelector("#city-detail");
                const time = document.querySelector("#date-time");
                const temp = document.querySelector("#Temperatature");
                const wind = document.querySelector("#Wind");
                const humidity = document.querySelector("#Humidity");
                const moderate = document.querySelector("#Moderate");
                const icon = document.querySelector("#icon-img");

                city.textContent = data.location.name;
                time.textContent = data.location.localtime;
                temp.textContent = `Temperatature: ${data.current.temp_c}°C`;
                wind.textContent = `Wind: ${data.current.wind_mph}mph`;
                humidity.textContent = `Humidity: ${data.current.humidity}%`;
                moderate.textContent = `${data.current.condition.text}`;
                icon.src = `https:${data.current.condition.icon}`;
            });
    
    fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5`)
        .then(res => res.json())
            .then((data) => {
                console.log(data); 
                const ul = document.querySelector(".weather-cards");

                data.forecast.forecastday.forEach((itm)=>{
                    const li = document.createElement("li");
                    li.className = "card";
                    li.innerHTML = `
                        <h3 id="detail">${data.location.name} ${itm.date}</h3>
                        <img src="https:${itm.day.condition.icon}" alt="weather-icon">
                        <h4>Temperatature: ${itm.day.maxtemp_c}°C</h4>  
                        <h4>Wind: ${itm.day.maxwind_mph}mph </h4>
                        <h4>${itm.day.condition.text}</h4>
                    `;
                    ul.appendChild(li);
                })
            });

    fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5&alerts=yes`)
        .then(res => res.json())
            .then((data) => {
              console.log(data);
              const div = document.querySelector(".warnings-data");
              const h2 = document.createElement("h2");
              h2.textContent = "Warnings";
              div.appendChild(h2);

              if(data.alerts.alert.length>0){
                data.alerts.alert.forEach((itm)=>{
                  const div1 = document.createElement("div");
                  div1.className = "warnings-cards";
                  div1.innerHTML = `
                    <div class="card">
                          <h4>${itm.event}</h4>
                          <h5>Start Date : ${item.effective}</h5>
                          <h5>End Date : ${item.expires}</h5>
                          <h5>Severity : ${item.severity}</h5>
                      </div>
                      <div class="icons">
                          <img src="img/alarm.png"/>
                      </div>
                  `;
                  div.appendChild(div1);
              })
            }else{
              const div1 = document.createElement("div");
              div1.className = "warnings";
              div1.innerHTML = `
                <h1>No Warnings</h1>
              `;
              div.appendChild(div1);
            }
    });


    fetch("../data/country.json").then(res => res.json()).
      then((data)=>{
        console.log(data);
      })


  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
