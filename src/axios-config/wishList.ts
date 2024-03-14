import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/wish-list',
  headers: {
    'Content-Type': 'application/json',
  },

})

export default api