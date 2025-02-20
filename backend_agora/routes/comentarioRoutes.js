// comentarioRoutes.js

const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

router.post('/', comentarioController.altaComentario);
router.get('/', comentarioController.getAllComentario);
router.get('/usuario/:nombre_usuario', comentarioController.getComentarioByAutor)
router.get('/id/:idcomentario', comentarioController.getComentarioById)
router.put('/:idcomentario', comentarioController.updateComentario)
router.delete('/:idcomentario', comentarioController.deleteComentario)
router.get('/grafica', comentarioController.getGraficaComentario);


module.exports = router;