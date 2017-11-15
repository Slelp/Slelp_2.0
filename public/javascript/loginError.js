function toggleCreateForm(){
  var form = document.getElementById('create')
  if (form.style.display === "none") {
        form.style.display = "flex";
    } else {
        form.style.display = "none";
    }
}
function throwError(message) {
  console.alert(message)
}
function toggleLoginForm() {
  var form = document.getElementById('login')
  if (form.style.display === "none") {
        form.style.display = "flex";
    } else {
        form.style.display = "none";
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "80%";
    document.getElementById('info').style.display = 'none';
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('info').style.display = 'flex';
}

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementsByClassName("modal")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  console.log(modal);
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
