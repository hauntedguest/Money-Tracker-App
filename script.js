let expenses = [];
let totalAmount = 0;
const CategorySelect = document.getElementById('category_select');
const amountinput = document.getElementById('amount_input');
const infoinput = document.getElementById('info');
const dateinput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function () {
    const category = CategorySelect.value;
    const info = infoinput.value;
    const amount = Number(amountinput.value);
    const date = dateinput.value;

    if (category === '') {
        alert('Please select a Category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid Amount');
        return;
    }
    if (date === '') {
        alert('Please select a Date');
        return;
    }
    if (info === '') {
        alert('Please provide Info');
        return;
    }
    expenses.push({ category, amount, info, date });
    if (category === 'Income') {
        totalAmount += amount;
    }
    if (category === 'Expense') {
        totalAmount -= amount;
    }
    totalAmountCell.textContent = totalAmount;

    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        const index = expenses.findIndex(expense => expense === expenseToDelete);
        const expenseToDelete = expenses[index];
        expenses.splice(index, 1);
        if (expenseToDelete.category === 'Income') {
            totalAmount -= expenseToDelete.amount;
        }
        if (expenseToDelete.category === 'Expense') {
            totalAmount += expenseToDelete.amount;
        }
        totalAmountCell.textContent = totalAmount;
        expenseTableBody.removeChild(newRow);
    });

    const expenseToAdd = expenses[expenses.length - 1];
    categoryCell.textContent = expenseToAdd.category;
    amountCell.textContent = expenseToAdd.amount;
    infoCell.textContent = expenseToAdd.info;
    dateCell.textContent = expenseToAdd.date;
    deleteCell.appendChild(deleteBtn);
});
