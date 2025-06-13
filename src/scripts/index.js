//<<============== Importamos funciones para proyectos y tareas ============>>

import { generador } from '../utils/Gen_Proyectos.js';
import { control } from '../utils/Control_Proyectos.js';


import { generarProyectosYtareas } from './Proyectos.js';
//<<============== Creamos base de datos local ============>>

    let dataBase = [];

    window.dataBase = dataBase;

//<<============== Cargamos lista de proyectos ============>>

    function mostrarListaDeProyectos (contenedor){
        //capturamos contenedor y nombres de proyectos
        const listaDeProyectos = document.getElementById('listaDeProyectos');
        const allproyectos = contenedor.map( (p,i) => { return {nombre:p.nombre, index:i}})
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
        console.log(allproyectos);
        
        //mostramos proyectos en contenedor
        listaDeProyectos.innerHTML = allproyectos.map( ({nombre, index}) => 
            `<li class="font-semibold my-[2vh] text-[1.1rem] hover:text-[#fb8500] hover:underline cursor-pointer"
                data-proyecto="${nombre}"
                data-index="${index}" 
                onclick="showTareas(this)">
                ${nombre}
            </li>
            `
        ).join("")
    }

//<<============== funcion para mostrar proyectos y % de avance ============>>

    function resumenProyectos (contendor){
        const { estadoDeProyectos, totalProgreso, unoCompleto} = control.reporteGeneral(contendor);
            console.log(estadoDeProyectos);
        const contenedor = document.getElementById("contenedor");

        contenedor.innerHTML = estadoDeProyectos.map(({ proyecto, progreso, index }) => 
            (`
                <article class="w-full h-[6vh] bg-gray-200 flex hover:bg-[#FFB703] hover:font-semibold rounded" data-index="${index}" data-proyecto="${proyecto}" onclick="showTareas(this)">
                    <h4 class="w-[70%] h-full flex items-center px-1">
                        ${proyecto}
                    </h4>
                    <h4 class="w-[30%] h-full flex items-center px-1">
                        ${progreso} Completado
                    </h4>
                </article>
            `)).join('');
        }
//'✔️' : '❌'

//<<============== funcion onclick para mostrar lista de tareas ============>>

        window.showTareas = function showTareas(elemento, dataBase = 'dataBase') {
            const bd = window[dataBase];

            const index = elemento.dataset.index;
            const name = elemento.dataset.proyecto;
            const allWorks = bd[index].tareas;
            const contenedor = document.getElementById("contenedor");
            const titulo = document.getElementById("nombreProyecto");

            titulo.innerText = name;
            contenedor.innerHTML = allWorks.map(({ descripcion, completado }) => 
            `
                <article class="w-full h-[6vh] bg-gray-200 flex hover:bg-[#FFB703] hover:font-semibold rounded cursor-pointer" 
                    data-descripcion="${descripcion}" 
                    data-index="${index}" 
                    onclick="cambioEstado(this)">
                    
                    <h4 class="w-[70%] h-full flex items-center px-1">${descripcion}</h4>
                    <h4 class="w-[30%] h-full flex items-center px-1 justify-between">
                        ${completado ? 'Completo': 'En proceso' }
                        <span 
                            class="border border-[#023047] w-[5vh] h-[5vh] 
                            ${completado ? 'bg-[green]' : 'bg-[yellow]'} 
                            rounded-full cursor-pointer">
                        </span>
                    </h4>
                </article>
            `).join('');

        }

//<<============== funcion onclick para cambiar estado ============>>

        window.cambioEstado = function cambioEstado(elemento, dataBase = 'dataBase') {
            console.log(`pruba`);
            
            const bd = window[dataBase];
            const tarea = elemento.dataset.descripcion;
            const index = elemento.dataset.index;

            const resultado = control.cambiarEstadoTarea(bd, index, tarea);

            elemento.lastElementChild.innerHTML = `${resultado ? 'Completo': 'En proceso' }
                        <span 
                            class="border border-[#023047] w-[5vh] h-[5vh] 
                            ${resultado ? 'bg-[green]' : 'bg-[yellow]'} 
                            rounded-full cursor-pointer">
                        </span>` ;
        }

//<<============== buscadores rapidos ============>>

        

//<<============== agregar Proyectos y agregar tareas. ============>>
 document.addEventListener("DOMContentLoaded", function () {

    generarProyectosYtareas(dataBase)

    mostrarListaDeProyectos(dataBase);
    resumenProyectos(dataBase);

  });

//<<============== funcion Home ============>>

export function home(){
    mostrarListaDeProyectos(dataBase);
    resumenProyectos(dataBase);
  }