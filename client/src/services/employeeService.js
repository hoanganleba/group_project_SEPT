import axios from "./axios";

export default {
    createEmployees(obj) {
        return axios.post('/employees',obj);
    },
    getAllEmployees(){
        return axios.get('/employees')
    },
    editEmployees(id,obj){
        return axios.put(`/employees/${id}`,obj)
    },
    getEmployee(id){
        return axios.get(`/employees/${id}`)
    },
}