console.log(getDB());
const menuItems = document.querySelectorAll(".menu li");
const pages = document.querySelectorAll(".page");

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        menuItems.forEach(m => m.classList.remove("active"));
        this.classList.add("active");

        pages.forEach(p => p.classList.remove("active-page"));

        const pageId = this.dataset.page;

        document.getElementById(pageId).classList.add("active-page");

    });

});

// ======================================
// ERP Refresh
// ======================================

function refreshERP() {

    if (typeof loadDashboard === "function") loadDashboard();

    if (typeof loadProjects === "function") loadProjects();

    if (typeof loadStock === "function") loadStock();

    if (typeof loadIssueDropdowns === "function") loadIssueDropdowns();

    if (typeof loadIssues === "function") loadIssues();

    if (typeof loadReturns === "function") loadReturns();

    if (typeof loadTransactions === "function") loadTransactions();

}
// =============================
// Live Clock
// =============================

function startClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    function updateClock() {

        const now = new Date();

        const time = now.toLocaleTimeString("en-IN", {
            hour12: true
        });

        clock.textContent = time;
    }

    updateClock();

    setInterval(updateClock, 1000);
}

document.addEventListener("DOMContentLoaded", startClock);

// =============================
// Global Search
// =============================

const searchBox = document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll(".page.active-page tbody tr");

        rows.forEach(row => {

            row.style.display =
                row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

        });

    });

}
// =============================
// Scroll Table To Top
// =============================

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// =============================
// Current Date
// =============================

function loadCurrentDate() {

    const d = new Date();

    document.getElementById("currentDate").innerText =
        d.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

}

loadCurrentDate();
// ===============================
// LOGOUT
// ===============================

function logout(){

    if(!confirm("Do you want to Logout?")) return;

    sessionStorage.removeItem("loggedIn");

    window.location.href="login.html";

}