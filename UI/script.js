let dropDown = document.querySelector("nav .dropdown") 
let sideBar =  document.querySelector(".sidebar");
let menuBar = document.querySelector("nav .menu");
let abc = document.querySelector(".modal_dropdown"); 
//let dropdownModal = document.querySelector()
// || document.querySelector(".menu_list2") || document.querySelector(".menu_list3") || document.querySelector(".menu_list4");

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
  if (abc.style.display === "block") {
    abc.style.display = "none";
  } 
  else {
    abc.style.display = "block";
  }
}

const closeModalDropdown = () => {
 // console.log("im here");
  abc.style.display = "none";
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

addEventListener("resize", ()=> {
    if ((window.innerWidth > 700) && (dropDown)) {
        dropDown.style.display = "none";
        menuBar.innerHTML = "menu";
    }
});

// document.querySelector(".close").addEventListener("click", );