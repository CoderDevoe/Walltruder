/* This script operates on the scroll-toolbar */

/* Check if header is not visible(If yes then slow toolbar otherwise not) */
if(document.body.scrollTop > document.querySelector("header").offsetHeight){
  document.querySelector(".scroll-toolbar").hidden = false;
}else{
  document.querySelector(".scroll-toolbar").hidden = true;
}

/* Making the logo clickable */
let logoToolbar = document.querySelector("div.logo-toolbar");
logoToolbar.onclick = function(){
  //Go to homepage
  window.location.href = "index.html";
};

/* Making the GoToTop Button clickable */
let goToTop = document.querySelector(".scroll-toolbar-gototop");
goToTop.onclick = function(){
  //document.body.scrollTop = 0;
  window.scroll({top: 0,left: 0,behavior: 'smooth'});
};

/* Show Scroll-Toolbar when header is not visible */
window.addEventListener("scroll", function(){
  if(document.body.scrollTop > document.querySelector("header").offsetHeight){
    document.querySelector(".scroll-toolbar").hidden = false;
  }else{
    document.querySelector(".scroll-toolbar").hidden = true;
  }
});
