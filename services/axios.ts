import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://mock-server-v1.vercel.app',
});

export default axios;
