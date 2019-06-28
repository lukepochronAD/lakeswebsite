    const label = document.getElementById("toggleLabel");
    const eyeIcon = document.getElementById("changeFaIcon");
    const header = document.getElementById("header");
 
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
 