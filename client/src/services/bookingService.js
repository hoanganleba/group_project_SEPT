import axios from "./axios";
export default {
    getAllBooking(){
        return axios.get('/bookings');
    },
   
    postBooking(obj) {
        return axios.post('/profile/bookings', obj);
    },
    cancelBooking(id) {
        return axios.delete(`/profile/bookings/${id}`);
    },
    editBooking(id,obj){
        return axios.put(`/profile/bookings/${id}`,obj);
    },
  
}