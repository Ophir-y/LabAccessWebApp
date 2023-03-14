/** @format */

function selectRow(row) {
  const rowInput = row.getElementsByTagName("input")[0];
  rowInput.checked = !rowInput.checked;
}

// use search box to search table for names and ids
function tableSearchFunction(name) {
  // initiation
  let input, filter, table, trs, td, txtValue;
  // get input of search box
  input = document.querySelector("#" + `${name}`);
  filter = input.value.toUpperCase();
  // get row elements of table
  table = document.querySelector("#people_table");
  trs = table.getElementsByTagName("tr");

  //go through each row element and do the following:
  for (const tr of trs) {
    // get the correct row column object to check
    td = tr.querySelector("." + `${name}`);
    // if it is not null continue
    if (td) {
      // get text value
      txtValue = td.textContent;
      // if we are an ID column and the search input is not a number check if we have that input
      // or: if we are searching names check if the name exists in the rows below
      if (!(!filter || filter.length === 0)) {
        if (name === "id" || name === "first_name" || name === "last_name") {
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
