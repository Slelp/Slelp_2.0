const searchBtn = document.getElementsByClassName("form-search")[0];
searchBtn.addEventListener("click", initiateSearch)
const addHelpBtn = document.getElementsByClassName("form-help")[0]
const searchBar = document.getElementById('search-bar');
const searchIcon = document.getElementsByClassName('search-img')[0];


function initiateSearch() {
  if(searchBar.style.display = 'none'){
    searchBtn.style.width = '100%'
    addHelpBtn.style.display = 'none'
    searchBar.style.display = 'block'
    searchBtn.removeEventListener("click", initiateSearch)
  }

}
searchIcon.addEventListener("click", closeSearch)

function closeSearch() {
  console.log(closeSearch);
  if(searchBar.style.display = 'block'){
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
        a = helps[i].getElementsByTagName("h3")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            helps[i].style.display = "";
        } else {
          console.log(helps);
            helps[i].parentElement.parentElement.style.display = "none";

        }
    }
}
