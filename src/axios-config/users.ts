import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/users',
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
})

export default api