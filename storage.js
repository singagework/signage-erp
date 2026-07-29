// ===============================
// STORAGE
// ===============================

const DB_NAME = "SignageERP";

function initDB() {
  
  if (!localStorage.getItem(DB_NAME)) {
    
    localStorage.setItem(DB_NAME, JSON.stringify({
      projects: [],
      stock: [],
      issues: [],
      returns: [],
      transactions: []
    }));
    
  }
  
}

function getDB() {
  return JSON.parse(localStorage.getItem(DB_NAME));
}

function saveDB(db) {
  localStorage.setItem(DB_NAME, JSON.stringify(db));
}

initDB();