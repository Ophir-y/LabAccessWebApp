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
    deletedoorGroupRow();
  }
});

function deletedoorGroupRow() {
  const rows = document.querySelector("tbody").querySelectorAll("tr");
  const id_list = [];
  for (const row of rows) {
    // if (row.querySelector("#check" + `${row.id}`).checked) {
    if (row.querySelector("input").checked) {
      let door_group_name = row.querySelector(".door_group_name").textContent;
      let door_id = row.querySelector(".id").textContent;
      let door_group_row = { door_id, door_group_name };
      id_list.push(door_group_row);
    }
  }

  if (id_list.length >= 1) {
    fetch(`/door_groups/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id_list),
    });
  }
}
