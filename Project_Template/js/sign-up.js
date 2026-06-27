let form = document.getElementById("sign-up-form");
let localUser = JSON.parse(localStorage.getItem("users")) || [];

// Ẩn toàn bộ lỗi
function hideAllErr() {
  document.getElementById("msg").classList.remove("show");

  // Ẩn lỗi rỗng
  document.getElementById("sign-up-validation").style.display = "none";
  document.querySelectorAll("#sign-up-validation p").forEach(el => {
    el.style.display = "none";
  });

  // Ẩn lỗi sai định dạng
  document.getElementById("sign-up-error").style.display = "none";
  document.querySelectorAll("#sign-up-error > div").forEach(el => {
    el.style.display = "none";
  });

  // Ẩn toast
  document.getElementById("sign-up-toast").style.display = "none";
}

// Tạo userCode
function userCode() {
  let number = localUser.length + 1;
  return "U" + String(number).padStart(3, "0");
}

// Xử lý submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  hideAllErr();

  let email = document.getElementById("email").value.trim();
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  let hasError = false;

  // Validate rỗng
  if (!email) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-validation").style.display = "block";
    document.querySelector(".email-cannot-blank").style.display = "flex";
    hasError = true;
  }

  if (!username) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-validation").style.display = "block";
    document.querySelector(".username-cannot-blank").style.display = "flex";
    hasError = true;
  }

  if (!password) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-validation").style.display = "block";
    document.querySelector(".password-cannot-blank").style.display = "flex";
    hasError = true;
  }

  // Dừng khi có lỗi rỗng
  if (hasError) {
    setTimeout(hideAllErr, 2000);
    return;
  }
// Regex email
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-error").style.display = "block";
    document.querySelector(".email-error").style.display = "flex";
    setTimeout(hideAllErr, 2000);
    return;
  }

  // Password
  if (password.length < 8) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-error").style.display = "block";
    document.querySelector(".password-min-length-error").style.display = "flex";
    setTimeout(hideAllErr, 2000);
    return;
  }

  if (!/\d/.test(password)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-error").style.display = "block";
    document.querySelector(".password-number-required-error").style.display = "flex";
    setTimeout(hideAllErr, 2000);
    return;
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-error").style.display = "block";
    document.querySelector(".password-uppercase-lowercase-error").style.display = "flex";
    setTimeout(hideAllErr, 2000);
    return;
  }

  // Kiểm tra email đã có trên localStorage chưa
  if (localUser.find(u => u.email === email)) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("sign-up-error").style.display = "block";
    document.querySelector(".email-exist").style.display = "flex";
    setTimeout(hideAllErr, 2000);
    return;
  }

  let newUser = {
    usercode: userCode(),
    username,
    email,
    password
  };

  localUser.push(newUser);
  localStorage.setItem("users", JSON.stringify(localUser));

  document.getElementById("msg").classList.add("show");
  document.getElementById("sign-up-toast").style.display = "flex";

  setTimeout(() => {
    window.location.href = "sign-in.html";
  }, 2000);
});

 // Hiển thị password
let passInput = document.getElementById("password");
let eyeOpen = document.querySelector(".fa-eye");
let eyeClose = document.querySelector(".fa-eye-slash");

// Ẩn icon eye-slash lúc đầu
eyeClose.style.display = "none";

// Khi bấm icon con mắt → hiện mật khẩu
eyeOpen.addEventListener("click", function () {
  passInput.type = "text";
  eyeOpen.style.display = "none";
  eyeClose.style.display = "inline";
});

// Khi bấm icon gạch chéo → ẩn mật khẩu
eyeClose.addEventListener("click", function () {
  passInput.type = "password";
  eyeClose.style.display = "none";
  eyeOpen.style.display = "inline";
});
