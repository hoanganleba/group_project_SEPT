import authAxios from './authAxios'

export default {
    get() {
        return authAxios.get('/user');
    },
    delete(customerId, bookingId) {
        return authAxios.delete(`/customers/${customerId}/bookings/${bookingId}`);
    },
    getBookingHistory(id) {
        return authAxios.get(`/customers/${id}/bookings`);
    },
    getReview(id){
        return authAxios.get(`/customers/${id}/reviews`);
    },

}