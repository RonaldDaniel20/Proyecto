import axios from 'axios';
import { apiBaseUrl } from '../constans';

const getAllLoanService = async() => {
    const request = await axios.get(apiBaseUrl + '/prestamos');
    //console.log(request.data);
    return request.data;
}

const addLoanService = async( body ) => {
    const request = await axios.post(apiBaseUrl + '/prestamo', body);
    return request.data;
}

export default { getAllLoanService, addLoanService }