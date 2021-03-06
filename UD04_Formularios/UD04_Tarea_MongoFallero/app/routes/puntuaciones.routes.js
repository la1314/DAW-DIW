module.exports = (app) => {
    const puntuaciones = require('../controllers/puntuacion.controller.js');

    // Create a new puntuaciones
    app.post('/api/puntuaciones', puntuaciones.create);

    // Retrieve all puntuaciones
    app.get('/api/puntuaciones', puntuaciones.findAll);

    // Delete all puntuaciones
    app.get('/api/puntuaciones/limpiar', puntuaciones.limpiar);

    // Retrieve a single puntuaciones with puntuacionId
    app.post('/api/puntuaciones/encontrar', puntuaciones.findOne);

    // Update a puntuaciones with puntuacionId
    app.put('/api/puntuaciones/actualizar', puntuaciones.update);

    // Delete a puntuaciones with puntuacionId
    app.delete('/api/puntuaciones/:puntuacionId', puntuaciones.delete);
}
