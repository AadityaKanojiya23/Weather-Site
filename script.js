document.addEventListener('DOMContentLoaded' , ()=>{
   const cityInput = document.getElementById("city-input");
   const getWeatherbtn = document.getElementById("get-weather-btn");
   const weatherInfo = document.getElementById("weather-info");
   const cityNameDisplay = document.getElementById("city-name");
   const temperatureDisplay = document.getElementById("temperature");
   const discriptionDisplay = document.getElementById("discription");
   const errorMessage = document.getElementById("error-message");
    
    const API_KEY = "50d25074d9521ce2432b410ef036e029";

   getWeatherbtn.addEventListener('click', async ()=>{
        const city = cityInput.value.trim()
        if(!city) return ;
        
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }
        
   })

   async function fetchWeatherData(city){
      //get weather data 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const response = await  fetch(url)
      console.log(typeof response);
      console.log("RESPONSE", response);
      
      if(!response.ok){
        throw new Error("City not found!")
      }
      const data = await response.json()
      return data
   }

   function displayWeatherData(data){
        //display
         console.log(data);
        const { name, main, weather} = data
        cityNameDisplay.textContent = name
        temperatureDisplay.textContent = `Temperature is ${main.temp}°C`
        discriptionDisplay.textContent = `Weather is ${weather[0].description}`

        //unlock the display
        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
        
   }
     function showError(){
     weatherInfo.classList.add('hidden')   
     errorMessage.classList.remove('hidden') 
     }
})
