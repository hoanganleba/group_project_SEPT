import axios from './axios'

export default {
    get() {
        return axios.get('/user');
    },
    delete(customerId, bookingId) {
        return axios.delete(`/customers/${customerId}/bookings/${bookingId}`);
    },
    getBookingHistory(id) {
        return axios.get(`/customers/${id}/bookings`);
    },
    getReview(id){
        return axios.get(`/customers/${id}/reviews`);
    },
    postBooking(id, obj) {
        return axios.post(`/customers/${id}/bookings`, obj);
    }
}