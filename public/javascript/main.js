const searchBtn = document.getElementsByClassName("form-search")[0];
searchBtn.addEventListener("click", initiateSearch)
const addHelpBtn = document.getElementsByClassName("form-help")[0]
const addHelpText = document.getElementsByClassName("addHelp")[0]
const searchBar = document.getElementById('search-bar');
const searchIcon = document.getElementsByClassName('search-img')[0];
const addHelpPlus = document.getElementsByClassName('addHelpPlus')[0];


function initiateSearch() {
  if (searchBar.style.display = 'none') {
    searchBtn.style.width = '80%'
    addHelpBtn.style.width = '18%'
    addHelpText.style.display = 'none'
    addHelpPlus.style.fontSize = '100px'
    addHelpPlus.style.margin = '0'
    searchBar.style.display = 'block'
    searchBtn.removeEventListener("click", initiateSearch)
  }

}
searchIcon.addEventListener("click", closeSearch)

function closeSearch() {
  if (searchBar.style.display = 'block') {
    searchBtn.style.width = '50%'
    searchBar.style.display = 'none'
    addHelpBtn.style.display = 'flex'
    searchBtn.addEventListener("click", initiateSearch)
  }

}


function searchHelps() {
  const input = document.getElementById('search-bar')
  const filter = input.value.toUpperCase();
  const helps = document.getElementsByClassName("question-head")

  for (i = 0; i < helps.length; i++) {
    helps[i].parentElement.parentElement.style.display = "flex";
    a = helps[i].getElementsByTagName("h3")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      helps[i].style.display = "";
    } else {
      helps[i].parentElement.parentElement.style.display = "none";

    }
  }
}
