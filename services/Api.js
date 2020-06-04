import axios from 'axios'

const Api = axios.create({
  baseURL: '',
  //timeout: 2000,
  headers: { 'Content-Type': 'application/json' }
});

  export {
    Api
  
}
