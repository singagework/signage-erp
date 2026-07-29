// ===============================
// DASHBOARD
// ===============================

function loadDashboard() {

    const db = getDB();

    document.getElementById("runningProjects").textContent =
        db.projects.filter(p => p.status === "Running").length;

    document.getElementById("pendingProjects").textContent =
        db.projects.filter(p => p.status === "Pending").length;

    const lowStockCount = db.stock.filter(item => item.qty <= item.minQty).length;

document.getElementById("lowStock").innerText = lowStockCount;
    document.getElementById("totalTransactions").textContent =
        db.transactions.length;

}
loadDashboard();
// ==============================
// Dashboard Details
// ==============================

function showRunningProjects() {

    const db = getDB();

    document.getElementById("detailTitle").innerText = "Running Projects";

    document.getElementById("detailHead").innerHTML =
        "<th>ID</th><th>Client</th><th>Project</th>";

    let html = "";

    db.projects
        .filter(p => p.status === "Running")
        .forEach(p => {

            html += `
            <tr>
                <td>${p.id}</td>
                <td>${p.client}</td>
                <td>${p.project}</td>
            </tr>`;

        });

    document.getElementById("detailBody").innerHTML =
        html || "<tr><td colspan='3'>No Running Projects</td></tr>";
}


function showPendingProjects() {

    const db = getDB();

    document.getElementById("detailTitle").innerText = "Pending Projects";

    document.getElementById("detailHead").innerHTML =
        "<th>ID</th><th>Client</th><th>Project</th>";

    let html = "";

    db.projects
        .filter(p => p.status === "Pending")
        .forEach(p => {

            html += `
            <tr>
                <td>${p.id}</td>
                <td>${p.client}</td>
                <td>${p.project}</td>
            </tr>`;

        });

    document.getElementById("detailBody").innerHTML =
        html || "<tr><td colspan='3'>No Pending Projects</td></tr>";
}


function showLowStock() {

    const db = getDB();

    document.getElementById("detailTitle").innerText = "Low Stock";

    document.getElementById("detailHead").innerHTML =
        "<th>Material</th><th>Qty</th><th>Min Qty</th>";

    let html = "";

    db.stock
        .filter(s => s.qty <= s.minQty)
        .forEach(s => {

            html += `
            <tr>
                <td>${s.material}</td>
                <td>${s.qty}</td>
                <td>${s.minQty}</td>
            </tr>`;

        });

    document.getElementById("detailBody").innerHTML =
        html || "<tr><td colspan='3'>No Low Stock</td></tr>";
}
function loadRecentTransactions() {

    const body = document.getElementById("recentTransactionBody");
    if (!body) return;

    const db = getDB();

    body.innerHTML = "";

    const recent = db.transactions.slice(-5).reverse();

    if (recent.length === 0) {
        body.innerHTML = `
        <tr>
            <td colspan="2">No Transactions</td>
        </tr>`;
        return;
    }

    recent.forEach(t => {
        body.innerHTML += `
        <tr>
            <td>${t.activity}</td>
            <td>${t.details}</td>
        </tr>`;
    });

}
loadRecentTransactions();