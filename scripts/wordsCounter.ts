const FormError = (isError = true, differentInput = null) => {

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

const button = document.getElementById('countWords');
const words = document.getElementById('userTextInput');
const outputTo = document.getElementById('result');

document.getElementById("clearButton").addEventListener("click", function () {
   outputTo.innerText = "";
})

const regex = new RegExp(/\W/g);

button.addEventListener("click", function () {

   let inputString = (<HTMLInputElement>words).value;

   let array = inputString.split(regex);

   array = array.map(x => x.toString().toLowerCase());
   array = array.filter(x => x != "");

   if (array.length == 0) {
      FormError();
   }
   else {

      let array2 = [...array];
      var y = new Object();

      let sum = 0;

      for (let i = 0; i < array2.length; i++) {
         let x = array.pop();
         if (y.hasOwnProperty(x)) {
            y[x] += 1;
         } else {
            y[x] = 1;
         }
         sum ++;
      }

      let keys = Object.keys(y).sort();

      keys = keys.map(x => `${y[x]}&nbspx&nbsp"<i>${x}</i>", `);
      outputTo.innerHTML = keys.join("") + `<br><hr><b>Total word count: ${sum}</b>`;
   }
});