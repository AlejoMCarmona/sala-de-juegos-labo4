// Utils

export function obtenerFechaYHoraActual(): string {
    const fechaActual = new Date();
  
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const horas = String(fechaActual.getHours()).padStart(2, '0'); 
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
  
    return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
}