const express = require('express'); 
const router = express.Router(); 

const Feedback_consultaController = require('../controllers/feedback_consulta'); 


router.get('/feedback-consulta', Feedback_consultaController.listarFeedback_consulta); 
router.post('/feedback-consulta', Feedback_consultaController.cadastrarFeedback_consulta); 
router.patch('/feedback-consulta/:fdbk_id', Feedback_consultaController.editarFeedback_consulta); 
router.delete('/feedback-consulta/:fdbk_id', Feedback_consultaController.apagarFeedback_consulta); 


module.exports = router;