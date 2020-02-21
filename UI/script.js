let dropDown = document.querySelector("nav .dropdown") 
let sideBar =  document.querySelector(".sidebar");
let menuBar = document.querySelector("nav .menu");

const menu = () => {
    if (dropDown.style.display === "grid"){
      dropDown.style.display = "none";
      menuBar.innerHTML = "menu";
    }
    else {
        dropDown.style.display = "grid";  
        menuBar.innerHTML = "close";
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
    if (window.innerWidth > 700) {
        dropDown.style.display = "none";
        menuBar.innerHTML = "menu";
    }
});