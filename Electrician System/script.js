let users = [];
let electricians = ["Ravi", "Kiran"];
let jobs = [
    {name:"Wiring", done:false},
    {name:"Repair", done:true}
];

// NAVIGATION
function showRegister() {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
}

function showLogin() {
    registerBox.style.display = "none";
    loginBox.style.display = "block";
}

// REGISTER
function register() {
    let name = regName.value;
    let email = regEmail.value;
    let password = regPassword.value;

    if (!name || !email || !password) {
        alert("All fields required!");
        return;
    }

    if (!email.includes("@")) {
        alert("Invalid email!");
        return;
    }

    if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return;
    }

    users.push({ name, email, password });

    alert("Registration successful!");
    showLogin();
}

// LOGIN
function login() {
    let email = loginEmail.value;
    let password = loginPassword.value;

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        loginBox.style.display = "none";
        dashboard.style.display = "block";
        welcome.innerText = "Welcome " + user.name + " 👋";
        updateCounts();
    } else {
        alert("Invalid login!");
    }
}

// LOGOUT
function logout() {
    location.reload();
}

// UPDATE COUNTS
function updateCounts() {
    userCount.innerText = users.length;
    elecCount.innerText = electricians.length;
    activeCount.innerText = jobs.filter(j => !j.done).length;
    completeCount.innerText = jobs.filter(j => j.done).length;
}

// SHOW SECTIONS
function showSection(type) {
    let area = sectionArea;

    if (type === "users") {
        area.innerHTML = "<h3>Users</h3>" +
            users.map(u => `<p>${u.name} (${u.email})</p>`).join("");
    }

    if (type === "electricians") {
        area.innerHTML = `
        <h3>Electricians</h3>
        <input id="newElec" placeholder="Name">
        <button onclick="addElectrician()">Add</button>
        <ul>
            ${electricians.map((e,i)=>`
                <li>${e} <button onclick="deleteElec(${i})">X</button></li>
            `).join("")}
        </ul>`;
    }

    if (type === "activeJobs") {
        let active = jobs.filter(j => !j.done);
        area.innerHTML = `
        <h3>Active Jobs</h3>
        <input id="newJob" placeholder="Job">
        <button onclick="addJob()">Add Job</button>
        <ul>
            ${active.map((j,i)=>`
                <li>${j.name} 
                <button onclick="completeJob(${i})">Done</button></li>
            `).join("")}
        </ul>`;
    }

    if (type === "completedJobs") {
        let completed = jobs.filter(j => j.done);
        area.innerHTML = `
        <h3>Completed Jobs</h3>
        <ul>
            ${completed.map(j=>`<li>✔ ${j.name}</li>`).join("")}
        </ul>`;
    }
}

// FUNCTIONS
function addElectrician() {
    let name = newElec.value;
    if (!name) return;

    electricians.push(name);
    showSection("electricians");
    updateCounts();
}

function deleteElec(i) {
    electricians.splice(i, 1);
    showSection("electricians");
    updateCounts();
}

function addJob() {
    let job = newJob.value;
    if (!job) return;

    jobs.push({ name: job, done: false });
    showSection("activeJobs");
    updateCounts();
}

function completeJob(i) {
    let active = jobs.filter(j => !j.done);
    let jobName = active[i].name;

    let realIndex = jobs.findIndex(j => j.name === jobName);
    jobs[realIndex].done = true;

    showSection("activeJobs");
    updateCounts();
}
