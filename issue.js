// ======================================
// ISSUE MODULE
// ======================================

console.log("Issue.js Loaded");

document.addEventListener("DOMContentLoaded", () => {

    loadIssueDropdowns();
    loadIssues();

    const btn = document.getElementById("saveIssueBtn");

    if (btn) {
        btn.addEventListener("click", saveIssue);
    }

});

// ===============================
// Load Dropdowns
// ===============================

function loadIssueDropdowns() {

    const db = getDB();

    const projectSelect = document.getElementById("issueProject");
    const materialSelect = document.getElementById("issueMaterial");

    if (!projectSelect || !materialSelect) return;

    projectSelect.innerHTML =
        `<option value="">Select Project</option>`;

    materialSelect.innerHTML =
        `<option value="">Select Material</option>`;

    db.projects.forEach(project => {

        projectSelect.innerHTML +=
        `<option value="${project.project}">
            ${project.project}
        </option>`;

    });

    db.stock.forEach(material => {

        if (material.qty > 0) {

            materialSelect.innerHTML +=
            `<option value="${material.id}">
                ${material.material} (${material.qty} ${material.unit})
            </option>`;

        }

    });

}

// ===============================
// Save Issue
// ===============================

function saveIssue() {

    const db = getDB();

    const project = document.getElementById("issueProject").value;
    const materialId = document.getElementById("issueMaterial").value;
    const qty = Number(document.getElementById("issueQty").value);
    const date = document.getElementById("issueDate").value;
    const issueBy = document.getElementById("issueBy").value.trim();
    const remark = document.getElementById("issueRemark").value.trim();

    if (!project || !materialId || qty <= 0) {
        alert("Please fill all required fields.");
        return;
    }

    const material = db.stock.find(item => item.id === materialId);

    if (!material) {
        alert("Material not found.");
        return;
    }

    if (qty > material.qty) {
        alert("Insufficient Stock.");
        return;
    }

    material.qty -= qty;

    const issue = {
        id: "ISS-" + String(db.issues.length + 1).padStart(3, "0"),
        project,
        material: material.material,
        qty,
        date,
        issueBy,
        remark
    };

    db.issues.push(issue);

  saveDB(db);

if (typeof addTransaction === "function") {
    addTransaction("Material Issued", `${material.material} → ${project}`);
}
loadDashboard();
    loadIssues();
    loadIssueDropdowns();

    if (typeof loadStock === "function") loadStock();
    if (typeof loadDashboard === "function") loadDashboard();

    clearIssueForm();
scrollToTop();
    alert("Material Issued Successfully");

}

// ===============================
// Load Issue History
// ===============================

function loadIssues() {

    const tbody = document.getElementById("issueTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const db = getDB();

    db.issues.slice().reverse().forEach(issue => {

        tbody.innerHTML += `
        <tr>
            <td>${issue.id}</td>
            <td>${issue.project}</td>
            <td>${issue.material}</td>
            <td>${issue.qty}</td>
            <td>${issue.date}</td>
            <td>${issue.issueBy}</td>
            <td>${issue.remark}</td>
        </tr>`;
    });

}

// ===============================
// Clear Form
// ===============================

function clearIssueForm() {

    document.getElementById("issueProject").selectedIndex = 0;
    document.getElementById("issueMaterial").selectedIndex = 0;
    document.getElementById("issueQty").value = "";
    document.getElementById("issueDate").value = "";
    document.getElementById("issueBy").value = "";
    document.getElementById("issueRemark").value = "";

}