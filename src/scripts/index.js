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

        contenedor.innerHTML = estadoDeProyectos.map(({ proyecto, progreso }) => 
            (`
                <article class="w-full h-[6vh] bg-gray-200 flex hover:bg-[#FFB703] hover:font-semibold rounded">
                    <h4 class="w-[70%] h-full flex items-center px-1">${proyecto}</h4>
                    <h4 class="w-[30%] h-full flex items-center px-1 justify-between">
                        ${progreso}
                        <span id="Estado" class="border border-[#023047] w-[5vh] h-[5vh] bg-[yellow] rounded-full cursor-pointer"></span>
                    </h4>
                </article>
            `
            )).join('');
        }

//<<============== funcion onclick para mostrar lista de tareas ============>>

        window.showTareas = function showTareas(elemento, dataBase = 'dataBase') {
            const bd = window[dataBase];

            const index = elemento.dataset.index;
            const name = elemento.innerText;
            const allWorks = bd[index].tareas;

            const contenedor = document.getElementById("contenedor");
            const titulo = document.getElementById("nombreProyecto");
            titulo.innerText = name; // aunque no hace nada útil, esto sí es válido

            contenedor.innerHTML = allWorks.map(({ descripcion, completado }) => `
                <article class="w-full h-[6vh] bg-gray-200 flex hover:bg-[#FFB703] hover:font-semibold rounded">
                    <h4 class="w-[70%] h-full flex items-center px-1">${descripcion}</h4>
                    <h4 class="w-[30%] h-full flex items-center px-1 justify-between">
                        ${completado ? '✔️' : '❌'}
                        <span 
                            class="border border-[#023047] w-[5vh] h-[5vh] 
                            ${completado ? 'bg-[green]' : 'bg-[yellow]'} 
                            rounded-full cursor-pointer">
                        </span>
                    </h4>
                </article>

            `).join('');
        }

//<<============== * ============>>

//<<============== * ============>>

//<<============== * ============>>
 document.addEventListener("DOMContentLoaded", function () {

    generarProyectosYtareas(dataBase)

    mostrarListaDeProyectos(dataBase);
    resumenProyectos(dataBase);

  });