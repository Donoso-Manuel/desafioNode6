const reportarConsultas = (req, res, next) => {
    const { method, path, params, query, body } = req;

    console.log("=== Nueva Consulta ===");
    console.log(`Método: ${method}`);
    console.log(`Ruta: ${path}`);
   // if (Object.keys(params).length) console.log(`Parámetros: ${JSON.stringify(params)}`);
   // if (Object.keys(query).length) console.log(`Query: ${JSON.stringify(query)}`);
   // if (Object.keys(body).length) console.log(`Cuerpo: ${JSON.stringify(body)}`);
    // Muestra todos los datos recepcionados por las 3 formas posibles, body, params, query, queda deshabilitado por temas de seguridad
    console.log("======================");

    next(); // Pasa al siguiente middleware o controlador
};

module.exports = reportarConsultas;