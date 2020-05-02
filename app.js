//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

//console.log(argv);

let comando = argv._[0];

switch (comando) {

    case 'crear':
        console.log('Crear por hacer');
        let tarea = porHacer.crear(argv.descripcion);
        //console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();
        //console.log(listado);
        console.log('Tareas');
        for (let tarea of listado) {
            console.log('=========================');
            console.log('Por hacer.'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);

        }

        //console.log('object');

        break;

    case 'actualizar':
        console.log('Actualiza una tarea por hacer.');
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)
            //console.log('des ', argv.descripcion, argv.completado);
        console.log('Actualizado: ', actualizado);
        break;
    case 'borrar':
        console.log('Borra una tarea por hacer.');
        let borrado = porHacer.borrar(argv.descripcion);
        console.log('Borrado: ', borrado);
        break;


    default:
        console.log('Comando no es reconocido.');

}