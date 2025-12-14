import axios from "axios"

const API = axios.create({
  baseURL: "https://no-code-ml-backend.onrender.com",
})

export default API
