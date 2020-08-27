import authAxios from './authAxios';

export default {
    signIn(obj) {
        return authAxios.post('/login', obj)
    },
    signUp(obj) {
        return authAxios.post('/signup', obj)
    }
}