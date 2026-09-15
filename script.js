const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const money_today = document.getElementById('money-today'); // 🟢 Target new element
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = localStorage.getItem('transactions') !== null 
    ? JSON.parse(localStorage.getItem('transactions')) 
    : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
        date: new Date().toLocaleDateString() // 🟢 Capture date stamp (MM/DD/YYYY format)
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    
    // Optional display: appends the date next to the text description
    const displayDate = transaction.date ? `<small style="color:#999; margin-left:8px;">(${transaction.date})</small>` : '';

    item.innerHTML = `
        ${transaction.text} ${displayDate} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Update figures
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const todayStr = new Date().toLocaleDateString(); // Get today's local string

    // 1. Total Balance
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // 2. All-time Income
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    // 3. All-time Expense
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    // 🟢 4. NEW CALCULATIONS FOR TODAY'S EXPENSES ONLY
    const todayExpense = transactions
        .filter(t => t.date === todayStr && t.amount < 0) // Filter for matching date and negative amounts
        .reduce((acc, t) => acc + t.amount, 0) * -1;

    // Apply values to HTML elements
    balance.innerText = `Nrs${total}`;
    money_plus.innerText = `+Nrs${income}`;
    money_minus.innerText = `-Nrs${expense}`;
    money_today.innerText = `Nrs${todayExpense.toFixed(2)}`; // Set today's display
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);
