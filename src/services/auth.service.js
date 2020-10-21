import axios from 'axios'
 
const API_URL = "http://localhost:8080/api/user/";

const login = (username, password) => {
  return axios.post(API_URL + '/login', {
    username, password
  })
  .then(response => {
    console.log(response.data);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  })
  .catch(err => console.error(err))
}

export default { login };