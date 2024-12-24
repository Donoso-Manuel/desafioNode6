const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/controllerUser');
const validarCredencial = require('../middlewares/validarCredencial')
const validarToken = require('../middlewares/validarToken')
const reportarConsultas = require('../middlewares/logConsultas')

router.use(reportarConsultas)

router.post('/usuarios', controllerUser.registroUsuario)

router.post('/login', validarCredencial , controllerUser.loginUsuario )

router.get('/usuarios',validarToken, controllerUser.obtenerUsuario )

module.exports = router;