let allPictures = document.getElementsByClassName("carousel");
let currentIndex = 0;

// prevent tall pictures from stretching the container.
let height = document.getElementsByClassName("carousel")[0].height;
var style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule(`.carousel {max-height: ${height}px}`);

let next = () => {
   
        allPictures[currentIndex].classList.toggle('is-hidden');


        if(++currentIndex == allPictures.length){
            currentIndex = 0; // back to square one        
        }

        allPictures[currentIndex].classList.toggle('is-hidden');

}

setInterval(function(){
    next();
}, 2500)