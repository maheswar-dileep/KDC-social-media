import axios from 'axios';

const backend = axios.create({ baseURL: 'http://localhost:8801/api/v1' });

export default backend;
