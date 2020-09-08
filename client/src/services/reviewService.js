import axios from "./axios";

export default {
    getAllReviews() {
        return axios.get('/reviews');
    },
}