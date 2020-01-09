const baseEndPoint = "http://10.154.4.174/players";
import axios from "axios";
const userData = {
  username: "lssd",
  password: "lssd",
  email: "lssd@gmail.com"
};

async function fetchData() {
  return await axios({
    url: baseEndPoint
  });
}

async function postData() {
  const { data } = await fetchData();
  console.log(data);

  const posting = await axios({
    method: "post",
    url: "http://10.154.4.174/players",
    data: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" }
  });
  console.log(posting);
}
postData();
