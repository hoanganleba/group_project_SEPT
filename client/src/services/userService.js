import authAxios from './authAxios'

export default {
    get() {
        return authAxios.get('/user');
    },
    getBookingHistory(id) {
        return authAxios.get(`/customers/${id}/bookings`);
    },
    getReview(id){
        return authAxios.get(`/customers/${id}/reviews`);
    },

}