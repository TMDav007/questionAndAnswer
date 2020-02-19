let dropDown = document.querySelector("nav .dropdown");
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


menuBar.addEventListener("click", ()=> {
        menu();
    });
addEventListener("resize", ()=> {
    if (window.innerWidth > 700) {
        dropDown.style.display = "none";
        menuBar.innerHTML = "menu"
    }
});