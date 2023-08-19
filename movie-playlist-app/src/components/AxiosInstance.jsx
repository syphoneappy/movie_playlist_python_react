import axios from 'axios';

const Instance = axios.create({
  baseURL: 'https://octopus-app-p9wjm.ondigitalocean.app/', // Replace with your Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Instance;