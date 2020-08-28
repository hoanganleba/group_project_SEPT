import axios from './axios'

export default {
    get() {
        return axios.get('/profile');
    },
    getall() {
        return axios.get('/customers');
    },
    getUserDetails(customerId) {
        return axios.get(`/customers/${customerId}`);
    },
    deleteCustomer(customerId) {
        return axios.delete(`/customers/${customerId}`);
    },
    delete(customerId, bookingId) {
        return axios.delete(`/customers/${customerId}/bookings/${bookingId}`);
    },
    getBookingHistory(customerId) {
        return axios.get(`/customers/${customerId}/bookings`);
    },
    getReview(customerId){
        return axios.get(`/customers/${customerId}/reviews`);
    },
    postBooking(customerId, obj) {
        return axios.post(`/customers/${customerId}/bookings`, obj);
    },
    postReview(customerId, obj) {
        return axios.post(`/customers/${customerId}/reviews`, obj);
    },
    editReview(customerId,reviewId, obj) {
        return axios.put(`/customers/${customerId}/reviews/${reviewId}`, obj);
    },
    deleteReview(customerId, reviewId) {
        return axios.delete(`/customers/${customerId}/reviews/${reviewId}`);
    },
}