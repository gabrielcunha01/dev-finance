const form = document.querySelector('#form');
const transactionList = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#incomeDisplay');
const expenseDisplay = document.querySelector('#expenseDisplay');
const totalDisplay = document.querySelector('#totalDisplay');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
    const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0);
    const total = income + expense;

    incomeDisplay.innerText = `R$ ${income.toFixed(2)}`;
    expenseDisplay.innerText = `R$ ${Math.abs(expense).toFixed(2)}`;
    totalDisplay.innerText = `R$ ${total.toFixed(2)}`;
}

function addTransactionDOM(transaction) {
    const li = document.createElement('li');
    li.style.borderLeftColor = transaction.amount > 0 ? '#2ea44f' : '#cb2431';
    li.innerHTML = `${transaction.description} <span>R$ ${transaction.amount.toFixed(2)}</span>`;
    transactionList.appendChild(li);
}

function init() {
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const transaction = {
        id: Math.floor(Math.random() * 100000),
        description: document.querySelector('#description').value,
        amount: +document.querySelector('#amount').value
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    init();
    form.reset();
});

init();