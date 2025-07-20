import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://byte-battle-eteo4sl8j-shailendra-s-projects-99ab3c11.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

