export function addNavigationItem(item, address, itemType){
  let newItem = document.createElement("li");
  let newItemanchor = document.createElement("a");
  newItemanchor.setAttribute("href", address);
  newItemanchor.classList.add("navigation-control-item");
  newItemanchor.innerHTML = item;
  newItem.appendChild(newItemanchor);
  newItem.setAttribute("data-item", itemType);
  if(!document.querySelector(".navigation-control ul li")){
    document.querySelector(".navigation-control ul").innerHTML = `<li data-item="home"><a class="navigation-control-item" href=""><i class="material-icons">home</i></a></li>`;
  }
  document.querySelector(".navigation-control ul").appendChild(newItem);
}

export function clearNavigation(){
  document.querySelector(".navigation-control ul").innerHTML = "";
}
