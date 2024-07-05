const time = document.getElementById("time");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");

function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  )
    .then((response) => {
      response.json().then((data) => {
        time.innerText = new Date(data.current.time).toLocaleDateString();
        temp.innerText =
          data.current.temperature_2m + data.current_units.temperature_2m;
        wind.innerText =
          data.current.wind_speed_10m + data.current_units.wind_speed_10m;
      });
    })
    .catch((error) => console.log(error));
}
getLocation();
