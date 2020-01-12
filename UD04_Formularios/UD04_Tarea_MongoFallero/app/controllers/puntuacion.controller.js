const Puntuacion = require('../models/puntuacion.model.js');

// Obtener todos los puntuaciones
exports.findAll = (req, res) => {

  Puntuacion.find().then(puntuaciones => {
    res.send(puntuaciones);
  }).catch(err => {
    res.status(500).send({
      message: err.message || " Algo fue mal mientras los capturabamos a todos"
    });
  });
};


// Crear y salvar
exports.create = (req, res) => {

  // Validamos el puntuacion

  if (!req.body) {
    return res.status(400).send({
      message: "puntuacion Vacio..."
    });
  }

  res.send(req.body);

  const puntuacion = new Puntuacion({
    idFalla: req.body.idFalla,
    ip: req.body.ip,
    puntuacion: req.body.puntuacion
  })

  puntuacion.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something was wrong creating puntuacion"
    });
  });
};

exports.limpiar = (req, res) => {

  Puntuacion.find().then(puntuaciones => {

    puntuaciones.forEach(dato => {

      Puntuacion.findByIdAndRemove(dato._id)
        .then(puntuacion => {
          if (!puntuacion) {
            return res.status(404).send({
              message: "Puntiación no encontrado " + req.params.puntuacionId
            });
          }


        }).catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: "Puntuación not found with id " + req.params.puntuacionId
            });
          }
          return res.status(500).send({
            message: "No se puede encontrar una Puntuación con id " + req.params.puntuacionId
          });
        });
    })

    res.send({
      message: "BD Limpia"
    });

  }).catch(err => {
    res.status(500).send({
      message: err.message || " Algo fue mal mientras los capturabamos a todos"
    });
  });


};
// Delete
exports.delete = (req, res) => {

  Puntuacion.findByIdAndRemove(req.params.puntuacionId)

    .then(puntuacion => {
      if (!puntuacion) {
        return res.status(404).send({
          message: "Puntiación no encontrado " + req.params.puntuacionId
        });
      }
      res.send({
        message: "Puntuación eliminada"
      });

    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Puntuación not found with id " + req.params.puntuacionId
        });
      }
      return res.status(500).send({
        message: "No se puede encontrar una Puntuación con id " + req.params.puntuacionId
      });
    });
};

// https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html
// findOne
exports.findOne = (req, res) => {

  Puntuacion.findOne({
    //_id: req.params.puntuacionId
    'idFalla': req.body.idFalla,
    'ip': req.body.ip

  }).then(puntuacion => {

    res.send(puntuacion);

  }).catch(err => {

    res.status(500).send({
      message: err.message || " Algo fue mal mientras los capturabamos la id"
    });
  });

};

// Update
exports.update = (req, res) => {

  Puntuacion.findOne({

    'idFalla': req.body.idFalla,
    'ip': req.body.ip

  }).then(puntuacion => {

    puntuacion.puntuacion = req.body.puntuacion

    puntuacion.save().then(data => {
      res.send(data);
    })

  }).catch(err => {
    res.status(500).send({
      message: err.message || " Algo fue mal mientras los capturabamos la id"
    });
  });

};
