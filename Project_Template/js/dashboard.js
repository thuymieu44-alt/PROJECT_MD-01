let users = JSON.parse(localStorage.getItem('users')) || [];

// Nếu phần tử là mảng thì tách ra (mảng trong mảng)
if (Array.isArray(users[0])) {
    users = [...users[0], ...users.slice(1)];
}

localStorage.setItem("users", JSON.stringify(users));

// Hiển thị dữ liệu
function renderUsers(usersToRender = users) {
    let tBody = document.getElementById("table-body");
    tBody.innerHTML = "";

    // Đảo ngược hiển thị
    usersToRender = [...usersToRender].reverse();

    usersToRender.forEach((e) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${e.usercode}</td>
        <td>${e.username}</td>
        <td>${e.email}</td>
        <td>${e.role}</td>
        <td>${e.birthday}</td>
        <td>${e.status}</td>
        <td>${e.description}</td>
        <td>
            <button class="delete-btn" id="${e.usercode}">Delete</button>
            <span><button class="edit-btn" id="${e.usercode}">Edit</button></span>
        </td>`;
        tBody.appendChild(tr);
    });
    // CSS cho button
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.style.backgroundColor = "yellow";
        btn.style.marginTop = "10px";
    });
}
renderUsers();

// Tìm kiếm theo tên
document.querySelector(".fa-magnifying-glass").addEventListener("click", function () {
    let keyword = document.getElementById("search-box").value.toLowerCase().trim();

    let result = users.filter(u =>
        u.username.toLowerCase().includes(keyword)
    );

    if (result.length === 0) {
        alert("User không tồn tại");
        return;
    }

    renderUsers(result);
});

// DELETE + EDIT
let tBody = document.getElementById("table-body");
tBody.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {
        let deleteID = e.target.id;
        let delIndex = users.findIndex(user => user.usercode === deleteID);

        if (delIndex !== -1) {
            users.splice(delIndex, 1);
            localStorage.setItem("users", JSON.stringify(users));
            renderUsers();
        }
    }

    if (e.target.classList.contains("edit-btn")) {
        let editId = e.target.id;
        localStorage.setItem("editId", editId);
        window.location.href = "edit-user.html";
    }
});

// Responsive
function updateLayout() {
  let width = window.innerWidth;

  if (width < 900) {
    document.body.classList.add("small-screen");
  } else {
    document.body.classList.remove("small-screen");
  }
}

updateLayout();
window.addEventListener("resize", updateLayout);
