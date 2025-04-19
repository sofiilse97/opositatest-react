/**
 *  Función que dada una fecha nos devuelve el año correspondiente.
 * @param date - Date o string que representa una fecha
 * @return number - Año correspondiente a la fecha dada
 */
export const parseYear = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const fullYear = date.getFullYear();

  return fullYear;
};
