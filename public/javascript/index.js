function toggleCreateForm(){
  var form = document.getElementById('create')
  if (form.style.display === "none") {
        form.style.display = "flex";
    } else {
        form.style.display = "none";
    }
}

function toggleLoginForm() {
  var form = document.getElementById('login')
  if (form.style.display === "none") {
        form.style.display = "flex";
    } else {
        form.style.display = "none";
    }
}
