import axios from 'axios'
import { JPA_API_URL } from '../../Constants'

class DriverDataService {

    retrieveVehicle(name, id) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/vehicles/${id}`);
    }

    deleteVehicle(name, id) {
        //console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/vehicles/${id}`);
    }

    updateVehicle(name, id, vehicle) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/vehicles/${id}`, vehicle);
    }

    createVehicle(name, vehicle) {
        // console.log('createDriver executed!')
        return axios.post(`${JPA_API_URL}/users/${name}/vehicles/`, vehicle);
    }

    retrieveAllVehicles(name) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/vehicles`);
    }

}

export default new DriverDataService()