
import { generador } from '../utils/Gen_Proyectos.js';
import { control } from '../utils/Control_Proyectos.js';


export function generarProyectosYtareas(dataBase) {
    const proyectosConTareas = [
        {
            nombre: "Gestión de Usuarios",
            tareas: [
                "Diseñar base de datos de usuarios",
                "Implementar formulario de registro",
                "Agregar inicio de sesión con JWT",
                "Recuperación de contraseña por email",
                "Validar entradas del formulario",
                "Mostrar perfil del usuario",
                "Proteger rutas privadas"
            ]
        },
        {
            nombre: "Tienda Virtual Frontend",
            tareas: [
                "Diseñar landing page con productos",
                "Implementar carrito de compras",
                "Agregar filtros y búsqueda",
                "Conectar a la API de productos",
                "Mostrar detalles del producto",
                "Diseñar sección de checkout",
                "Validar formulario de pago"
            ]
        },
        {
            nombre: "API de Inventario",
            tareas: [
                "Crear rutas CRUD para productos",
                "Diseñar el modelo de producto",
                "Agregar middleware de validación",
                "Proteger rutas con tokens",
                "Conectar con base de datos",
                "Agregar filtros y paginación",
                "Documentar la API con Swagger"
            ]
        },
        {
            nombre: "Panel de Administración",
            tareas: [
                "Diseñar interfaz responsive",
                "Mostrar métricas con gráficas",
                "Listar y editar usuarios",
                "Filtrar pedidos por estado",
                "Agregar autenticación de administrador",
                "Crear dashboard con resumen general",
                "Integrar exportación de reportes"
            ]
        },
        {
            nombre: "Sistema de Reservas",
            tareas: [
                "Crear calendario interactivo",
                "Agregar selección de horarios",
                "Notificar por email al reservar",
                "Validar disponibilidad del recurso",
                "Diseñar formulario de reserva",
                "Crear historial de reservas",
                "Agregar botón para cancelar reserva"
            ]
        }
    ];

    // Crear proyectos y agregar tareas
    proyectosConTareas.forEach(({ nombre, tareas }) => {
        generador.newProyecto(dataBase, nombre);
        tareas.forEach(tarea => {
            const completado = Math.random() < 0.5; // Random: completado o no
            control.insertarTarea(dataBase, nombre, tarea, completado);
        });
    });
}
