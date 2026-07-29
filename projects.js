// ======================================
// PROJECT MODULE
// ======================================

console.log("Projects.js Loaded");
//let editingProjectId = null;
// Start
document.addEventListener("DOMContentLoaded", () => {

    const saveBtn = document.getElementById("saveProjectBtn");

    if (!saveBtn) {
        console.error("Save Button Not Found!");
        return;
    }

    saveBtn.addEventListener("click", saveProject);

    loadProjects();

});


// ======================================
// Save Project
// ======================================

function saveProject() {

    const client = document.getElementById("clientName").value.trim();
    const mobile = document.getElementById("clientMobile").value.trim();
    const project = document.getElementById("projectName").value.trim();
    const type = document.getElementById("projectType").value;
    const delivery = document.getElementById("deliveryDate").value;
    const status = document.getElementById("projectStatus").value;

    if (client === "" || project === "") {
        alert("Please fill Client Name & Project Name");
        return;
    }

    const db = getDB();
    // ==========================
// UPDATE PROJECT
// ==========================

if (editingProjectId) {

    const projectData = db.projects.find(p => p.id === editingProjectId);

    if (projectData) {

        projectData.client = client;
        projectData.mobile = mobile;
        projectData.project = project;
        projectData.type = type;
        projectData.delivery = delivery;
        projectData.status = status;

    }

    saveDB(db);

    addTransaction("Project Updated", project);

    editingProjectId = null;

    saveProjectBtn.innerText = "Save Project";

    refreshERP();

    clearProjectForm();
scrollToTop();
    alert("Project Updated Successfully");

    return;
}

    const newProject = {
        id: "PRJ-" + String(db.projects.length + 1).padStart(3, "0"),
        client: client,
        mobile: mobile,
        project: project,
        type: type,
        delivery: delivery,
        status: status
    };

    db.projects.push(newProject);

 saveDB(db);

// Transaction
//if (typeof addTransaction === "function") {
  //  addTransaction("Project Created", project);
//}
    alert("Project Saved Successfully");

    clearProjectForm();

    loadProjects();

    if (typeof loadDashboard === "function") {
        loadDashboard();
    }

}


// ======================================
// Load Project List
// ======================================

function loadProjects() {

    const tbody = document.getElementById("projectTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const db = getDB();

  db.projects.slice().reverse().forEach(p => {

      tbody.innerHTML += `
<tr>
    <td>${p.id}</td>
    <td>${p.client}</td>
    <td>${p.project}</td>
    <td>${p.status}</td>
    <td>${p.delivery}</td>
    <td>
        <button onclick="editProject('${p.id}')">✏️</button>
        <button onclick="deleteProject('${p.id}')">🗑️</button>
    </td>
</tr>`;
    });
    

}


// ======================================
// Clear Form
// ======================================

function clearProjectForm() {

    document.getElementById("clientName").value = "";
    document.getElementById("clientMobile").value = "";
    document.getElementById("projectName").value = "";
    document.getElementById("projectType").selectedIndex = 0;
    document.getElementById("deliveryDate").value = "";
    document.getElementById("projectStatus").selectedIndex = 0;
editingProjectId = null;
saveProjectBtn.innerText = "Save Project";
}
function deleteProject(id) {
    
    if (!confirm("Delete this project?")) return;
    
    const db = getDB();
   
    // Check Issue History
    
const hasIssue = db.issues.some(issue => issue.project === db.projects.find(p => p.id === id)?.project);

if (hasIssue) {
    alert("Project has Issue History.\nDelete not allowed.");
    return;
}
    console.log("Delete ID:", id);
    console.log("Before:", db.projects);
    
    db.projects = db.projects.filter(p => p.id !== id);
    
    console.log("After:", db.projects);
    
    saveDB(db);
    
    refreshERP();
}
let editingProjectId = null;

function editProject(id) {

    const db = getDB();

    const p = db.projects.find(x => x.id === id);

    if (!p) return;

    editingProjectId = id;

    clientName.value = p.client;
    clientMobile.value = p.mobile;
    projectName.value = p.project;
    projectType.value = p.type;
    deliveryDate.value = p.delivery;
    projectStatus.value = p.status;

    saveProjectBtn.innerText = "Update Project";

}