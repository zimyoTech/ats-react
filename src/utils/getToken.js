import axios from  'axios';
import setAuthToken from './setAuthToken';

// get token
const getToken = async () => {
  try {
    const res = await axios.get('/api/user/getToken');

    if (res.data && res.data.token) {
      setAuthToken(res.data.token);
    }

    return res.data;
  } catch (err) {
    console.log(err)
  }
}

export default getToken;