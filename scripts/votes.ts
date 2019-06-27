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