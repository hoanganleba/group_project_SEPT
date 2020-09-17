import axios from 'axios';

export default axios.create({
    baseURL: 'http://onlinebooking-env.eba-7wh23gam.ap-southeast-1.elasticbeanstalk.com/api',
})