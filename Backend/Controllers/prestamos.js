const { getAllLoanService, addLoanService } = require('../Services/prestamoService')

const sendRes = (res, statusCode, payload) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
}

//Servicio para obtener todos los datos
const getAllLoans = (req, res) => {
    try{
        const data = getAllLoanService();
        const payload = {
            success: true,
            message: 'Se obtuvieron todos los datos con exito',
            data: data
        };

        return sendRes(res,200, payload);
    }catch (error) {
            const payload = {success: false, message: 'Ocurrio un error en el servidor'}
            sendRes(res,500, payload)
        }
}

//Servicio para agregar un prestamo
const addLoan = (req, res) => {

    let body = ''

    //Recogemos lo del cuerpo de manera asincrona
    req.on('data', chuck => {
        body += chuck.toString();
    })

    req.on('error', (err) => {
        console.error('Error en la solicitud:', err.message);
        payload = { success: false, message: 'Error en la solicitud' }
        return sendRes(res,400, payload)
    });

    //Ya tenemos los datos completos
    req.on('end', () => {
        try {

            const data = JSON.parse(body);

            const {nombre_estudiante, 
                   codigo_estudiante, 
                   email, 
                   articulo, 
                   observaciones  } = data;
            
            if(!nombre_estudiante || !codigo_estudiante || !email || !articulo){
                const payload = {success: false, message: 'Campos obligatorios faltantes'}
                return sendRes(res,400, payload)
            }

            if(!/^\d{8}$/.test(codigo_estudiante)){
                const payload = {success: false, message: 'El codigo del estudiante debe ser un número de 8 digitos'}
                return sendRes(res,400, payload)
            }

            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                const payload = {success: false, message: 'El email no es valido'}
                return sendRes(res,400, payload)
            }

            if(observaciones && observaciones.length > 100){
                const payload = {success: false, message: 'Las observaciones solo deben tener 100 caracteres'}
                return sendRes(res,400, payload)
            }

            addLoanService(data)

            const payload = { success: true, mensaje: 'Préstamo registrado', data }
            return sendRes(res,201, payload)

        }catch (error) {
            const payload = {success: false, message: 'Ocurrio un error en el servidor'}
            sendRes(res,500, payload)
        }
    })

}


module.exports = {getAllLoans, addLoan};