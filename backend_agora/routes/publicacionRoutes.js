// publicacionRoutes.js

const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');

router.post('/', publicacionController.altaPublicacion);
router.get('/', publicacionController.getAllPublicacion);
router.get('/tema/:tema', publicacionController.getPublicacionByTema);
router.get('/id/:idpublicacion', publicacionController.getPublicacionById)
router.put('/:idpublicacion', publicacionController.updatePublicacion)
router.delete('/:idpublicacion', publicacionController.deletePublicacion);
// router.get('/grafica', publicacionController.getGraficaPublicacion);

module.exports = router;