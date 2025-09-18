const {getAllLoans, addLoan} = require('../Controllers/prestamos')

const handleRoutes = (req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: true, message: 'Servidor activo' }));
    }

    else if (req.url === '/prestamos' && req.method === 'GET'){
        return getAllLoans(req, res);
    }

    else if (req.url === '/prestamo' && req.method === 'POST'){
        return addLoan(req, res);
    } else{
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, mensaje: 'Ruta no encontrada'}));
    }
}

module.exports = handleRoutes;