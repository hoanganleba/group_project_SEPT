import axios from "./axios";
export default {
    postBooking(obj) {
        return axios.post('/profile/bookings', obj);
    },
    cancelBooking(id) {
        return axios.delete(`/profile/bookings/${id}`)
    }
}