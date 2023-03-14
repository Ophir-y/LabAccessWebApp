/** @format */

// checked logic:
const passrd = document.querySelectorAll(".adminPass");
const check = document.querySelector("#admin_system_access");
// make passwords hidden
for (const elem of passrd) {
  elem.style.visibility = "hidden";
}
// if admin is checked then unhide
check.addEventListener("change", () => {
  if (check.checked) {
    for (const elem of passrd) {
      elem.style.visibility = "visible";
    }
  } else {
    for (const elem of passrd) {
      elem.style.visibility = "hidden";
    }
  }
});

function checkIdandPassword(form) {
  // get the password input value
  const idInput = form.person_id.value;
  const firstPass = form.admin_password.value;
  const confPass = form.confirm_admin_password.value;
  table = document.querySelector("#people_table");
  trs = table.getElementsByTagName("tr");

  for (const tr of trs) {
    if (tr.id === idInput) {
      alert("ID already exists!! \nChange ID!!!!!!");
      return false;
    }
  }

  //if check is checked
  if (form.admin_system_access.checked) {
    if (firstPass === "" || confPass === "") {
      alert("Please fill both password fields!");
      return false;
    } else if (!(firstPass === confPass)) {
      alert("Passwords must match!!");
      return false;
    }
  }
  return true;
}
