
// Get registered users
let users = JSON.parse(localStorage.getItem("users")) || [];
let students = JSON.parse(localStorage.getItem("students")) || [];
let currentUser = null;

// Show registration page
function showRegister() {
    document.getElementById("registerPage").style.display = "block";
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
}

// Show login page
function showLogin() {
    document.getElementById("registerPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

// Register user
function register() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value;

    if (!name || !email || !username || !password) {
        alert("Please fill all fields!");
        return;
    }

    let exists = users.some(function(user) {
        return user.username === username;
    });

    if (exists) {
        alert("Username already exists!");
        return;
    }

    users.push({
        name: name,
        email: email,
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");

    document.getElementById("regName").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regUsername").value = "";
    document.getElementById("regPassword").value = "";

    showLogin();
}

// Login user
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;

    let user = users.find(function(u) {
        return u.username === username && u.password === password;
    });

    if (user) {
        currentUser = user;

        document.getElementById("registerPage").style.display = "none";
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        document.getElementById("welcome").textContent =
            "Welcome, " + user.name + "!";

        displayStudents();
    } else {
        alert("Invalid username or password!");
    }
}

// Logout user
function logout() {
    currentUser = null;

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loginPage").style.display = "block";

    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
}

// Add student
function addStudent() {
    if (!currentUser) {
        alert("Please login first!");
        return;
    }

    let id = document.getElementById("studentId").value.trim();
    let name = document.getElementById("studentName").value.trim();
    let course = document.getElementById("studentCourse").value.trim();
    let marks = document.getElementById("studentMarks").value;

    if (!id || !name || !course || marks === "") {
        alert("Please enter all student details!");
        return;
    }

    students.push({
        id: id,
        name: name,
        course: course,
        marks: marks
    });

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentCourse").value = "";
    document.getElementById("studentMarks").value = "";

    displayStudents();
}

// Display students
function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(function(s, index) {
        let row = document.createElement("tr");

        [s.id, s.name, s.course, s.marks].forEach(function(value) {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");
        let button = document.createElement("button");

        button.textContent = "Delete";
        button.onclick = function() {
            deleteStudent(index);
        };

        actionCell.appendChild(button);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

// Delete student
function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}
