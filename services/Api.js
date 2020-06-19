import axios from 'axios'
import { BASE_URL } from '../config';

const Api = axios.create({
  baseURL: BASE_URL,
  //timeout: 2000,
  headers: { 'Content-Type': 'application/json' }
});

  export {
    Api
  
}; 
