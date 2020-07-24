//Clase 43 EXPRESS JS

const express = require('express');

const server = express();

const alumnos = [
    {
        id: 0,
        nombre: 'Juan Gonzalez',
    },
    {
        id: 1,
        nombre: 'Juan Urti'
    },
    {
        id: 2,
        nombre: 'Juan Sierra'
    }
];

server.listen( 4000, () => {
    console.log('Servidor iniciado');
})

// PATH /alumnos
server.get('/acamica/dwfs/alumnos', (req, res) => {
    res.json(alumnos);
});

//PATH /alumnos/:id
server.get('/acamica/dwfs/alumnos/:id', (req, res) => {
    const { id } = req.params;
    
    if ( !isNaN(id)) { 
        res.json(alumnos[id]);
    } else { //typeof alumnos[id] = 'undefined'
        res.status(400);
        res.json({ error: 'Hubo un error en la petición, usa un id válido.' });
    }
   
})