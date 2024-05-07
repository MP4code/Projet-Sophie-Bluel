const token = localStorage.getItem("token");
if (token) {
  window.location.href = "./index.html";
}
/*Alert Login*/

let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let submit = document.querySelector(".form-button input");

const loginUser = async (e) => {
  e.preventDefault();
  if (!emailInput.value | !passwordInput.value) {
    return alert("Veuillez entrer votre email ainsi que votre mot de passe");
  }
  const body = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  console.log(body);
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    window.location.href = "./index.html";
  } else {
    alert("vos identifiants sont incorrects");
  }
};

submit.addEventListener("click", loginUser);

/*Regex*/
/*
let regex = emailInput == null;
function testRegex() {
  if (emailInput.match(regex)) {
    console.log("Tiens, ça fonction ?");
  } else console.log("...");
}
*/
