const express = require('express'); 
const router = express.Router(); 

const DisponibilidadesController = require('../controllers/disponibilidades'); 
const ComentariosController = require('../controllers/comentarios');  

router.get('/disponibilidades', DisponibilidadesController.listarDisponibilidades); 
router.post('/disponibilidades', DisponibilidadesController.cadastrarDisponibilidades); 
router.patch('/disponibilidades/:id', DisponibilidadesController.editarDisponibilidades); 
router.delete('/disponibilidades', DisponibilidadesController.apagarDisponibilidades); 

router.get('/comentarios', ComentariosController.listarComentarios); 
router.post('/comentarios', ComentariosController.cadastrarComentarios); 
router.patch('/comentarios/:id', ComentariosController.editarComentarios); 
router.delete('/comentarios', ComentariosController.apagarComentarios); 


module.exports = router;