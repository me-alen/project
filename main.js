const baseEndPoint = "http://10.154.4.174/players";
import axios from "axios";
const userData = {
  username: "noobmaster69",
  password: "noobmaster",
  email: "noobmaster69@gmail.com"
};

export async function fetchData() {
  return await axios({
    url: baseEndPoint
  });
}
async function postData() {
  const { data } = await fetchData();
  console.log(data);

  axios({
    method: "post",
    url: "http://10.154.4.174/players",
    data: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}
postData();
