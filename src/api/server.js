import axios from 'axios';

const server = axios.create({
    baseURL: 'https://api.vestyd.com/',
});

export default server;
