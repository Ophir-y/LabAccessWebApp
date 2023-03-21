function formatDate() {
    const dateInput = document.getElementById('initial_date');
    const dateValue = new Date(dateInput.value);
    const formattedDate = dateValue.toLocaleDateString('en-GB');
    dateInput.value = formattedDate;
  }