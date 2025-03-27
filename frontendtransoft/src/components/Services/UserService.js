import axios from 'axios';

const API_URL = "http://localhost:3001/api-transoft/users";
const API_URL_LOGIN = "http://localhost:3001/api-transoft/users/login";

class UserService {
    getUsers() {
        return axios.get(API_URL);
    }

    getUserById(userId) {
        return axios.get(`${API_URL}/${userId}`);
    }

    createUser(user) {
        return axios.post(API_URL, user);
    }

    updateUser(userId, user) {
        return axios.put(`${API_URL}/${userId}`, user);
    }

    deleteUser(userId) {
        return axios.delete(`${API_URL}/${userId}`);
    }
    loginUser(user) {
        return axios.post(API_URL_LOGIN , user);
    }
}

export default new UserService();
