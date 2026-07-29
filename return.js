// ======================================
// RETURN MODULE
// ======================================

console.log("Return.js Loaded");

document.addEventListener("DOMContentLoaded", () => {

    loadReturnDropdowns();
    loadReturns();

    const btn = document.getElementById("saveReturnBtn");

    if (btn) {
        btn.addEventListener("click", saveReturn);
    }

});

// ===============================
// Load Projects
// ===============================

function loadReturnDropdowns() {

    const db = getDB();

    const project = document.getElementById("returnProject");

    if (!project) return;

    project.innerHTML =
        `<option value="">Select Project</option>`;

    db.projects.forEach(p => {

        project.innerHTML +=
        `<option value="${p.project}">
            ${p.project}
        </option>`;

    });

}

// ===============================
// Load Material According Project
// ===============================

document.getElementById("returnProject").addEventListener("change", function () {

    const db = getDB();

    const material = document.getElementById("returnMaterial");

    material.innerHTML =
        `<option value="">Select Material</option>`;
const issuedMaterials = [...new Set(
  db.issues
  .filter(i => i.project === this.value)
  .map(i => i.material)
)];

issuedMaterials.forEach(name => {
  
  material.innerHTML += `
        <option value="${name}">
            ${name}
        </option>`;
  
});
});

// ===============================
// Save Return
// ===============================

function saveReturn() {

    const db = getDB();

    const project = document.getElementById("returnProject").value;
    const material = document.getElementById("returnMaterial").value;
    const qty = Number(document.getElementById("returnQty").value);
    const date = document.getElementById("returnDate").value;
    const person = document.getElementById("returnBy").value.trim();
    const remark = document.getElementById("returnRemark").value.trim();

  if (!project || !material || !date || qty <= 0) {

        alert("Please Fill Required Fields");
        return;

    }
    // ======================================
// CHECK RETURN QTY
// ======================================

const totalIssued = db.issues
  .filter(i => i.project === project && i.material === material)
  .reduce((sum, i) => sum + Number(i.qty), 0);

const totalReturned = db.returns
  .filter(r => r.project === project && r.material === material)
  .reduce((sum, r) => sum + Number(r.qty), 0);

const remainingQty = totalIssued - totalReturned;
if (remainingQty <= 0) {
    alert("This material has already been fully returned.");
    return;
}
if (qty > remainingQty) {
  alert("Return Qty cannot be greater than Issued Qty.\nRemaining Qty : " + remainingQty);
  return;
}


    const stock = db.stock.find(s => s.material === material);

    if (!stock) {

        alert("Material Not Found");
        return;

    }

    stock.qty += qty;

    db.returns.push({

        id: "RET-" + String(db.returns.length + 1).padStart(3, "0"),

        project,
        material,
        qty,
        date,
        person,
        remark

    });

   saveDB(db);

if (typeof addTransaction === "function") {
    addTransaction(
        "Material Returned",
        material + " ← " + project
    );
}
    refreshERP();

    clearReturnForm();
scrollToTop();
    alert("Material Returned Successfully");

}

// ===============================
// Return History
// ===============================

function loadReturns() {

    const tbody = document.getElementById("returnTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const db = getDB();

   db.returns.slice().reverse().forEach(r => {

        tbody.innerHTML += `
        <tr>
            <td>${r.id}</td>
            <td>${r.project}</td>
            <td>${r.material}</td>
            <td>${r.qty}</td>
            <td>${r.date}</td>
            <td>${r.person}</td>
            <td>${r.remark}</td>
        </tr>`;

    });

}

// ===============================
// Clear Form
// ===============================

function clearReturnForm() {

    document.getElementById("returnProject").selectedIndex = 0;
    document.getElementById("returnMaterial").innerHTML =
        `<option value="">Select Material</option>`;
    document.getElementById("returnQty").value = "";
    document.getElementById("returnDate").value = "";
    document.getElementById("returnBy").value = "";
    document.getElementById("returnRemark").value = "";

}