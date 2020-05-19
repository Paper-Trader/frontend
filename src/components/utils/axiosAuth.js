import axios from 'axios';

const devEndpoint = 'http://localhost:5000'
const prodEndpoint = 'https://papr-tradr.herokuapp.com';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');



  return axios.create({
    baseURL: 
      process.env.REACT_APP_CURR_ENV === "dev" 
        ? devEndpoint 
        : prodEndpoint,
    headers: {
      Authorization: token
    },
  });
};