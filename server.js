const express = require('express');

const app = express();

app.listen( 3000, () => {
    console.log('Servidor Iniciado');
});

//express().verboHTTP(ruta, callback( request, response))

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.get('/error', (req, res) => {
    res.status(400);
    res.json({ error: 'Hubo un error' });
});

//https://jsonplaceholder.typicode.com/photos/1?size=600

app.get('/photos', (req, res) => {
    res.json([
    {
        id:1,
        title: 'asdasda',
        url: 'https://via.placeholder.com/600/92c952'
    }, 
    {
        id: 2,
        title: 'asdasd2',
        url: 'https://via.placeholder.com/600/771796'
    }
    ]);
});

const fotos = [
    {
        id:1,
        title: 'asdasda',
        url: 'https://via.placeholder.com/600/92c952'
    }, 
    {
        id: 2,
        title: 'asdasd2',
        url: 'https://via.placeholder.com/600/771796'
    }
    ];
    
//Definicion de la ruta de express que retorna una foto especifica

/*app.get('/photos/:indiceFoto', (req, res) => {
    const indiceFoto = req.params.indiceFoto;
    res.json(fotos[indiceFoto]);
});
*/

app.get('photos/', (req, res) => {

    //req.query contiene todos los query strings enviados
    const { size, author } = req.query;

    res.json( {size, author});
});