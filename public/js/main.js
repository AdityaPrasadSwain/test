const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const API_KEY = '14d5e40dc60a1025319f09a18c11494c'; // Replace with your actual API key

const getInfo = async (event) => {
  event.preventDefault(); // Prevents form submission reload

  // Get the input city value
  let cityVal = cityName.value.trim();

  // Validate input
  if (cityVal === "") {
    city_name.innerHTML = "Please write the city name before searching.";
    temp.innerHTML = ""; // Clear temperature data
    temp_status.innerHTML = ""; // Clear weather status
    return;
  }

  // API URL
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${API_KEY}&units=metric`;

  try {
    // Fetch weather data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found! (${response.status})`);
    }
    const data = await response.json();

    // Extract data
    const temperature = data.main.temp;
    const weatherCondition = data.weather[0].main;

    // Update the UI with fetched data
    city_name.innerHTML = `Weather in ${data.name}, ${data.sys.country}`;
    temp.innerHTML = `${temperature} <sup>o</sup>C`;
    temp_status.innerHTML = weatherCondition;

    // Add weather icons (optional, based on weather condition)
    let weatherIcon = data.weather[0].main;
    if (weatherCondition === "Clear") {
      weatherIcon = `<i class="fa-solid fa-sun" style="color: #FFD700;"></i>`;
    } else if (weatherCondition === "Clouds") {
      weatherIcon = `<i class="fa-solid fa-cloud" style="color: #B0C4DE;"></i>`;
    } else if (weatherCondition === "Rain") {
      weatherIcon = `<i class="fa-solid fa-cloud-rain" style="color: #00BFFF;"></i>`;
    } else {
      weatherIcon = `<i class="fa-solid fa-smog" style="color: #696969;"></i>`;
    }
    temp_status.innerHTML = `${weatherCondition} ${weatherIcon}`;
  } catch (error) {
    // Handle errors (e.g., city not found, network issues)
    city_name.innerHTML = "Error: Unable to fetch data. Please check the city name.";
    temp.innerHTML = ""; // Clear temperature data
    temp_status.innerHTML = ""; // Clear weather status
    console.error(error);
  }
};

submitBtn.addEventListener('click', getInfo);
