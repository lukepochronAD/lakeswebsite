let allPictures = document.getElementsByClassName("carousel");
let currentIndex = 0;

let toggleVisibility = () => {
    document.getElementById("stopbutton").classList.toggle("is-hidden");
    console.log("one done")
    document.getElementById("playbutton").classList.toggle("is-hidden");
    console.log("and the other");    
};

// prevent tall pictures from stretching the container.
let height = document.getElementsByClassName("carousel")[0].height;
var style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule(`.carousel {max-height: ${height}px;}`);

let next = () => {
   
        allPictures[currentIndex].classList.toggle('is-hidden');

        if(++currentIndex == allPictures.length){
            currentIndex = 0; // back to square one        
        }

        allPictures[currentIndex].classList.toggle('is-hidden');

}

let previous = () => {
   
    allPictures[currentIndex].classList.toggle('is-hidden');

    console.log("hidden" + currentIndex)

    if(--currentIndex == -1){
        currentIndex = allPictures.length -1; // back to square one        
    }

    console.log("showing" + currentIndex)
    allPictures[currentIndex].classList.toggle('is-hidden');

}

let timer;

let startCarousel = () => {
    toggleVisibility();
    timer = setInterval(function(){
    next();
}, 1600)};

let stopCarousel = () => {
    toggleVisibility();
    clearInterval(timer);
}

document.getElementById("fwdbutton").addEventListener("click", next);
document.getElementById("bwdbutton").addEventListener("click", previous);
document.getElementById("playbutton").addEventListener("click", startCarousel);
document.getElementById("stopbutton").addEventListener("click", stopCarousel);