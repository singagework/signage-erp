// ======================================
// STOCK MODULE
// ======================================

console.log("Stock.js Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("saveStockBtn");

    if (btn) {
        btn.addEventListener("click", saveStock);
    }

    loadStock();

});

// =============================
// Save Material
// =============================

function saveStock() {

    const material = document.getElementById("materialName").value.trim();
    const category = document.getElementById("materialCategory").value.trim();
    const size = document.getElementById("materialSize").value.trim();
    const unit = document.getElementById("materialUnit").value;
    const qty = Number(document.getElementById("materialQty").value);
    const minQty = Number(document.getElementById("materialMinQty").value);
    const location = document.getElementById("materialLocation").value.trim();

    if (material === "") {
        alert("Please Enter Material Name");
        return;
    }

    const db = getDB();

// Check Existing Material
const existingMaterial = db.stock.find(item =>
    item.material.toLowerCase() === material.toLowerCase() &&
    item.size.toLowerCase() === size.toLowerCase()
);

if (existingMaterial) {

    existingMaterial.qty += qty;

    saveDB(db);

    if (typeof addTransaction === "function") {
        addTransaction(
            "Stock Added",
            `${material} (+${qty} ${unit})`
        );
    }

    refreshERP();

    clearStockForm();

    alert("Stock Updated Successfully");

    return;
}

    db.stock.push({
        id: "MAT-" + String(db.stock.length + 1).padStart(3, "0"),
        material,
        category,
        size,
        unit,
        qty,
        minQty,
        location
    });

   saveDB(db);

if (typeof addTransaction === "function") {
    addTransaction("Stock Added", material);
}


    loadStock();

    if (typeof loadDashboard === "function") {
        loadDashboard();
    }

    clearStockForm();
    scrollToTop();

    alert("Material Saved Successfully");

}

// =============================
// Load Stock
// =============================

function loadStock() {

    const tbody = document.getElementById("stockTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const db = getDB();

    db.stock.slice().reverse().forEach(item => {

        tbody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.material}</td>
            <td>${item.category}</td>
            <td>${item.qty}</td>
            <td>${item.unit}</td>
            <td>${item.minQty}</td>
            <td>${item.location}</td>
            <td>
    <button onclick="addMoreStock('${item.id}')">➕</button>
    <button onclick="deleteStock('${item.id}')">🗑️</button>
</td>
        </tr>
        `;

    });

}

// =============================
// Clear Form
// =============================

function clearStockForm() {

    document.getElementById("materialName").value = "";
    document.getElementById("materialCategory").value = "";
    document.getElementById("materialSize").value = "";
    document.getElementById("materialUnit").selectedIndex = 0;
    document.getElementById("materialQty").value = "";
    document.getElementById("materialMinQty").value = "";
    document.getElementById("materialLocation").value = "";

}
// =============================
// Delete Stock
// =============================

function deleteStock(id) {

    if (!confirm("Delete this material?")) return;

    const db = getDB();

    // Check issue history
    const material = db.stock.find(s => s.id === id);

    const used = db.issues.some(i => i.material === material.material);

    if (used) {
        alert("Material has issue history.\nDelete not allowed.");
        return;
    }

    db.stock = db.stock.filter(s => s.id !== id);

    saveDB(db);

    refreshERP();

    alert("Material Deleted Successfully");

}
function addMoreStock(id) {

    const db = getDB();

    const item = db.stock.find(s => s.id === id);

    if (!item) return;

    const input = prompt("Enter Qty to Add:");

    if (!input) return;

    const qty = Number(input);

    if (isNaN(qty) || qty <= 0) {
        alert("Invalid Quantity");
        return;
    }

    item.qty += qty;

    saveDB(db);

    addTransaction(
        "Stock Added",
        `${item.material} (+${qty} ${item.unit})`
    );

    refreshERP();

    alert("Stock Updated Successfully");
}