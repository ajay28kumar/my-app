import axios from 'axios';

const server = axios.create({
  baseURL: 'https://www.shaadi.com/',
});

export default server;
