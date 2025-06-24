const express = require('express'); 
const router = express.Router(); 

const RotasKawanne = require('./routes-kawanne');  
router.use('/', RotasKawanne); 

const RotasMafer = require('./routes-mafer');  
router.use('/', RotasMafer); 

const RotasJamily = require('./routes-jamily');  
router.use('/', RotasJamily); 

const RotasLohana = require('./routes-lohana');  
router.use('/', RotasLohana); 


module.exports = router;