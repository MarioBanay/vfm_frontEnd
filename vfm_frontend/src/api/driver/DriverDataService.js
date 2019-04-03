import axios from 'axios'
import { JPA_API_URL } from '../../Constants'

class DriverDataService {

    retrieveAllDrivers(name) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/drivers`);
    }

    retrieveDriver(name, id) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/drivers/${id}`);
    }

    deleteDriver(name, id) {
        //console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/drivers/${id}`);
    }

    updateDriver(name, id, todo) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/drivers/${id}`, todo);
    }

    createDriver(name, todo) {
        //console.log('executed service')
        return axios.post(`${JPA_API_URL}/users/${name}/drivers/`, todo);
    }
}

export default new DriverDataService()