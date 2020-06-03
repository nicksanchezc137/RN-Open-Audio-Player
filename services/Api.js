import axios from 'axios'

const Api = axios.create({
  baseURL: 'https://elitesolutions.co.ke/debe/api/',
  //timeout: 2000,
  headers: { 'Content-Type': 'application/json' }
});

  export {
    Api
  
}