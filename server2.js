const express = require('express');

const server = express();

const alumnos = [
    {
        id: 1,
        nombre: 'Eugenia',
        comision: 'dwfs'
    },
    {
        id: 2,
        nombre: 'Gabriel',
        comision: 'dwfs'
    },
    {
        id: 1,
        nombre: 'Camilo',
        comision: 'dwa'
    },
    {
        id: 1,
        nombre: 'Matias',
        comision: 'bigdata'
    },
    {
        id: 2,
        nombre: 'Julio',
        comision: 'bigdata'
    },
    {
        id: 2,
        nombre: 'Juan',
        comision: 'dwa'
    },
    {
        id: 3,
        nombre: 'Marcelo',
        comision: 'dwfs'
    },
    {
        id: 3,
        nombre: 'Mati',
        comision: 'bigdata'
    },
    {
        id: 4,
        nombre: 'Leila',
        comision: 'dwfs'
    }
];

function alumnosFiltrados(  comision, nombreQuery ){
    
    let alumnosFiltrados;
    
    if ( nombreQuery ) {
        alumnosFiltrados = alumnos.filter(alumno => alumno.nombre === nombreQuery && alumno.comision === comision);
    } else {
        alumnosFiltrados = alumnos.filter(alumno => alumno.comision === comision);
    }

    return alumnosFiltrados;
}

server.listen( 3000, () => {
    console.log('Servidor iniciado');
})

//PATH alumnos
server.get( `/acamica/alumnos`, (req, res) => {

    res.json(alumnos);
});


//PATH :comision/alumnos/?nombre=
server.get( `/acamica/:comision/alumnos`, (req, res) => {

    const { comision } = req.params;
    const { nombre } = req.query;
    let resultado = alumnosFiltrados( comision, nombre );

    if( comision !== 'dwfs' && comision !== 'dwa' && comision !== 'bigdata' ){
        res.status(404).send('No existe la comisión');
    }

    if(resultado.length === 0 ) {
        res.status(404).send('El alumno con ese nombre y comisión, no existe');
    } else {
        res.json( resultado );
    }
    
});


//PATH :comision/alumnos/:id
server.get( '/acamica/:comision/alumnos/:id', (req, res) => {

    const { comision } = req.params;
    const { id } = req.params;

    const resultado = alumnosFiltrados( comision)
                        .filter( (element) => element.id == id);
    
    if( comision !== 'dwfs' && comision !== 'dwa' && comision !== 'bigdata' ){
        res.status(404).send('No existe la comisión');
    } 
    else if ( resultado.length === 0 ) res.status(404).send('El alumno con ese id y comisión, no existe');

    else res.json(resultado);

});

server.delete( '/acamica/:comision/alumnos/:id', (req, res) => {

    const { comision } = req.params;
    const { id } = req.params;

    if( comision !== 'dwfs' && comision !== 'dwa' && comision !== 'bigdata' ){
        res.status(404).send('No existe la comisión');
    } 
    
    else {
       let resultado = alumnos.filter(element => {
                if( element.comision === comision && element.id == id ) {
                    let idx = alumnos.indexOf( element );
                    res.send(`${element.nombre} de la comisión ${element.comision} fue borrado exitosamente.`);
                    alumnos.splice( idx, 1 );
                    
                    return true;
                }
            });
        
        if (resultado.length === 0) {
            res.status(404).send('El alumno con ese id y comisión, no existe');
        }
    }
    

});







