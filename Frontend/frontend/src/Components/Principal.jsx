import Prestamos from "./Prestamos";
import { useEffect, useState } from "react";
import prestamoService from "../Service/prestamoService";
import PrestamoForm from "./PrestamoForm";
import Notification from "./Notification";


const Principal = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const fetchPrestamos = async () => {
        try{
            const request = await prestamoService.getAllLoanService();
            setPrestamos(request.data);
        }catch(error){
            console.log(error);
            const errorMessage = error.response.data.message
            setError(errorMessage);
            setTimeout(() => setError(''), 3000);
        }
    }

    const addPrestamo = async (payload) => {
        try{
            console.log(payload);
            await prestamoService.addLoanService(payload);
            fetchPrestamos()
            setSuccess('Usuario registrado con exito')
            setTimeout(() => setSuccess(''), 3000);
        }catch(error){
            console.log(error);
            const errorMessage = error.response.data.message
            setError(errorMessage);
            setTimeout(() => setError(''), 3000);
        }
        
    }

    useEffect(() => {
        fetchPrestamos();
    }, [])

    return <>
        <h1 style={{textAlign: 'center'}}>Bienvenido al sistema de prestamos</h1>

        {error && <Notification message={error} className={'alert alert-danger'} /> }
        {success && <Notification message={success} className={'alert alert-success'}  />}

        <section>
            <PrestamoForm onAddPrestamo={addPrestamo}/>
        </section>
        <section>
            <Prestamos prestamo={prestamos} />
        </section>
    </>
}

export default Principal;