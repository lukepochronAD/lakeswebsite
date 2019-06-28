
const url = "https://api.sunrise-sunset.org/json?lat=54.3807&lng=-2.9068";

const fixTime = (date) => {
   const x = new Date().getTimezoneOffset() / 60;
   let dateElements = date.split(":");
   dateElements[0] = Number(dateElements[0]) - x;
   return dateElements.join(":");
}

const sunInformation = (apiData) => {

   const dayLengthParts = apiData.day_length.split(":");
   const dayLengthHours = dayLengthParts[0];
   const dayLengthMinutes = dayLengthParts[1];

   const tooltipinformation = "<span class='tooltiptext'>All this live information comes from external website sunrise-sunset.org</span>";

   const output = `This day <div class="tooltip">will be ${Number(dayLengthMinutes) > 0 ? "over " : ""}${dayLengthHours} hours long${tooltipinformation}</div>. `
      + `The sunrise in Lakes should start from ${fixTime(apiData.sunrise)} and you can expect to see the sunset at ${fixTime(apiData.sunset)}.`;

   document.getElementById("sunadvice").innerHTML = output;
}

fetch(url)
   .then(response => response.json())
   .then(function (data) {
      sunInformation(data.results);
   })
   .catch(function (error) {
      console.log('Looks like there was a problem: \n', error);
   });