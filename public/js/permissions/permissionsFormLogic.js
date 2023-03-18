/** @format */

function checkId(form) {
  // get the password input value
  const idInput = form.permission_id.value;
  table = document.querySelector("#permissions");
  trs = table.getElementsByTagName("tr");
  for (const tr of trs) {
    if (tr.id === idInput) {
      alert("ID already exists!! \nChange ID!!!!!!");
      return false;
    }
  }
  return true;
}
