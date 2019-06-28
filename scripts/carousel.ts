const allPictures = document.getElementsByClassName("carousel");
let currentIndex = 0;

const toggleVisibility = () => {
    document.getElementById("stopbutton").classList.toggle("is-hidden");
    document.getElementById("playbutton").classList.toggle("is-hidden");
};

// prevent tall pictures from stretching the container.
const height = (<HTMLElement>document.getElementsByClassName("carousel")[0]).offsetHeight;
const style = document.createElement('style');
document.head.appendChild(style);
(<CSSStyleSheet>style.sheet).insertRule(`#carouselcontainer {max-height: ${height - 9}px;}`);

const ToggleVisibility = (index) => allPictures[index].classList.toggle('is-hidden');

const next = () => {

    ToggleVisibility(currentIndex);

    if (++currentIndex == allPictures.length) {
        currentIndex = 0; // back to square one        
    }

    ToggleVisibility(currentIndex);

}

const previous = () => {

    ToggleVisibility(currentIndex);

    if (--currentIndex == -1) {
        currentIndex = allPictures.length - 1; // back to square one        
    }

    ToggleVisibility(currentIndex);
}

let timer;

const startCarousel = () => {
    toggleVisibility();
    timer = setInterval(function () {
        next();
    }, 2100)
};

const stopCarousel = () => {
    toggleVisibility();
    clearInterval(timer);
}

startCarousel();

document.getElementById("fwdbutton").addEventListener("click", next);
document.getElementById("bwdbutton").addEventListener("click", previous);
document.getElementById("playbutton").addEventListener("click", startCarousel);
document.getElementById("stopbutton").addEventListener("click", stopCarousel);