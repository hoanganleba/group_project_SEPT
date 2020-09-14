import axios from './axios'

export default {
    get() {
        return axios.get('/profile');
    },
    getall() {
        return axios.get('/customers');
    },
    editUserDetails(obj) {
        return axios.put(`/profile`,obj);
    },
    deleteCustomer(customerId) {
        return axios.delete(`/customers/${customerId}`);
    }
}