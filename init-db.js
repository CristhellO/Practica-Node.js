// Inicializar la base datos con los datos mínimos para funcionar
const { promiseImpl } = require('ejs');
const readline = require('readline');


//cargar los modelos
const Anuncio = require('./models/Anuncio');

async function main() {

  //preguntar al usuario si esta seguro
  const continuar = await preguntaSiNo('ESTAS SEGURO QUE QUIERES BORRAR LA BASE DE DATOS?')
  if (!continuar) {
    process.exit();
  }

  //conectar a la base de datos
  const connection = require('./lib/connectMongoose')
    
    // inicializar la coleccion de anuncios
    await initAnuncios();


    //desconectar de la base de datos
    connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initAnuncios() {
   // borrar todos los documentos de la colección de anuncios
  const result = await Anuncio.deleteMany();
  console.log(`Eliminados ${result.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany([
    { name: 'bicicleta', venta: true, precio: 250, photo: 'urlphoto',tags: [ 'lifestyle', 'motor']},
    { name: 'iphone11', venta: false, precio: 2000, photo: 'urlphoto', tags: ['lifestyle', 'mobile']},
    { name: 'tv', venta: true, precio: 1800, photo: 'urlphoto', tags: [ 'lifestyle', 'home']},
  ]);
  console.log(`Creados ${inserted.length} anuncios.`)
}

function preguntaSiNo(texto) {
  return new promise((resolve, reject) => {
   const insterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  Interface.question(texto, respuesta => {
    Interface.close();
    if (respuesta.tolowerCase() === 'si') {
        resolve(true);
        return;
    }
    resolve(false);
  })
  })
}