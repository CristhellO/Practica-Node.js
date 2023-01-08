'use strict';

const mongoose = require('mongoose');

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  //name: String,
  name: String,
  venta: Boolean,
  precio: Number,
  photo: String,
  tags: [String],
});

// creamos un método estático
anuncioSchema.statics.lista = function(filtro, skip, limit, fields, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec()
}
anuncioSchema.statics.listaAll = function() {
  const query = Anuncio.find();
  return query.exec();
}

//crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

//exportar el modelo
module.exports = Anuncio;
