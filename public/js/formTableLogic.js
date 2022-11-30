function swapHoveredClass() {
  this.classList.replace(`${this.dataset.origClass}`, "hoveredOver");
}

function returnOrigClass() {
  this.classList.replace("hoveredOver", `${this.dataset.origClass}`);
}

function tableRowCreate(pokeid, is_even) {
  if (isNaN(pokeid) || pokeid > 905 || pokeid < 1) {
    alert("must enter a number between 1-905");
    return true;
  }

  // image link
  pkmnLink =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  // picking the container to be used
  const container = document.querySelector("#container");
  // create row element
  const Person = document.createElement("tr");
  const ID = document.createElement("td");
  const newimg = document.createElement("td");
  const Type = document.createElement("td");
  // give row element an id, 2 event listeners
  Person.id = pokeid;
  Person.addEventListener("mouseenter", swapHoveredClass);
  Person.addEventListener("mouseleave", returnOrigClass);

  // give the tr a class depending on its evenness and define original class
  if (!is_even) {
    Person.classList.add("odd");
    Person.dataset.origClass = "odd";
  } else {
    Person.classList.add("even");
    Person.dataset.origClass = "even";
  }
  Type.innerText = "type";
  // add lable
  const pokeNum = document.createElement("span");
  pokeNum.innerText = "#" + pokeid;
  ID.appendChild(pokeNum);
  //add the source image
  const newImg = document.createElement("img");
  // newImg.src = ".png";
  newImg.src = pkmnLink + `${pokeid}` + ".png";
  newimg.appendChild(newImg);

  // append all we created.
  Person.appendChild(ID);
  Person.appendChild(newimg);
  Person.appendChild(Type);
  container.appendChild(Person);
}

/*#################################### FORM START ##########################################*/
const form = document.querySelector("#addPokeForm");
const input = document.querySelector("#pokeInputText");
let is_even = true;
// get text cursor to be in box on load of page
window.onload = () => {
  document.getElementById("pokeInputText").focus();
};
// console.log(tableRowCreate);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const pokeNum = input.value;
  if (tableRowCreate(pokeNum, is_even)) {
    console.log("no pokemon belongs to that ID!!!, try again!!");
  } else {
    is_even = !is_even;
  }
  input.value = "";
  document.getElementById("pokeInputText").focus();
});
/*#################################### FORM END ##########################################*/
