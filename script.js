const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const money_today = document.getElementById('money-today'); 
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

    if (text.value.trim() === '' || amount.value.trim() === '') {
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
        date: new Date().toLocaleDateString() // Capture date stamp (MM/DD/YYYY format)
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
    
    // Create text wrap container to cleanly handle internal DOM layout securely
    const contentSpan = document.createElement('span');
    contentSpan.textContent = transaction.text;

    // Optional display: appends the date next to the text description safely
    if (transaction.date) {
        const dateSmall = document.createElement('small');
        dateSmall.style.color = '#999';
        dateSmall.style.marginLeft = '8px';
        dateSmall.textContent = `(${transaction.date})`;
        contentSpan.appendChild(dateSmall);
    }

    const amountSpan = document.createElement('span');
    // FIXED: Corrected currency symbol from '$' to 'Nrs' to match balance cards
    amountSpan.textContent = `${sign}Nrs${Math.abs(transaction.amount).toFixed(2)}`;

    // Create accessible, securely-bound delete button without inline handlers
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'x';
    deleteBtn.setAttribute('aria-label', `Delete ${transaction.text}`);
    deleteBtn.addEventListener('click', () => removeTransaction(transaction.id));

    // Assembly sequence
    item.appendChild(contentSpan);
    item.appendChild(amountSpan);
    item.appendChild(deleteBtn);

    list.appendChild(item);
}

// Update figures
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const todayStr = new Date().toLocaleDateString(); 

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

    // 4. CALCULATIONS FOR TODAY'S EXPENSES ONLY
    const todayExpense = transactions
        .filter(t => t.date === todayStr && t.amount < 0) 
        .reduce((acc, t) => acc + t.amount, 0) * -1;

    // Apply values to HTML elements securely
    balance.textContent = `Nrs${total}`;
    money_plus.textContent = `+Nrs${income}`;
    money_minus.textContent = `-Nrs${expense}`;
    money_today.textContent = `Nrs${todayExpense.toFixed(2)}`; 
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