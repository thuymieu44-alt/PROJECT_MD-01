// Lấy danh sách users
let users = JSON.parse(localStorage.getItem("users")) || [];

// Ẩn toàn bộ lỗi
function hideAllErr() {
  document.getElementById("msg").classList.remove("show");
  document.getElementById("edit-error").style.display = "none";

  document.querySelectorAll("#edit-error > div, #edit-error > span").forEach(el => {
    el.style.display = "none";
  });
}

// Lấy ID user đang edit
let editId = localStorage.getItem("editId");
console.log(editId);

// Tìm user theo ID
let editUser = users.find(u => u.usercode === editId);

// Khi load trang → đổ dữ liệu vào form
window.onload = function () {
  if (!editUser) return;

  document.getElementById("user-code").value = editUser.usercode;
  document.getElementById("fullname").value = editUser.fullname;
  document.getElementById("username").value = editUser.username;
  document.getElementById("email").value = editUser.email;
  document.getElementById("password").value = editUser.password;
  document.getElementById("role").value = editUser.role;
  document.getElementById("dob").value = editUser.birthday;
  document.querySelector(`input[name="status"][value="${editUser.status}"]`).checked = true;
  document.querySelector(".description-text-input").value = editUser.description;
};

// Nút BACK
document.querySelector(".back-btn").onclick = function () {
  window.location.href = "dashboard.html";
};

//Nút SAVE
document.querySelector(".save-btn").addEventListener("click", function (e) {
  e.preventDefault();
  hideAllErr();

  // Lấy dữ liệu mới
  let fullname = document.getElementById("fullname").value.trim();
  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;
  let birthday = document.getElementById("dob").value;
  let status = document.querySelector("input[name='status']:checked").value;
  let description = document.querySelector(".description-text-input").value.trim();

  //Validate rỗng

  if (!fullname) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".fullname-empty").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  if (!username) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".username-empty").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  if (!email) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".email-empty").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  // Email regex
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".email-error").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  // Email trùng (trừ user đang edit)
  if (users.some(u => u.email === email && u.usercode !== editId)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".email-exist").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  // Password
  if (!password) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".password-empty").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  if (password.length < 8) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".password-min-length-error").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  if (!/\d/.test(password)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".password-number-required-error").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("edit-error").style.display = "block";
    document.querySelector(".password-uppercase-lowercase-error").style.display = "flex";
    setTimeout(hideAllErr, 3000);
    return;
  }

  //Cập nhật user
  editUser.fullname = fullname;
  editUser.username = username;
  editUser.email = email;
  editUser.password = password;
  editUser.role = role;
  editUser.birthday = birthday;
  editUser.status = status;
  editUser.description = description;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("editId");

  // Hiện toast
  document.getElementById("msg").classList.add("show");
  document.getElementById("edit-toast").style.display = "flex";

  // Ẩn toast + chuyển trang
  setTimeout(() => {
    document.getElementById("edit-toast").style.display = "none";
    document.getElementById("msg").classList.remove("show");
    window.location.href = "dashboard.html";
  }, 2000);
});
