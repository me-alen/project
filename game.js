const baseEndPoint = "http://10.154.4.174";

const loginDiv = document.querySelector(".invalid");
const gameStat = document.querySelector(".output");

async function fetchPlayerState() {
  return fetch(
    `${baseEndPoint}/players/${sessionStorage.getItem("userId")}/object-states`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token")
      }
    }
  ).then(res => {
    return res.json();
  });
}

fetchPlayerState().then(res => {
  console.log(res[0]);

  if (res[0] !== undefined) {
    (currentPos.x = res[0].state.xpos), (currentPos.y = res[0].state.ypos);
  } else {
    currentPos = { x: 0, y: 0 };
  }
});

let currentPos;

function UserInterfaceManagr(currentPos) {
  this.rover = new Rover(currentPos);
}

function Rover(currentPos) {
  this.currentPos = currentPos;
}

function Mother(currentPos, motherPos) {
  this.currentPos = currentPos;
  this.motherPos = motherPos;
}

UserInterfaceManagr.prototype.setUpUserActions = function() {
  document.addEventListener("keydown", e => {
    this.rover.move(e.key, currentPos);
  });
};

async function savePlayerEachMove(xpos = 0, ypos = 0) {
  gameStat.innerHTML = `xpos : ${xpos}, ypos : ${ypos}`;
  console.log(currentPos);
  return fetch(
    `${baseEndPoint}/players/${sessionStorage.getItem(
      "userId"
    )}/object-states/1`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token")
      },
      body: JSON.stringify({ xpos: xpos, ypos: ypos })
    }
  );
}
async function savePlayerDetails(xpos, ypos) {
  return fetch(
    `${baseEndPoint}/players/${sessionStorage.getItem(
      "userId"
    )}/object-states/1`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token")
      },
      body: JSON.stringify({ xpos: xpos, ypos: ypos })
    }
  ).then(res => {
    if (res.status === 200) {
      loginDiv.style.visibility = "visible";
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      setTimeout(() => {
        window.location = "./login.html";
      }, 1000);
    }
  });
}

document.querySelector(".exit").addEventListener("click", () => {
  savePlayerDetails(currentPos.x, currentPos.y);
});

Rover.prototype.move = function(keyInput, currentPos) {
  switch (keyInput) {
    case "ArrowUp":
      currentPos.y += 1;
      savePlayerEachMove(currentPos.x, currentPos.y);
      break;
    case "ArrowDown":
      currentPos.y -= 1;
      savePlayerEachMove(currentPos.x, currentPos.y);
      break;
    case "ArrowLeft":
      currentPos.x -= 1;
      savePlayerEachMove(currentPos.x, currentPos.y);
      break;
    case "ArrowRight":
      currentPos.x += 1;
      savePlayerEachMove(currentPos.x, currentPos.y);
      break;
    case "Enter":
      console.log(currentPos);
      break;
    default:
      break;
  }
};

new UserInterfaceManagr().setUpUserActions();
