const format = require('pg-format');
const {pool} = require('../config/conexion');
const bcryptjs = require('bcryptjs')

const registraUsuarioDB = async(email, passwordEncriptada, rol, lenguage)=>{
    try {
        const consulta = format("INSERT INTO usuarios VALUES (DEFAULT, %L , %L , %L , %L)", email, passwordEncriptada, rol, lenguage);
        await pool.query(consulta);
    } catch (error) {
        console.error("Error en la creacion del usuario: ", error.message)
        throw error;
    }
}

const loginUsuarioDB = async(email, password)=>{
    try {
        const consulta = format("SELECT * FROM usuarios WHERE email = %L", email);
        const {rows: [usuario], rowCount} = await pool.query(consulta);
        const {password: passwordEncriptada} = usuario;
        const passwordCorrecta = bcryptjs.compareSync(String(password), passwordEncriptada)
        if(!passwordCorrecta || !rowCount) throw({code: 401, message: "Email o contraseña invalidos"});
        return{message: "usuario Validado Correctamente"}
    } catch (error) {
        throw {code: error.code || 500, message: error.message || "Error interno del Servidor"}
    }
}

const obtenerUsuarioDB = async(email)=>{
    try {
        const consulta =  format("SELECT email, rol, lenguage FROM usuarios WHERE email = %L", email)
        const {rows: usuario} = await pool.query(consulta)
        return usuario
    } catch (error) {
        throw {code: error.code || 500, message: error.message || "Error interno del Servidor"}
    }
}
module.exports = {registraUsuarioDB, loginUsuarioDB, obtenerUsuarioDB}