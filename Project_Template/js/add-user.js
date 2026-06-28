const form = document.getElementById("add-new-user-form");
let localUsers = JSON.parse(localStorage.getItem("users")) || [];

// Ẩn toàn bộ lỗi
function hideAllErr() {
  document.getElementById("msg").classList.remove("show");
  document.getElementById("add-error").style.display = "none";

  document.querySelectorAll("#add-error > div").forEach(el => {
    el.style.display = "none";
  });
}

// Tạo user code tự động
function generateUserCode() {
  let number = localUsers.length + 1;
  return "U" + String(number).padStart(3, "0");
}

// Gán user code khi vào trang
document.getElementById("user-code").value = generateUserCode();

// Xử lý submit
let btnAdd = document.querySelector(".add-btn")
btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  hideAllErr();

  let usercode = document.getElementById("user-code").value.trim();
  let fullname = document.getElementById("fullname").value.trim();
  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;
  let birthday = document.getElementById("dob").value;
  let status = document.querySelector("input[name='status']:checked").value;
  let description = document.querySelector(".description-text-input").value.trim();

  // Validate rỗng
  if (!fullname) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".fullname-empty").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
  }

  if (!username) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".username-empty").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
  }

  if (!email) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".email-empty").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
  }

  if (!password) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".password-empty").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
    return;
  }

  // Email regex
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".email-error").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
    return;
  }

  // Email tồn tại
  if (localUsers.some(u => u.email === email)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".email-exist").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
    return;
  }

  // Password 
  if (password.length < 8) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".password-min-length-error").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
    return;
  }

  if (!/\d/.test(password)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".password-number-required-error").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
    return;
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("add-error").style.display = "block";
    document.querySelector(".password-uppercase-lowercase-error").style.display = "flex";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
    return;
  }

//  Tạo new user
  let newUser = {
    usercode,
    fullname,
    username,
    email,
    password,
    role,
    birthday,
    status,
    description
  };

  localUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(localUsers));

  document.getElementById("msg").classList.add("show");
  document.getElementById("add-toast").style.display = "flex";

  // Reset form
  form.reset();
  document.getElementById("status-active").checked = true;
  document.getElementById("role").value = "admin";

  // Tạo user code mới
  document.getElementById("user-code").value = generateUserCode();

  // Ẩn toast + chuyển trang
  setTimeout(() => {
    document.getElementById("add-toast").style.display = "none";
    document.getElementById("msg").classList.remove("show");
    window.location.href = "dashboard.html";
  }, 2000);
});

// Nút BACK
document.querySelector(".back-btn").onclick = function () {
  window.location.href = "dashboard.html";
};

// Hiển thị password
let passInput = document.getElementById("password");
let eyeOpen = document.querySelector(".fa-eye");
let eyeClose = document.querySelector(".fa-eye-slash");

// Ẩn icon eye-slash lúc đầu
eyeClose.style.display = "none";

// hiện mật khẩu
eyeOpen.addEventListener("click", function () {
  passInput.type = "text";
  eyeOpen.style.display = "none";
  eyeClose.style.display = "inline";
});

//ẩn mật khẩu
eyeClose.addEventListener("click", function () {
  passInput.type = "password";
  eyeClose.style.display = "none";
  eyeOpen.style.display = "inline";
});
