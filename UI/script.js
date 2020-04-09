let dropDown = document.querySelector("nav .dropdown") 
let sideBar =  document.querySelector(".sidebar");
//let fa = document.querySelector(".fa");
let menuBar = document.querySelector("nav .menu");
let modalDropDown = document.querySelector(".modal_dropdown"); 
let passwordResetModal = document.querySelector("#password_reset_modal");
let like = document.querySelector(".like");
let formId = document.getElementsByClassName("profile_form");

const menu = () => {
    if (dropDown.style.display === "grid") {
      dropDown.style.display = "none";
      menuBar.innerHTML = "menu";
    }
    else {
        dropDown.style.display = "grid";  
        menuBar.innerHTML = "close";
    }
  }


let dropDownMenuList = () => {
  if (modalDropDown.style.display === "block") {
    modalDropDown.style.display = "none";
  } 
  else {
    modalDropDown.style.display = "block";
  }
}

let displayPasswordResetModal = () => {
  event.preventDefault() 
  if (passwordResetModal.style.display === "block") {
    passwordResetModal.style.display = "none";
  } 
  else {
    passwordResetModal.style.display = "block";
  }
}

const closeModalDropdown = () => {
  modalDropDown.style.display = "none";
}


const closeModalPasswordReset = () => {
  passwordResetModal.style.display = "none";
}

const toggle = () => {
   if (sideBar.classList.contains("active")) {
     sideBar.classList.remove('active');
     menuBar.innerHTML = "menu";
   }
   else {
     sideBar.classList.add('active');
     menuBar.innerHTML = "close";
   }
}

const likeButton = (event) => {

  if (event.classList.contains("like")){
    event.classList.remove("like");
    event.classList.add("unlike");
  }
  else {
    event.classList.add("like");
    event.classList.remove("unlike");
  }
}

addEventListener("resize", ()=> {
    if ((window.innerWidth > 700) && (dropDown)) {
        dropDown.style.display = "none";
        menuBar.innerHTML = "menu";
    }
});

/*document.body.addEventListener("click", event => {
  //console.log(event.target.classList);
  if (event.target.classList.contains("like") && event.target.classList.contains("fa-heart")){
    event.target.classList.remove("like");
    event.target.classList.add("unlike");
  }
  else {
    event.target.classList.add("like");
    event.target.classList.remove("unlike");
  } 
  
 // if (event.target.nodeName == "BUTTON") {
   // console.log("Clicked", event.target.textContent);
  //}
});*/
// document.querySelector(".close").addEventListener("click", );