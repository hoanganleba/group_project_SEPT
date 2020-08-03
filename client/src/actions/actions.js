import userService from '../services/userService';
export const fetchUserData = () => {
    return dispatch => {
        return userService.get().then((res) => dispatch({
            type: 'RECEIVE_NEW_DATA',
            data: {
                userData: res.data
            },
        }));
    }
}