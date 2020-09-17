import axios from "./axios";
export default {
<<<<<<< HEAD
    postBooking(obj) {
        return axios.post('/profile/bookings', obj);
    },
    cancelBooking(id) {
        return axios.delete(`/profile/bookings/${id}`)
    }
=======
    getAllBooking(){
        return axios.get('/bookings');
    },
    changeStatus(id, obj){
        return axios.put(`/bookings/${id}`, obj);
    },
    postBooking(obj){
        return axios.post('/profile/bookings', obj);
    },
    cancelBooking(id){
        return axios.delete(`/profile/bookings/${id}`);
    },
    editBooking(id,obj){
        return axios.put(`/profile/bookings/${id}`,obj);
    },
    deleteBooking(customerId, bookingId) {
        return axios.delete(`/customers/${customerId}/bookings/${bookingId}`);
    },
>>>>>>> frontend
}