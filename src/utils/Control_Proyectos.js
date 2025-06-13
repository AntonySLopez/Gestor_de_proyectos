//<<============== controlador  de proyectos ============>>

export const control = {

    // ✅ insertarTarea - probado
    insertarTarea(array, proyecto, tarea, bool = false) {
        const index = array.findIndex(obj => obj.nombre.toLowerCase() === proyecto.toLowerCase());

        if (index !== -1) {
            array[index].agregarTarea(tarea, bool);
        } else {
            console.log(`proyecto: ${proyecto} no encontrado`);
        }
    },

    // ✅ cambiarEstadoTarea - probado
    cambiarEstadoTarea(array, index, tarea) {

        if (index) {
            return array[index].cambiarEstado(tarea);
        } else {
            console.log(`proyecto: ${proyecto} no encontrado`);
        }
    },

    // ✅ progresoDeProyectos - probado
    progresoDeProyectos(array, proyecto) {
        const index = array.findIndex(obj => obj.nombre.toLowerCase() === proyecto.toLowerCase());

        if (index === -1) {
            console.log(`${proyecto} no encontrado`);
            return null;
        }

        if (array[index].tareas.length === 0) {

            return { 
                proyecto: proyecto, 
                progreso: "No tiene tareas", 
                index:index
            };
        }

        const total = array[index].tareas.length;
        const completado = array[index].tareas.filter(t => t.completado).length;
        const progreso = ((completado / total) * 100).toFixed(0);

        return { proyecto: proyecto, progreso: `${progreso}%`, index:index };
    },

    // ✅ eliminarProyecto - probado x2
    eliminarProyecto(array, proyecto, tarea = false) {
        const index = array.findIndex(obj => obj.nombre.toLowerCase() === proyecto.toLowerCase());

        if (index === -1) {
            console.log(`Proyecto: ${proyecto} no encontrado`);
            return;
        }

        if (typeof tarea === 'string') {
            array[index].borrarTarea(tarea);
        } else {
            array.splice(index, 1);
            console.log(`Proyecto: ${proyecto} se eliminó`);
        }
    },

    // ✅ reporteGeneral - probado
    reporteGeneral(array) {
        const estadoDeProyectos = array.map(proyecto => {
            return this.progresoDeProyectos(array, proyecto.nombre);
        });

        const totalProgreso = array.every(obj => obj.tareas.every(t => t.completado));
        const unoCompleto = array.some(obj => obj.tareas.length > 0 && obj.tareas.every(t => t.completado));

        return {
            estadoDeProyectos,
            totalProgreso,
            unoCompleto
        };
    },

    // ✅ estadisticas
    estadisticas(array) {
        const tareasPorProyecto = array.flatMap(obj => obj.tareas.map(t => t.completado));
        const totalTareas = tareasPorProyecto.length;
        const totalCompletadas = tareasPorProyecto.filter(completado => completado).length;

        console.log(`Total de tareas: ${totalTareas}`);
        console.log(`Tareas completadas: ${totalCompletadas}`);
    }

};
