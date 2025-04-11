export const parseYear = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const fullYear = date.getFullYear();

  return fullYear;
};
