/* Importing wallpaper showing functions from binder.js script */
import { getAlphacoders } from './binder.js';
import { getUnsplash } from './binder.js';
import { setAlpha } from './binder.js';
import { setUnsplash } from './binder.js';
import { addNavigationItem } from './navigation-Controller.js';
import { clearNavigation } from './navigation-Controller.js';
import { setHeading } from './heading.js';
import { setFilters } from './filters.js';

let requestAlpha = null;
let requestUnsplash = null;

function search(){
  setHeading("");
  setFilters("search");
  let value = document.querySelector(".search input").value;
  //Add navigation
  /* Remove other navigations */
  clearNavigation();
  addNavigationItem("Search", "#", "child");
  addNavigationItem(value, "#", "child");
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
  requestAlpha = getAlphacoders(1, "search", "rating", 0, value);
  requestUnsplash = getUnsplash(1, "search", "popular", value, true);
  setAlpha(2, "search", "rating", 0, value);
  setUnsplash(2, "search", "popular", value, true);
}

document.querySelector(".search a").onclick = search;
document.querySelector(".search input").onkeyup = function(event){
  if(event.code == 'Enter'){
    document.querySelector(".search a").dispatchEvent(new Event("click"));
  }
}
