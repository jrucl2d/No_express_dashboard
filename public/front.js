const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const registerBtn = document.querySelector("#register");
const loginBtn = document.querySelector("#login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("#id").value;
  const password = document.querySelector("#password").value;
  if (!id || !password) {
    alert("아이디와 비밀번호를 모두 적어주세요");
    return;
  }
  const loginRes = await axios.post("/login", { id, password });
  document.querySelector("#id").value = "";
  document.querySelector("#password").value = "";
  // 여기서 아이디와 비밀번호 검사 로직 필요
  if (loginRes.data === "no") {
    alert("없는 계정입니다. 회원가입을 해주세요");
    return;
  }
  alert(`${id}님 환영합니다`);
  await axios.get("/dashboard");
  document.body.innerHTML = "";
  location.reload(true);
});
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("#regId").value;
  const password = document.querySelector("#regPassword").value;
  document.querySelector("#regId").value = "";
  document.querySelector("#regPassword").value = "";
  if (!id || !password) {
    alert("아이디와 비밀번호를 모두 적어주세요");
    return;
  }
  const result = await axios.post("/register", { id, password });
  if (result.data === "exist") {
    alert("이미 존재하는 계정입니다");
    return;
  }
  alert("회원가입을 완료했습니다");
  registerForm.className = "hide";
  loginForm.className = "show";
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.className = "hide";
  registerForm.className = "show";
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.className = "show";
  registerForm.className = "hide";
});
