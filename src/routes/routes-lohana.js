const express = require('express'); 
const router = express.Router(); 

const Redes_apoioController = require('../controllers/redes_apoio'); 
const LocalizacoesController = require('../controllers/localizacoes'); 

router.get('/redes-apoio', Redes_apoioController.listarRedes_apoio); 
router.post('/redes-apoio', Redes_apoioController.cadastrarRedes_apoio); 
router.patch('/redes-apoio/:redeapoio_id', Redes_apoioController.editarRedes_apoio); 
router.delete('/redes-apoio/:redeapoio_id', Redes_apoioController.apagarRedes_apoio); 

router.get('/localizacoes', LocalizacoesController.listarLocalizacoes); 
router.post('/localizacoes', LocalizacoesController.cadastrarLocalizacoes); 
router.patch('/localizacoes/:lcz_id', LocalizacoesController.editarLocalizacoes); 
router.delete('/localizacoes/:lcz_id', LocalizacoesController.apagarLocalizacoes); 

module.exports = router;