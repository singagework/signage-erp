// ===========================
// TRANSACTION MODULE
// ===========================

console.log("Transaction.js Loaded");

// Add Transaction
function addTransaction(activity, details) {
  console.log("Transaction Added:", activity, details);
  const db = getDB();
  
  db.transactions.push({
   id: "TRN-" + String(db.transactions.length + 1).padStart(3, "0"),
    date: new Date().toLocaleString(),
    activity: activity,
    details: details
  });
  
  saveDB(db);
  
  //loadTransactions();
  
  if (typeof loadDashboard === "function") {
    loadDashboard();
  }
}

// Load Transaction Table
function loadTransactions() {
  
  const db = getDB();
  
  const tbody = document.getElementById("transactionTableBody");
  
  if (!tbody) return;
  
  tbody.innerHTML = "";
  
  if (db.transactions.length === 0) {
    
    tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No Transactions Found
                </td>
            </tr>
        `;
    return;
  }
  
  db.transactions
    .slice()
    .reverse()
    .forEach((t) => {
      
      tbody.innerHTML += `
                <tr>
                    <td>${t.id}</td>
                    <td>${t.date}</td>
                    <td>${t.activity}</td>
                    <td>${t.details}</td>
                </tr>
            `;
      
    });
  
}

// Refresh
loadTransactions();