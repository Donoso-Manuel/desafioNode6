const express = require('express')
const jwt = require('jsonwebtoken');

const validarToken = (req, res, next)=>{
    try {
        const authorization = req.header('Authorization');
        if(!authorization){
            throw { code: 401, message: "Token vacío" };
        }
        const token = authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        res.status(error.code || 500).send(error)
    }

}

module.exports = validarToken;