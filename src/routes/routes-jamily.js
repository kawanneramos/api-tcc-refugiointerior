const express = require('express'); 
const router = express.Router(); 

const agendamentoController = require('../controllers/agendamentos'); 
const publicacaoController = require('../controllers/publicacao');
const usuarioController = require('../controllers/usuarios');

router.get('/publicacoes', publicacaoController.listarPublicacao); 
router.post('/publicacoes', publicacaoController.cadastrarPublicacao); 
router.patch('/publicacoes/:pub_id', publicacaoController.editarPublicacao); 
router.delete('/publicacoes/:pub_id', publicacaoController.apagarPublicacao); 

router.get('/usuarios', usuarioController.listarUsuarios);
router.post('/usuarios', usuarioController.cadastrarUsuarios);
router.patch('/usuarios/:usu_id', usuarioController.editarUsuarios);
router.delete('/usuarios/:usu_id', usuarioController.apagarUsuarios);

router.get('/agendamentos', agendamentoController.listarAgendamento); 
router.post('/agendamentos', agendamentoController.cadastrarAgendamento); 
router.patch('/agendamentos/:agd_id', agendamentoController.editarAgendamento); 
router.delete('/agendamentos/:agd_id', agendamentoController.apagarAgendamento); 

module.exports = router;