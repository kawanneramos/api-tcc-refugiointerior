const express = require('express'); 
const router = express.Router(); 

const UsuariosController = require('../controllers/usuarios'); 
const Perfil_psicologoController = require('../controllers/perfil_psicologo'); 
const Feedback_consultaController = require('../controllers/feedback_consulta'); 

router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); 
router.patch('/usuarios/:usu_id', UsuariosController.editarUsuarios); 
router.delete('/usuarios/:usu_id', UsuariosController.apagarUsuarios); 

router.get('/perfil-psicologo', Perfil_psicologoController.listarPerfil_psicologo); 
router.post('/perfil-psicologo', Perfil_psicologoController.cadastrarPerfil_psicologo); 
router.patch('/perfil-psicologo/:psi_id', Perfil_psicologoController.editarPerfil_psicologo); 
router.delete('/perfil-psicologo/:psi_id', Perfil_psicologoController.apagarPerfil_psicologo); 

router.get('/feedback-consulta', Feedback_consultaController.listarFeedback_consulta); 
router.post('/feedback-consulta', Feedback_consultaController.cadastrarFeedback_consulta); 
router.patch('/feedback-consulta/:fdbk_id', Feedback_consultaController.editarFeedback_consulta); 
router.delete('/feedback-consulta/:fdbk_id', Feedback_consultaController.apagarFeedback_consulta); 


module.exports = router;