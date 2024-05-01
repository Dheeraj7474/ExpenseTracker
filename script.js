expDescriptionInput = document.getElementById("ED")
categoryInput = document.getElementById("Select_cat")
amountInput = document.getElementById("Amount")
let editingRow = null; // Store the row being edited

document.getElementById("Add_Expense").addEventListener('click',addDetails)
document.getElementById("ES").addEventListener('click',getButton)

function formatCurrency(amount) {
  const number = Number(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(number);
}


function getButton(event) {
  const target = event.target;
  const row = target.closest('tr');
  console.log(target)
  console.log(row)
  if (target.classList.value === 'delete') {
    row.remove();
    console.log(row)
  } 
  else if (target.classList.value === 'edit') {
    const cells = row.querySelectorAll('td');
    const currentDescription = cells[0].textContent;
    const currentCategory = cells[1].textContent;
    const currentAmount = cells[2].textContent.replace(/[^0-9.-]+/g, "");

    expDescriptionInput.value = currentDescription;
    categoryInput.value = currentCategory;
    amountInput.value = currentAmount;

    editingRow = row; // Store the row being edited
  }
}

function addDetails() {
  
  if (expDescriptionInput.value && categoryInput.value && amountInput.value) {
    document.getElementById("ES").style.visibility='visible'
    document.getElementById('notify').style.visibility='hidden'
    const amount = formatCurrency(amountInput.value);

    if (editingRow) {
      // Update the existing row
      const cells = editingRow.querySelectorAll('td');
      cells[0].textContent = expDescriptionInput.value;
      cells[1].textContent = categoryInput.value;
      cells[2].textContent = amount;

      editingRow = null; // Reset the editingRow
    } 
    else {
      // Create a new row
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${expDescriptionInput.value}</td>
        <td>${categoryInput.value}</td>
        <td>${amount}</td>
        <td>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </td>
      `;
      document.getElementById("ES").appendChild(newRow);
    }

    expDescriptionInput.value = '';
    categoryInput.value = '';
    amountInput.value = '';
  } 
  else {
    document.getElementById('notify').style.visibility='visible'
  }
}