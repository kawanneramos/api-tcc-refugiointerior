const express = require('express'); 
const router = express.Router(); 

const DisponibilidadesController = require('../controllers/disponibilidades'); 
const EspecialidadesController = require('../controllers/especialidades');  

router.get('/disponibilidades',DisponibilidadesController.listarDisponibilidades); 
router.post('/disponibilidades',DisponibilidadesController.cadastrarDisponibilidades); 
router.patch('/disponibilidades/:id',DisponibilidadesController.editarDisponibilidades); 
router.delete('/disponibilidades/:id',DisponibilidadesController.apagarDisponibilidades); 

router.get('/especialidades',EspecialidadesController.listarEspecialidades); 
router.post('/especialidades',EspecialidadesController.cadastrarEspecialidades); 
router.patch('/especialidades/:id',EspecialidadesController.editarEspecialidades); 
router.delete('/especialidades/:id',EspecialidadesController.apagarEspecialidades); 


module.exports = router;