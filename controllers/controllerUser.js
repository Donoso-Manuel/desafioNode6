const modelUser = require('../models/modelUser')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registroUsuario = async (req, res) =>{
    try {
        const {email, password, rol, lenguage} = req.body;
        const passwordEncriptada = bcryptjs.hashSync(String(password), 10)
        await modelUser.registraUsuarioDB(email, passwordEncriptada, rol, lenguage)
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || "Error interno en el servidor" });
    }
}
const loginUsuario = async(req, res)=>{
    try {
        const {email, password} = req.body;
        await modelUser.loginUsuarioDB(email, password);
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY)
        res.status(200).json({token})
    } catch (error) {
        res.status(error.code || 500).send(error) 
    }
}

const obtenerUsuario = async(req, res)=>{
    const authorization = req.header('Authorization');
    const token = authorization.split("Bearer ")[1];
    const {email} = jwt.decode(token)
    try {
        const data =  await modelUser.obtenerUsuarioDB(email)
        res.status(201).send(data)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }

}

module.exports = {registroUsuario, loginUsuario, obtenerUsuario}