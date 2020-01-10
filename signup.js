import { form, baseEndPoint } from "./elements.js";

const loginDiv = document.querySelector(".invalid");

async function playerReg(name, mail, psw) {
  return fetch(`${baseEndPoint}/players`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: name, email: mail, password: psw })
  });
}

function handleInput(event) {
  event.preventDefault();
  const username = event.target.elements[0].value;
  const email = event.target.elements[1].value;
  const password = event.target.elements[2].value;

  playerReg(username, email, password).then(res => {
    if (res.status === 200) {
      loginDiv.innerHTML = "User Successfully Registered";
      loginDiv.style.visibility = "visible";
      setTimeout(() => {
        window.location = "login.html";
      }, 1000);
    } else {
      loginDiv.style.visibility = "visible";
    }
  });
}

form.addEventListener("submit", handleInput);
