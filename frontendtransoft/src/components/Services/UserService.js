import axios from 'axios';

const API_URL = "http://localhost:3001/api-transoft/users";
const API_URL_LOGIN = "http://localhost:3001/api-transoft/users/login";

const API_URL_RENDER = "https://transoftmali.onrender.com/api-transoft/users";
const API_URL_LOGIN_RENDER = "https://transoftmali.onrender.com/api-transoft/users/login";
 
class UserService {
    getUsers() {
        return axios.get(API_URL_RENDER);
    }

    getUserById(userId) {
        return axios.get(`${API_URL_RENDER}/${userId}`);
    }

    createUser(user) {
        return axios.post(API_URL_RENDER, user);
    }

    updateUser(userId, user) {
        return axios.put(`${API_URL_RENDER}/${userId}`, user);
    }

    deleteUser(userId) {
        return axios.delete(`${API_URL_RENDER}/${userId}`);
    }
    loginUser(user) {
        return axios.post(API_URL_LOGIN_RENDER , user);
    }
}

export default new UserService();
