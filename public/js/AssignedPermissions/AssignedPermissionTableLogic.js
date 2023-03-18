/** @format */
function selectRow(row) {
  const rowInput = row.getElementsByTagName("input")[0];
  rowInput.checked = !rowInput.checked;
}
// set admin flag
let adminFlag = 1;
// use search box to search table for names and ids
function tableSearchFunction(name) {
  // initiation
  let input, filter, table, trs, td, txtValue;
  // get input of search box
  input = document.querySelector("#" + `${name}`);
  filter = input.value.toUpperCase();
  console.log(filter);
  // get row elements of table
  table = document.querySelector("#AssignedPermissions");
  trs = table.getElementsByTagName("tr");

  //go through each row element and do the following:
  for (const tr of trs) {
    // get the correct row column object to check
    td = tr.querySelector("." + `${name}`);
    console.log(tr);
    console.log(td);
    // if it is not null continue
    if (td) {
      // get text value
      txtValue = td.textContent;
      console.log(txtValue);
      console.log(name);
      // if we are an ID column and the search input is not a number check if we have that input
      // or: if we are searching names check if the name exists in the rows below
      if (!(!filter || filter.length === 0)) {
        if (
          name === "people_groups" ||
          name === "door_groups" ||
          name === "permission_Sets"
        ) {
          console.log(txtValue.toUpperCase().slice(0, filter.length));
          // get only the rows where the input matches the row string values.
          // compare only the charecters which are within the filters string length.
          if (txtValue.toUpperCase().slice(0, filter.length) == filter) {
            // display only rows that have the search input  in them.
            tr.style.display = "";
          } else {
            tr.style.display = "none";
          }
        }
      } else {
        tr.style.display = "";
      }
    }
  }
}
