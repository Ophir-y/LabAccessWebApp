/** @format */

// add event listner to delete button.
// on click it checks for confirmation
// and then if confirmed continues to the delete request.
const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", (event) => {
  const confirmed = confirm(
    "Are you sure you want to delete the selected rows?"
  );
  if (!confirmed) {
    event.preventDefault();
  } else {
    deletepermissionGroupRow();
  }
});

function deletepermissionGroupRow() {
  const rows = document.querySelector("tbody").querySelectorAll("tr");
  const id_list = [];
  for (const row of rows) {
    // if (row.querySelector("#check" + `${row.id}`).checked) {
    if (row.querySelector("input").checked) {
      let permission_group_name = row.querySelector(".permission_group_name").textContent;
      let permission_id = row.querySelector(".id").textContent;
      let permission_group_row = { permission_id, permission_group_name };
      id_list.push(permission_group_row);
    }
  }

  if (id_list.length >= 1) {
    fetch(`/permission_groups/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_list),
    });
  }
}
