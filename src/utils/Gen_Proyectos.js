//<<============== Generador de proyectos ============>>

export const generador = {

        //contador de id
        contador: 0,

// plantilla de proyectos con funciones que la controlan

    proyecto: class {
        constructor(nombre, id){
            this.id = id,
            this.nombre = nombre,
            this.tareas = []
        };
//provado
        buscador(aBuscar){
            let ubicacion = -1;
            const encontrado = this.tareas.some((obj,index)=> {
                if(obj.descripcion.toLowerCase().includes(aBuscar.toLowerCase())){
                    ubicacion=index
                    return true
                }
                return false;
            })

            return {find:encontrado, index:ubicacion }
        }
//provado
        agregarTarea(descripcion, completado){
            this.tareas.push(
                {
                    descripcion:descripcion, completado:completado
                }
            )
            console.log(`Tarea: ${descripcion} agregada`);
            
        };
//provado
        cambiarEstado(tarea){
            const { find, index } = this.buscador(tarea)
            
            if(find){
                this.tareas[index].completado= !this.tareas[index].completado;
                console.log(`Estado de: ${tarea} actualizada`)
            } else{
                console.log(`${tarea} No encontrado`);
            }
        };
//provado
        borrarTarea(tarea){
            const { find, index } = this.buscador(tarea)

            if(find){
                this.tareas.splice(index,1),console.log(`Tarea ${tarea} eliminada`);
            }else{
                console.log(`No encontrado`);
            }
        };

    },

// funcion generador de nuevos proyectos

    newProyecto(contenedor, nombre){
        this.contador++;
        const proyectoNuevo = new this.proyecto(nombre, this.contador);
        contenedor.push(proyectoNuevo);
        console.log(`Nuevo proyecto ${nombre} agregado con id ${this.contador}`);
    }

};


