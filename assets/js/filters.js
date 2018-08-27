/* Importing modules */
import { getAlphacoders } from './binder.js';
import { getUnsplash } from './binder.js';
import { setAlpha } from './binder.js';
import { setUnsplash } from './binder.js';
import { getTermUnsplash } from './binder.js';
import { getIdAlpha } from './binder.js';

let requestAlpha = null;
let requestUnsplash = null;
let flag = false;
let currentSelected = null;

export function setFilters(method){
  switch(method){
    case "search" : if(document.querySelector(".filters a")){
                       document.querySelector(".filters").innerHTML = "";
                      }
                    break;
    case "featured" : flag = true;
                      showFilters();
                    break;
    case "category" : flag = false;
                      showFilters();
                    break;
  }
}

function showFilters(){
  document.querySelector(".filters").innerHTML = `
             <a href="#" class="btn">Latest</a>
             <a href="#" class="btn">Rating</a>
             <a href="#" class="btn">Views</a>
             <a href="#" class="btn">Favorites</a>`;
             document.querySelector(".filters a:nth-child(1)").style.background = "#790427";
             currentSelected = document.querySelector(".filters a:nth-child(1)");
}

document.querySelector(".filters").onclick = function(event){

  if(currentSelected == event.target || event.target == event.currentTarget){
    return false;
  }
  currentSelected.style.background = "#C3073F";
  event.target.style.background = "#790427";
  currentSelected = event.target;

  //Clear all the wallpapers
  if(requestAlpha){
    requestAlpha.abort();
  }
  if(requestUnsplash){
    requestUnsplash.abort();
  }
  let container = document.querySelector(".container-wallpapers");
  for(let i = 1;i <= 4; i++){
    container.querySelector(`div.col-wallpaper:nth-child(${i})`).innerHTML="";
  }

  let usort = null;

   if(event.target.innerHTML == "Latest"){
     usort = "latest";
   }else{
     usort = "popular";
   }

   if(flag){
     requestUnsplash = getUnsplash(1,"photos",usort,"something",false);
     requestAlpha = getAlphacoders(1,"featured",event.target.innerHTML.toLowerCase(),0,"null");
     setAlpha(1, "featured", event.target.innerHTML.toLowerCase(), 0, "null");
     setUnsplash(1, "photos", usort, "something", false);
   }else{
     requestUnsplash = getUnsplash(1, "search", "popular", getTermUnsplash(), true);
     requestAlpha = getAlphacoders(1, "category", event.target.innerHTML.toLowerCase(), getIdAlpha(), "something");
     setAlpha(1, "category", event.target.innerHTML.toLowerCase(), getIdAlpha(), "something");
     setUnsplash(1, "search", "popular", getTermUnsplash(), true);
   }


}
