const data = require('../Data/data')

const getAllLoanService = () => {
    return data;
}

const addLoanService = (articule) => {
    data.push(articule);
}

module.exports = {getAllLoanService, addLoanService};