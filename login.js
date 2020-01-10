import { form, baseEndPoint } from "./elements.js";

const loginDiv = document.querySelector(".invalid");

async function playerDetailsCheck(name, psw) {
  return fetch(`${baseEndPoint}/players/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: name, password: psw })
  });
}

function handleInput(event) {
  event.preventDefault();

  let response;
  const username = event.target.elements[0].value;
  const password = event.target.elements[1].value;
  playerDetailsCheck(username, password)
    .then(res => {
      response = res;
      return res.json();
    })
    .then(data => {
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("token", data.id);
      if (response.status === 200) {
        loginDiv.innerHTML = "Login Successfull";
        loginDiv.style.visibility = "visible";
        setTimeout(() => {
          window.location = "game.html";
        }, 1000);
      } else {
        loginDiv.style.visibility = "visible";
      }
    });
}

form.addEventListener("submit", handleInput);
