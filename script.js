function GetInfo() {

  var newName = document.getElementById("cityInput");
  newName.innerHTML = "--" + newName.value + "--";


  const date = new Date();
  



  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=a4905c75b9b6fc0bc32f5342461c2124')
    .then(response => response.json())
    .then(data => {



      for (i = 0; i < data.list.length; i = i + 8) {
        console.log(data.list[i]);
        const date = new Date(data.list[i].dt * 1000);
        console.log(date.toLocaleDateString())
        document.getElementById("date" + i).innerHTML = "date: " + date.toLocaleDateString();

      }

      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Hum").innerHTML = "Humidity: " + Number(data.list[i].main.humidity);
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "wind").innerHTML = "Wind_speed: " + Number(data.list[i].wind.speed) + "m/s";
      }
      localStorage.setItem('newName', JSON.stringify(newName));


      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon + ".png";
      }

      const historySelect = document.getElementById('history-select');
 
       let searchHistory = JSON.parse(localStorage.getItem("searchHistory"))|| [];
      
       const location = newName.value;
       saveSearchHistory(location);

       function saveSearchHistory(location) {

      console.log(searchHistory)

       searchHistory.push(location);
       console.log(searchHistory)
       localStorage.setItem("searchHistory",JSON.stringify(searchHistory)) 
  

       historySelect.innerHTML = '';
  
 
       searchHistory.forEach((item) => {
       const option = document.createElement('option');
       option.value = item;
       option.text = item;
        historySelect.appendChild(option);
  });
}

    })

    var d = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];


    function CheckDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      }
      else {
        return day + d.getDay();
      }
    }

    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
    }
  } 

