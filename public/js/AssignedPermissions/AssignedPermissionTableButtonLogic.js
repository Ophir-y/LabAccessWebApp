/** @format */

// add event listner to delete button.
// on click it checks for confirmation
// and then if confirmed continues to the delete request.
const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", (event) => {
  const confirmed = confirm(
    "Are you sure you want to delete the selected permission?"
  );
  if (!confirmed) {
    event.preventDefault();
  } else {
    deleteAssignedpermission();
  }
});

function deleteAssignedpermission() {
  const rows = document.querySelector("tbody").querySelectorAll("tr");
  const id_list = [];
  for (const row of rows) {
    if (row.querySelector("input").checked) {
      let person_group_name = row.querySelector(".people_groups").textContent;
      let door_group_name = row.querySelector(".door_groups").textContent;
      let permission_set_name =
        row.querySelector(".permission_Sets").textContent;
      let permission_set_row = {
        person_group_name,
        door_group_name,
        permission_set_name,
      };

      id_list.push(permission_set_row);
    }
  }
  if (id_list.length >= 1) {
    fetch(`/Assign_Permissions/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_list),
    });
  }
}
