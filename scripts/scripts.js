const countryInput = document.querySelector(".country-btn")
const cityInput = document.querySelector(".city-btn")
const searchButton = document.querySelector(".search-btn")

const getCityCoordinates = () => {
    const countryName = countryInput.value.trim();
    if(!countryName) return;
    const BASE_URL = `https://www.weatherapi.com/docs/#`;

    const cityName = cityInput.value.trim();
    if(!cityName) return;

    console.log(cityName);
}
searchButton.addEventListener("click", getCityCoordinates);