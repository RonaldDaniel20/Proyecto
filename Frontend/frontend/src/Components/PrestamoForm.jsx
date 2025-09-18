import { useState } from "react";
//import prestamoService from "../Service/prestamoService";

const PrestamoForm = ({ onAddPrestamo }) => {
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');
    const [email, setEmail] = useState('');
    const [articulo, setArticulo] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [error, setErrors] = useState({})

    const validation = () => {
        let error = {};
        error.nombre = '';
        error.codigo = '';
        error.email = '';
        error.articulo = '';
        error.observaciones = '';

        if(!nombre.trim()){
            error.nombre = 'El nombre no puede ser vacio';
        }
        if(!codigo.trim()){
            error.codigo = 'El codigo no puede ser vacio';
        }else if(!/^\d{8}$/.test(codigo)){
            error.codigo = 'El codigo debe tener 8 digitos'
        }

        if(!email.trim()){
            error.email = 'El email no puede ser vacio';
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            error.email = 'El email no es valido'
        }

        if(!articulo.trim()){
            error.articulo = 'El articulo no puede ser vacio';
        }

        if(observaciones && observaciones.length> 100){
            error.observaciones = 'Las observaciones solo deben tener como máximo 100 caracteres'
        }

        return error
    }

    const clearFields = () => {
        setNombre('');
        setCodigo('');
        setArticulo('');
        setEmail('');
        setObservaciones('')
        setErrors({})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const errors = validation();
        setErrors(errors);

        if(errors.articulo === '' && errors.codigo === '' && errors.email === '' && errors.nombre === ''
            && errors.observaciones === ''
        ){
            const payload = {nombre_estudiante: nombre, 
                   codigo_estudiante: codigo, 
                   email:email, 
                   articulo: articulo, 
                   observaciones:observaciones  }
            onAddPrestamo(payload);
            clearFields();
        }
        

    }
    

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Registro de prestamos</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del estudiante</label>
                    <input type="text" 
                           className="form-control" 
                           id="nombre" 
                           placeholder="Ej. Juan Pérez" 
                           value={nombre}
                           onChange={(e) => setNombre(e.target.value) }
                    />
                    {error.nombre && <span className="text-danger">{error.nombre}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">Código del estudiante</label>
                    <input type="text" 
                           className="form-control" 
                           id="codigo" 
                           placeholder="Ej. 12345678" 
                           value={codigo}
                           onChange={(e) => setCodigo(e.target.value) }
                    />
                    {error.codigo && <span className="text-danger">{error.codigo}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Ingrese su email</label>
                    <input type="text" 
                           className="form-control" 
                           id="email" 
                           placeholder="Ej. daniel@examplo.com" 
                           value={email}
                           onChange={(e) => setEmail(e.target.value) }
                    />
                     {error.email && <span className="text-danger">{error.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="articulo" className="form-label">Ingrese el articulo</label>
                    <input type="text" 
                           className="form-control" 
                           id="articulo" 
                           placeholder="Ej. Arquitectura de software ..." 
                           value={articulo}
                           onChange={(e) => setArticulo(e.target.value) }
                    />
                     {error.articulo && <span className="text-danger">{error.articulo}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="ob" className="form-label">Observación</label>
                    <input type="text" 
                           className="form-control" 
                           id="ob" 
                           placeholder="Ingresa una observación si lo deseas" 
                           value={observaciones}
                           onChange={(e) => setObservaciones(e.target.value) }
                    />
                     {error.observaciones && <span className="text-danger">{error.observaciones}</span>}
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>

            </form>
        </div>
    )
}

export default PrestamoForm;