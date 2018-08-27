let scrollBarFlag = false;

export function open(imgSrc){
  document.body.style.overflow = "hidden";
  document.querySelector(".overlay-wallviewer").hidden = false;
  document.querySelector(".overlay-wallviewer").style.zIndex = 20000;
  document.querySelector(".show-wallpaper").hidden = false;
  document.querySelector(".show-wallpaper").style.zIndex = 200000;
  if(!document.querySelector(".scroll-toolbar").hidden){
    scrollBarFlag = false;
    document.querySelector(".scroll-toolbar").hidden = true;
  }else{
    scrollBarFlag = true;
  }
  document.querySelector(".show-wallpaper img").src = imgSrc;
}

export function close(){
  document.body.style.overflowY = "scroll";
  document.querySelector(".overlay-wallviewer").hidden = true;
  document.querySelector(".overlay-wallviewer").style.zIndex = -10000;
  document.querySelector(".show-wallpaper").hidden = true;
  document.querySelector(".show-wallpaper").style.zIndex = -10000;
  document.querySelector(".scroll-toolbar").hidden = scrollBarFlag;
}

  document.querySelector(".show-wallpaper-header a:first-child").onclick = function(){
    close();
    return false;
  }
