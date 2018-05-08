import axios from 'axios';

const server = axios.create({
  baseURL: 'http://ec2-34-201-40-124.compute-1.amazonaws.com:8080/graphql',
});

export default server;
