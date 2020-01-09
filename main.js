import axios from "axios";

async function fetchData() {
  const response = await axios({
    method: "fetch",
    url: "http://10.154.4.174/players"
    // data: {
    //   firstName: "Finn",
    //   lastName: "Williams"
    // }
  });
  console.log(response);
}

fetchData();
