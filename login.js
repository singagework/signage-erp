// ===============================
// DEFAULT LOGIN
// ===============================

if (!localStorage.getItem("erpUser")) {

    localStorage.setItem("erpUser", JSON.stringify({
        username: "admin",
        password: "1234",
        recoveryCode: "ERP2026"
    }));

}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = JSON.parse(localStorage.getItem("erpUser"));

    if(username === user.username && password === user.password){

        sessionStorage.setItem("loggedIn","true");

        window.location.href = "index.html";

    }else{

        alert("Invalid Username or Password");

    }

});

// ===============================
// ALREADY LOGIN
// ===============================

if(sessionStorage.getItem("loggedIn") === "true"){

    if(location.pathname.includes("login.html")){

        // Already logged in

    }

}
// ===============================
// SHOW / HIDE PASSWORD
// ===============================

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.innerHTML = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.innerHTML = "👁";
        }

    });

}
// ===============================
// FORGOT PASSWORD
// ===============================

function forgotPassword(){

    const recovery = prompt("Enter Master Recovery Code");

    if(recovery === null) return;

    const user = JSON.parse(localStorage.getItem("erpUser"));

    if(recovery !== user.recoveryCode){

        alert("Invalid Recovery Code");

        return;

    }

    const newPassword = prompt("Enter New Password");

    if(!newPassword) return;

    user.password = newPassword;

    localStorage.setItem("erpUser", JSON.stringify(user));

    alert("Password Changed Successfully");

}