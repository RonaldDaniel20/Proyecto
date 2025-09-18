const http = require('http');
const PORT = process.env.PORT || 3001;
const routes = require('./Routes/routes')

//Creacion del servidor
const server = http.createServer((req, res) => {

    // Encabezados CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    //Maneja options ya que las solicitudes post requiren esto
    if(req.method === 'OPTIONS'){
        res.writeHead(204); 
        res.end();
        return;
    }

    routes(req, res);
})

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})
