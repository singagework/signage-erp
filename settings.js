// ===============================
// SETTINGS MODULE
// ===============================
console.log("Settings.js Loaded");
// Default Account
if (!localStorage.getItem("erpUser")) {

    localStorage.setItem("erpUser", JSON.stringify({
        username: "admin",
        password: "1234",
        recoveryCode: "ERP-2026",
        recoveryEmail: ""
    }));

}

// Get User
function getUser() {
    return JSON.parse(localStorage.getItem("erpUser"));
}

// Save User
function saveUser(user) {
    localStorage.setItem("erpUser", JSON.stringify(user));
}

// ===============================
// Change Username
// ===============================

function changeUsername() {

    let user = getUser();

    let newName = prompt("Enter New Username:", user.username);

    if (!newName) return;

    user.username = newName.trim();

    saveUser(user);

    alert("Username Updated Successfully");

}

// ===============================
// Change Password
// ===============================

function changePassword() {

    let user = getUser();

    let oldPass = prompt("Enter Current Password");

    if (oldPass !== user.password) {
        alert("Wrong Password");
        return;
    }

    let newPass = prompt("Enter New Password");

    if (!newPass) return;

    user.password = newPass;

    saveUser(user);

    alert("Password Updated");

}

// ===============================
// Change Recovery Code
// ===============================

function changeRecoveryCode() {

    let user = getUser();

    let oldCode = prompt("Current Recovery Code");

    if (oldCode !== user.recoveryCode) {
        alert("Wrong Recovery Code");
        return;
    }

    let newCode = prompt("New Recovery Code");

    if (!newCode) return;

    user.recoveryCode = newCode;

    saveUser(user);

    alert("Recovery Code Updated");

}
// ===============================
// BACKUP DATABASE
// ===============================

function backupData() {
    
    const data = localStorage.getItem("SignageERP");
    
    if (!data) {
        alert("No Database Found");
        return;
    }
    
    const blob = new Blob([data], { type: "application/json" });
    
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "SignageERP_Backup.json";
    a.click();
    
    alert("Backup Created Successfully");
    
}
// ===============================
// RESTORE DATABASE
// ===============================

function restoreData() {
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    
    input.onchange = function(e) {
        
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function() {
            
            localStorage.setItem("SignageERP", reader.result);
            
            alert("Database Restored Successfully");
            
            location.reload();
            
        };
        
        reader.readAsText(file);
        
    };
    
    input.click();
    
}
// ===============================
// BACKUP DATABASE
// ===============================

function backupData() {

    const db = localStorage.getItem("SignageERP");

    if (!db) {
        alert("No Database Found");
        return;
    }

    const blob = new Blob([db], {
        type: "application/json"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    const today = new Date().toISOString().slice(0, 10);

    link.download = "SignageERP_Backup_" + today + ".json";

    link.click();

    URL.revokeObjectURL(link.href);

    alert("Database Backup Downloaded Successfully");

}