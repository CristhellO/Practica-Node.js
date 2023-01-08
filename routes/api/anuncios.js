'use strict'

const express = require('express');
const createError = require('http-errors');
const Anuncio = require('../../models/Anuncio');

const router = express.Router();

//GET /api/anuncios
//devuelve una lsta de anuncios
router.get('/', async (req, res, next) => {
try {

  //filtro  
  const name = req.query.name;
  const venta = req.query.venta;
  const precio = req.query.precio;
  const tags = req.query.tags;
  // paginación
  const skip = req.query.skip;
  const limit = req.query.limit;
  // seleccion de campos
  const fields = req.query.fields;
  // ordenación
  const sort = req.query.sort;

  const filtro = {};

  if(name) {
    filtro.name = name;
  }

  if (precio) {
    filtro.precio = precio;
  }

  if (venta) {
    filtro.venta = venta;
  }

  if (tags) {
    filtro.tags = tags;
  }

  const anuncios = await Anuncio.lista(filtro, skip, limit, fields, sort);
  res.json({ results: anuncios });
} catch(err) {
  next(err);
}
});

//GET /api/anuncios(id)
//devuelve un anuncio
router.get('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    //buscar anuncio en la BD
    const anuncio = await Anuncio.findById(id);
    
    res.json({ result: anuncio });

    } catch (err) {
      next(err);
    }
});

// PUT /api/anuncios
//actualizar un anuncio
router.put('/:id', async (req, res, next) => {
 try {
    
   const id = req.params.id;
   const anuncioData = req.body;

   const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: id}, anuncioData, {
    new: true //esto hace que nos devuelva el documento actualizado
   });

   res.json({ result: anuncioActualizado });

 } catch (err) {
    next(err);
 }  
});

//POST /api/anuncios (body=anuncioData)
// crear un anuncio
router.post('/', async (req, res, next) => {
 try {

   const anuncioData = req.body;

   // instanciar un nuevo anuncio en memoria
   const anuncio = new Anuncio(anuncioData);

   // lo guardo en la base de datos
   const anuncioGuardado = await anuncio.save();

   res.json({ result: anuncioGuardado });

} catch (err) {
    next(err);
 }
});

//DELETE /api/anuncios/:id
//eliminar un anuncio
router.delete('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    const anuncio = await Anuncio.findById(id);

    if (!anuncio) {
      return next(createError(404));
    }
    
   await Anuncio.deleteOne({ _id: id });

    res.json();

 } catch (err) {
    next(err);
 }
});

module.exports = router;

