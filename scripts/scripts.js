/**
 * JavaScript go here.
 *
 * Make sure to use the modern APIs like string
 * interpolation and const/let.
 *
 * You are NOT allowed to use any JavaScript
 * libraries like jQuery, aurelia, vue, etc.
 *
 * You will need to namespace your solutions
 * for each ticket. This way it's easier for us
 * to look through the code.
 *
 */



let votes = () => {

   let score = 5;

   let display = document.getElementById("count");
   let thumbsup = document.getElementById("thumbsup");
   let thumbsdown = document.getElementById("thumbsdown");

   thumbsup.addEventListener("click", function () {
      scoreChange(1)
   });

   thumbsdown.addEventListener("click", function () {
      scoreChange(-1)
   });

   let scoreChange = (x) => {
      score += x;
      display.innerText = score;

      if (score < 0) {
         display.style.color = '#C81D1D';
      }
      else {
         display.style.color = '#999';
      }
   }
   scoreChange(0);
}

let FormError = (isError = true, differentInput = null) => {

   let input;
   if (differentInput) {
      input = differentInput;
   }
   else {
      input = document.getElementById("userTextInput");
   }
   if (isError) {
      input.classList.remove("is-primary");
      input.classList.add("is-danger");
   }
   else {
      input.classList.add("is-primary");
      input.classList.remove("is-danger");
   }

}

let vowels = () => {

   let input = document.getElementById("userTextInput");

   document.getElementById("clearButton").addEventListener("click", function () {
      input.value = "";
   })

   document.getElementById("checkVowels").addEventListener("click", function () {

      if (input.value == "") {
         FormError();
      }
      else {

         let n = input.value.match(/[aeiou]/gi);

         if (n == null) {
            alert("No vowels were found.");

         }
         else {
            alert(`Your text has ${n.length} vowel${(n.length > 1 ? "s" : "")}.`)

         }
      }
   });

   input.addEventListener("input", function () {
      if (input.value == "") {
         FormError();
      }

      else {
         FormError(false); // cancel the red border
      }
   })
}

let words = () => {

   let button = document.getElementById('countWords');
   let words = document.getElementById('userTextInput');
   let outputTo = document.getElementById('result');

   document.getElementById("clearButton").addEventListener("click", function () {
      outputTo.innerText = "";
   })

   const regex = new RegExp(/\W/g);

   button.addEventListener("click", function () {

      let inputString = words.value;

      let array = inputString.split(regex);

      array = array.map(x => x.toString().toLowerCase());
      array = array.filter(x => x != "");

      if (array.length == 0) {
         FormError();
      }
      else {

         let array2 = [...array];
         var y = new Object();

         for (let i = 0; i < array2.length; i++) {
            let x = array.pop();
            if (y.hasOwnProperty(x)) {
               y[x] += 1;
            } else {
               y[x] = 1;
            }
         }

         let keys = Object.keys(y).sort();

         keys = keys.map(x => `${y[x]} time${y[x] > 1 ? "s" : ""} "<i>${x}</i>"<br>`);
         outputTo.innerHTML = keys.join("");
      }
   })

}


let faToggle = () => {

   let label = document.getElementById("toggleLabel");
   let eyeIcon = document.getElementById("changeFaIcon");
   let header = document.getElementById("header");

   document.getElementById("headerToggle").addEventListener("click", function () {

      if (!header.classList.contains("is-hidden")) {
         header.classList.add("is-hidden");
         label.innerText = "show header";
         eyeIcon.classList.remove("fa-eye-slash");
         eyeIcon.classList.add("fa-eye");
      }
      else {
         header.classList.remove("is-hidden");
         label.innerText = "hide header";
         eyeIcon.classList.remove("fa-eye");
         eyeIcon.classList.add("fa-eye-slash");
      }


   })
}



let weather = () => {
   let url = "https://api.sunrise-sunset.org/json?lat=54.3807&lng=-2.9068";

   let fixTime = (date) => {
      x = new Date().getTimezoneOffset() / 60;
      dateElements = date.split(":");
      dateElements[0] = Number(dateElements[0]) - x;
      return dateElements.join(":");

   }

   let sunInformation = (apiData) => {

      let dayLengthParts = apiData.day_length.split(":");
      let dayLengthHours = dayLengthParts[0];
      let dayLengthMinutes = dayLengthParts[1];

      let tooltipinformation = "<span class='tooltiptext'>All this live information comes from external website sunrise-sunset.org</span>";

      let output = `This day <div class="tooltip">will be ${Number(dayLengthMinutes) > 0 ? "over " : ""}${dayLengthHours} hours long${tooltipinformation}</div>. `
      +`The sunrise in Lakes should start from ${fixTime(apiData.sunrise)} and you can expect to see the sunset at ${fixTime(apiData.sunset)}.`;

      document.getElementById("sunadvice").innerHTML = output;
      console.log(output);


   }

   fetch(url)
      .then(response => response.json())
      .then(function (data) {
         sunInformation(data.results);
      })
      .catch(function (error) {
         console.log('Looks like there was a problem: \n', error);
      });



}

votes();
vowels();
words();
faToggle();
weather();

// modal

let modal = document.getElementById("modal");

document.getElementById("closemap").addEventListener("click", function(){
   modal.style.visibility = "hidden";
})

document.getElementById("contactus").addEventListener("click", function(){
   modal.style.visibility = "visible";
})