export function calculateEpiWeek () {
    //Calcular el número de semana actual
// Obtener la fecha actual
const today = new Date();

// Obtener la fecha del primer día del año
const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

// Calcular la diferencia en milisegundos entre la fecha actual y el primer día del año
const diffMilliseconds = today - firstDayOfYear;

// Convertir la diferencia a días
const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

// Calcular el número de semana del año
const weekNumber = Math.ceil((diffDays + firstDayOfYear.getDay() + 1) / 7);

console.log(`El número de semana del año es: ${weekNumber}`);
return weekNumber
}
