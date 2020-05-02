const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) {
            throw new Error(`Sucedió un error al guardar el archivo: ${err}`);

        } else {
            console.log('Datos guardados.');
        }
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
        //console.log(listadoPorHacer);
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => { return tarea.descripcion !== descripcion });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    /*let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        //console.log(listadoPorHacer[index]);
        let elBorrado = listadoPorHacer.splice(index, 1);
        console.log('Este elemento se borró: ', elBorrado);
        guardarDB();
        return true;
    } else {
        return false;
    }*/
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}