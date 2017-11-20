const searchBtn = document.getElementsByClassName("form-search")[0];
searchBtn.addEventListener("click", initiateSearch)
const addHelpBtn = document.getElementsByClassName("form-help")[0]
const addHelpText = document.getElementsByClassName("addHelp")[0]
const searchBar = document.getElementById('search-bar');
const searchIcon = document.getElementsByClassName('search-img')[0];
const addHelpPlus = document.getElementsByClassName('addHelpPlus')[0];
// const helpContainer = document.getElementsByClassName('form-help-container')
// helpContainer[i].style.visibility = 'hidden'

// helpContainer.style.visibility = 'hidden'

// window.setTimeout(function(){
//   for (var i = 0; i < helpContainer.length; i++) {
//     let vis = helpContainer[i].style.visibility = 'visible'
//   }, 1000);
  // helpContainer.style.visibility = 'visible'
// }

function initiateSearch() {
  searchBtn.style.width = '80%'
  addHelpBtn.style.width = '18%'
  addHelpText.style.display = 'none'
  addHelpPlus.style.fontSize = '100px'
  addHelpPlus.style.margin = '0'
  searchBar.style.display = 'block'
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
