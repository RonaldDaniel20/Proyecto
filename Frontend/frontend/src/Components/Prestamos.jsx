const Prestamos = ( {prestamo} ) => {
    return (
        <div className="container mt-5">
            <h2 className="mb-3">Listado de prestamos</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Estudiante</th>
                        <th>Código</th>
                        <th>Email</th>
                        <th>Artículo</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamo && prestamo.map(obj => (
                        <tr key={obj.codigo_estudiante}>
                            <td>{obj.nombre_estudiante}</td>
                            <td>{obj.codigo_estudiante}</td>
                            <td>{obj.email}</td>
                            <td>{obj.articulo}</td>
                            {<td>{obj.observaciones || 'Sin observaciones'}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Prestamos;