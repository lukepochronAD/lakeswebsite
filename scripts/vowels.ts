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