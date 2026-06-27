let form = document.getElementById("sign-in-form");
let checkBox = document.getElementById("save-loggin-checkbox");

let localUser = JSON.parse(localStorage.getItem("users")) || [];

// Ẩn toàn bộ lỗi
function hideAllErr() {
  document.getElementById("msg").classList.remove("show");
  document.getElementById("login-validation").style.display = "none";
  document.getElementById("login-error").style.display = "none";
  document.querySelectorAll("#login-validation p").forEach(el => {
    el.style.display = "none";
  });
}

let btnSignIn = document.querySelector(".btn");

btnSignIn.addEventListener("click", function (e) {
  e.preventDefault();
  hideAllErr();

  let inpEmail = document.getElementById("email").value.trim();
  let inpPass = document.getElementById("password").value.trim();

  // Email trống
  if (!inpEmail) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("login-validation").style.display = "block";
    document.querySelector(".email-cannot-blank").style.display = "block";
    setTimeout(() => {
    hideAllErr();
  }, 3000);
  }

  // Password trống
  if (!inpPass) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("login-validation").style.display = "block";
    document.querySelector(".password-cannot-blank").style.display = "block";setTimeout(() => {
    hideAllErr();
  }, 3000);
    return;
  }

  // Kiểm tra email + password có tồn tại trong localStorage
  let foundUser = localUser.find(
    u => u.email === inpEmail && u.password === inpPass
  );

  if (!foundUser) {
    document.getElementById("msg").classList.add("show");
    document.getElementById("login-error").style.display = "block";

    setTimeout(() => {
    hideAllErr();
  }, 3000);
  // document.getElementById("email").value = ""
  // document.getElementById("password").value = ""
    return;
  }

  // Đăng nhập thành công
  document.getElementById("msg").classList.add("show");
  document.getElementById("login-toast").style.display = "block";

// Reset dữ liệu đã nhập
document.getElementById("email").value = ""
document.getElementById("email").value = ""

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2000);
});
