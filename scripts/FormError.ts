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