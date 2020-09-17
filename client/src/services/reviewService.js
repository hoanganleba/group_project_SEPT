import axios from "./axios";

export default {
    getAllReviews() {
        return axios.get('/reviews');
    },
<<<<<<< HEAD
=======
    getReview(customerId){
        return axios.get(`/customers/${customerId}/reviews`);
    },
    postReview(customerId, obj) {
        return axios.post(`/customers/${customerId}/reviews`, obj);
    },
    editReview(customerId, reviewId, obj) {
        return axios.put(`/customers/${customerId}/reviews/${reviewId}`, obj);
    },
    deleteReview(customerId, reviewId) {
        return axios.delete(`/customers/${customerId}/reviews/${reviewId}`);
    },
>>>>>>> frontend
}