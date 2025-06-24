const express = require('express'); 
const router = express.Router(); 

const agendamentoController = require('../controllers/agendamentos'); 
const publicacaoController = require ('../controllers/publicacao');


router.get('/agendamentos', agendamentoController.listarAgendamento); 
router.post('/agendamentos', agendamentoController.cadastrarAgendamento); 
router.patch('/agendamentos/:agd_id', agendamentoController.editarAgendamento); 
router.delete('/Agendamentos/:agd_id', agendamentoController.apagarAgendamento); 


router.get('/publicacao',publicacaoController.listarPublicacao); 
router.post('/publicacao', publicacaoController.cadastrarPublicacao); 
router.patch('/publicacao/:pub_id',publicacaoController.editarPublicacao); 
router.delete('/publicacao/:pub_id', publicacaoController.apagarPublicacao); 



module.exports = router;