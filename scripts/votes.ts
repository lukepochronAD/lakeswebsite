let score = 5;
const display = document.getElementById("count");
const thumbsup = document.getElementById("thumbsup");
const thumbsdown = document.getElementById("thumbsdown");

thumbsup.addEventListener("click", function () {
   scoreChange(1)
});

thumbsdown.addEventListener("click", function () {
   scoreChange(-1)
});

const scoreChange = (x) => {
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