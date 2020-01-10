import * as elements from "./elements.js";

//function declerations

async function fetchDataFromServer() {
  return await (await fetch(elements.baseEndPoint)).json();
}

async function postDataToServer() {
  const userDataArray = await fetchDataFromServer();
  console.log(userDataArray);

  fetch(elements.baseEndPoint, {
    method: "post",
    body: JSON.stringify(elements.userData),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

// function calls

document.querySelector(".signup").addEventListener("click", () => {
  redirects(`${baseurl}signup`);
});

postDataToServer();
