import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Authorization: `Bearer ${cookies.get('jwt-token')}`,
    },
})