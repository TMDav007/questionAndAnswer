let dropDown = document.querySelector("nav .dropdown") 
let sideBar =  document.querySelector(".sidebar");
let menuBar = document.querySelector("nav .menu");
let dropDownMenu = document.querySelector(".menu_list");

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

const dropDownMenuList = () => {
  //console.log("im here");
  if (dropDownMenu.style.display === "block") {
    console.log("im here");
    dropDownMenu.style.display = "none";
  } 
  else {
    dropDownMenu.style.display = "block";
  }

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