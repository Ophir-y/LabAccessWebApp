/** @format */

// checked logic:
const hiden_div = document.querySelectorAll(".form_group_hide");
const list_div = document.querySelectorAll(".form_group_list");
const checkbox_for_group = document.querySelector("#new_group_checkbox");

// make passwords hidden
for (const elem of hiden_div) {
  elem.style.visibility = "hidden";
}
// if checkbox is checked then unhide
checkbox_for_group.addEventListener("change", () => {
  if (checkbox_for_group.checked) {
    for (const elem of list_div) {
      elem.style.visibility = "hidden";
    }
    for (const elem of hiden_div) {
      elem.style.visibility = "visible";
    }
  } else {
    for (const elem of list_div) {
      elem.style.visibility = "visible";
    }
    for (const elem of hiden_div) {
      elem.style.visibility = "hidden";
    }
  }
});

//getting the different buttons and adding event listners to them.
const popupBtn = document.getElementById("popupBtn");
const submitBtn = document.getElementById("groupsubmit");
const closeBtn = document.getElementById("closeBtn");
const popupContainer = document.getElementById("popupContainer");

popupBtn.addEventListener("click", function () {
  popupContainer.style.display = "block";
});
closeBtn.addEventListener("click", function () {
  popupContainer.style.display = "none";
});
submitBtn.addEventListener("click", function () {
  popupContainer.style.display = "none";
  groupSelected();
});

// sends a request to server to add a door group to the database
function groupSelected() {
  // get rows of table
  const rows = document.querySelector("tbody").querySelectorAll("tr");
  // get the popup form.
  const groupForm = document.getElementById("new_group_form");
  let door_group_name;
  // check if the checkbox is checked
  // if so then the user has chosen to create a new group
  // if not then the user will pick from a list of groups.
  if (checkbox_for_group.checked) {
    door_group_name = groupForm.door_group_name.value;
  } else {
    door_group_name = groupForm.door_group_list.value;
  }

  const id_list = [];
  for (const row of rows) {
    if (row.querySelector("#check" + `${row.id}`).checked) {
      let door_id = row.id;
      let door_group_row = { door_id, door_group_name };
      id_list.push(door_group_row);
    }
  }
  if (id_list.length >= 1) {
    fetch(`/door_groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_list),
    });
  }
}

// add event listner to delete button.
// on click it checks for confirmation
// and then if confirmed continues to the delete request.
const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", (event) => {
  const confirmed = confirm(
    "Are you sure you want to delete the selected door?"
  );
  if (!confirmed) {
    event.preventDefault();
  } else {
    deletedoor();
  }
});

function deletedoor() {
  const rows = document.querySelector("tbody").querySelectorAll("tr");
  const id_list = [];
  for (const row of rows) {
    if (row.querySelector("#check" + `${row.id}`).checked) {
      id_list.push(row.id);
    }
  }
  if (id_list.length >= 1) {
    fetch(`/doors/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_list),
    });
  }
}

function checkgroupName(form) {
  const formInput = form.door_group_name.value;

  if (form.new_group_checkbox.checked) {
    if (formInput === "") {
      alert("Group Name Can't be empty");
      return false;
    }
  }
  return true;
}
