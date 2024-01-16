import axios from "axios";


console.log(import.meta.env.VITE_API_ENDPOINT)
export default axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
	withCredentials: true
});
