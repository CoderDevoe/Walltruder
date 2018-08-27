/* This script operates on the header element */

/* Importing modules */
import { getAlphacoders } from './binder.js';
import { getUnsplash } from './binder.js';
import { setAlpha } from './binder.js';
import { setUnsplash } from './binder.js';
import { addNavigationItem } from './navigation-Controller.js';
import { clearNavigation } from './navigation-Controller.js';
import { setFilters } from './filters.js';
import { setHeading } from './heading.js';

let requestAlpha = null;
let requestUnsplash = null;

/* Making the logo clickable */
let Logo = document.querySelector("div.logo");
Logo.onclick=function(){
  //Go to homepage
  window.location.href="index.html";
};

/* Load Catagories */
function loadCategories(){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
     if(this.readyState == 4 && this.status == 200){
       try{
         let data = JSON.parse(this.responseText);
        if(data.success){
          let categoryList = document.querySelector("li div.category-menu");
          let menuCategoryList = document.querySelector(".menu-category ul");
          for(let category of data.categories){
            categoryList.appendChild(createCategory(category.name, category.id));
            menuCategoryList.appendChild(createMenuCategory(category.name, category.id));
          }
        }else{

        }
      }catch(e){

      }
     }
  };
  request.open("POST", "assets/php/get-alphacoders.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(`method=category_list&page=2&info_level=1&check_last=1&sort=newest&id=3&term=something`);
}

/* Some Modules */

//Category creator
function createCategory(name, id){
  let category = document.createElement("a");
  category.setAttribute("class", "dropdown-item");
  category.setAttribute("href", "#");
  category.setAttribute("id", id);
  category.innerText = name;
  category.onclick = loadWallpapers;
  return category;
}

//Menu Category creator
function createMenuCategory(name, id){
  let category = document.createElement("li");
  let anchor = document.createElement("a");
  anchor.setAttribute("class", "btn");
  anchor.setAttribute("href", "#");
  anchor.setAttribute("id", id);
  anchor.innerText = name;
  anchor.onclick = function(event){
    loadWallpapers(event);
    document.querySelector(".menu-category").hidden = true;
  };
  category.appendChild(anchor);
  return category;
}

/* Load wallpapers when category clicked */
function loadWallpapers(event){
  setHeading("");
  //Add navigation
  /* Remove other navigations */
  clearNavigation();
  addNavigationItem("Categories", "#", "child");
  addNavigationItem(event.target.innerText, "#", "child");
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
  requestAlpha = getAlphacoders(1, "category", "rating", event.target.id, "something");
  requestUnsplash = getUnsplash(1, "search", "popular", event.target.innerText, true);
  setAlpha(1, "category", "rating", event.target.id, "something");
  setUnsplash(1, "search", "popular", event.target.innerText, true);
  setFilters("category");
}

  document.querySelector(".menu-options li:first-child").onclick = function(){
    document.querySelector(".menu-category").hidden = !document.querySelector(".menu-category").hidden;
  }

  document.querySelector(".menu").onclick = function(){
    document.querySelector(".menu-options").hidden = !document.querySelector(".menu-options").hidden;
  }

loadCategories();
