let allPictures = document.getElementsByClassName("carousel");
let currentIndex = 0;
let toggleVisibility = () => {
    document.getElementById("stopbutton").classList.toggle("is-hidden");
    document.getElementById("playbutton").classList.toggle("is-hidden");
};

// prevent tall pictures from stretching the container.
let height = document.getElementsByClassName("carousel")[0].offsetHeight;
var style = document.createElement('style');
document.head.appendChild(style);
console.log(height);
style.sheet.insertRule(`#carouselcontainer {max-height: ${height - 5}px;}`);

let next = () => {

    allPictures[currentIndex].classList.toggle('is-hidden');

    if (++currentIndex == allPictures.length) {
        currentIndex = 0; // back to square one        
    }

    allPictures[currentIndex].classList.toggle('is-hidden');

}

let previous = () => {

    allPictures[currentIndex].classList.toggle('is-hidden');
    console.log("hidden" + currentIndex)

    if (--currentIndex == -1) {
        currentIndex = allPictures.length - 1; // back to square one        
    }
    console.log("showing" + currentIndex)
    allPictures[currentIndex].classList.toggle('is-hidden');
}

let timer;

let startCarousel = () => {
    toggleVisibility();
    timer = setInterval(function () {
        next();
    }, 2100)
};

let stopCarousel = () => {
    toggleVisibility();
    clearInterval(timer);
}

let resetTiming = () => {
    clearInterval(timer);
    timer = setInterval(function () {
        next();
    }, 2000)
}

startCarousel();

document.getElementById("fwdbutton").addEventListener("click", function () { next(); resetTiming(); });
document.getElementById("bwdbutton").addEventListener("click", function () { previous(); resetTiming(); });
document.getElementById("playbutton").addEventListener("click", startCarousel);
document.getElementById("stopbutton").addEventListener("click", stopCarousel);