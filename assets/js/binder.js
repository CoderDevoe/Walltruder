/* This script helps to load the wallpapers from all sources */
import { setFilters } from './filters.js';
import { setHeading } from './heading.js';
import { open } from './wallpaper-viewer.js';
import { close } from './wallpaper-viewer.js';


let counter = 0;//A number to decide column of a particular wallpaper
let scrollEnd = 1;//Page number, Increases everytime when page reaches its end
let methodAlpha = "featured";
let methodUnsplash = "photos";
let sortAlpha = "rating";
let sortUnsplash = "popular";
let idAlpha = 0;
let termAlpha = "null";
let termUnsplash = "something";
let searchFlagUnsplash = false;

export function setAlpha(scrollPos, method, sort, id, term){
  methodAlpha = method;
  sortAlpha = sort;
  idAlpha = id;
  termAlpha = term;
  scrollEnd = scrollPos;
}

export function setUnsplash(scrollPos, method, sort, term, searchFlag){
  methodUnsplash = method;
  sortUnsplash = sort;
  termUnsplash = term;
  searchFlagUnsplash = searchFlag;
  scrollEnd = scrollPos;
}

export function getTermUnsplash(){
  return termUnsplash;
}

export function getIdAlpha(){
  return idAlpha;
}

/* Alpha Coders part */

export function getAlphacoders(page, method, sort, id, term){
  let request = new XMLHttpRequest();
     request.onreadystatechange = function(){
       if(this.readyState == 4 && this.status == 200){
         //Get the data
         try{
           let data = JSON.parse(this.responseText);
           if(data.success){
             //display walls

             // Get the main container
             let container = document.querySelector(".container-wallpapers");

             //Insert wallpapers one by one into the columns in a row wise(col-1->col-2->col-3->col-4->col-1)
             for(let wallpaper of data.wallpapers){
                  counter++;
                  container.querySelector(`div.col-wallpaper:nth-child(${counter})`).appendChild(createContainerWallpaper(wallpaper.url_thumb, wallpaper.url_image, wallpaper.user_name, "#", "By Wallpaper Abyss", "https://wall.alphacoders.com"));
                  (counter == 4)? counter = 0 : counter;
             }
           }else{
             //Don't do anything
           }
         }catch(e){

         }
       }
     };
     request.open("POST", "assets/php/get-alphacoders.php", true);
     request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     request.send(`method=${method}&page=${page}&info_level=2&check_last=1&sort=${sort}&id=${id}&term=${term}`);

     return request;
}

/* Alpha Coders part ends here */

/* Unsplash part */

export function getUnsplash(page, method, order_by, query, searchFlag){
  let request = new XMLHttpRequest();
     request.onreadystatechange = function(){
       if(this.readyState == 4 && this.status == 200){
         //Get the data
         try{
           let data = JSON.parse(this.responseText);
           if(data){
             //display walls

             // Get the main container
             let container = document.querySelector(".container-wallpapers");

              //Insert wallpapers one by one into the columns in a row wise(col-1->col-2->col-3->col-4->col-1)
             if(searchFlag){
               for(let wallpaper of data.results){
                    counter++;
                    container.querySelector(`div.col-wallpaper:nth-child(${counter})`).appendChild(createContainerWallpaper(wallpaper.urls.regular, wallpaper.urls.full, wallpaper.user.name, "https://unsplash.com/@"+wallpaper.user.username+"?utm_source=walltruder&utm_medium=referral", "By Unsplash", "https://unsplash.com/?utm_source=walltruder&utm_medium=referral"));
                    (counter%4 == 0)? counter = 0 : counter;
               }
             }else{
               for(let wallpaper of data){
                    counter++;
                    container.querySelector(`div.col-wallpaper:nth-child(${counter})`).appendChild(createContainerWallpaper(wallpaper.urls.regular, wallpaper.urls.full, wallpaper.user.name, "https://unsplash.com/@"+wallpaper.user.username+"?utm_source=walltruder&utm_medium=referral", "By Unsplash", "https://unsplash.com/?utm_source=walltruder&utm_medium=referral"));
                    (counter%4 == 0)? counter = 0 : counter;
               }
             }
           }else{
             //If data is NULL, don't do anything
           }
         }catch(e){

         }
       }
     };
     request.open("POST", "assets/php/get-unsplash.php", true);
     request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     request.send(`method=${method}&order_by=${order_by}&page=${page}&per_page=30&query=${query}`);

     return request;
}

/* Unsplash part ends here */

/*  Some Modules */

function createContainerWallpaper(src, viewsrc, username, usernameLink, source, sourceUrl){
  let containerWallpaper = document.createElement("div");
  containerWallpaper.setAttribute("class", "container-wallpaper");
  let mainWallpaper = document.createElement("div");
  mainWallpaper.classList.add("main-wallpaper");
  mainWallpaper.addEventListener("mouseenter", showOverlay);
  mainWallpaper.addEventListener("mouseleave", hideOverlay);
  mainWallpaper.addEventListener("click", function(){ open(viewsrc); });
  mainWallpaper.innerHTML = `
               <img src="${src}"/>
               <div class="wallpaper-overlap">
                 <div>
                   <a href="${sourceUrl}" target="_blank">${source}</a>
                   <a href="${usernameLink}" target="_blank">${username}</a>
                 </div>
               </div>
             `;
  containerWallpaper.appendChild(mainWallpaper);
  return containerWallpaper;
}

//Creating scroll up and scroll down events
let scrolldown = new Event("scrolldown");
let scrollup = new Event("scrollup");
let prevScrollTop = window.pageYOffset;
window.addEventListener("scroll", function(){
   let currentScrollTop = window.pageYOffset;
       if(currentScrollTop > prevScrollTop){
         window.dispatchEvent(scrolldown);
       }else if(currentScrollTop < prevScrollTop){
         window.dispatchEvent(scrollup);
       }
       prevScrollTop = currentScrollTop;
});

/* Startup */
(function(){
  getUnsplash(1,"photos","popular","something",false);
  getAlphacoders(1,"featured","latest",0,"null");
  setFilters("featured");
  setHeading("Featured");
})();

/* When Scroll reaches the end */
window.addEventListener("scrolldown", function(){
  if((document.body.clientHeight + document.body.scrollTop) == document.body.offsetHeight){
    getUnsplash(++scrollEnd,methodUnsplash,sortUnsplash,termUnsplash,searchFlagUnsplash);
    getAlphacoders(scrollEnd,methodUnsplash,sortAlpha,idAlpha,termAlpha);
  }
});

//When a wallpaper is hovered
function showOverlay(event){
 event.target.querySelector(".wallpaper-overlap div").style.display = "flex";
 event.target.querySelector(".wallpaper-overlap div").style.zIndex = 1;
 event.target.querySelectorAll("a")[0].classList.add("animate-bounce-in");
}

function hideOverlay(event){
 event.target.querySelector(".wallpaper-overlap div").style.zIndex = -1;
 event.target.querySelectorAll("a")[0].classList.remove("animate-bounce-in");
 event.target.querySelector(".wallpaper-overlap div").style.display = "none";
}
