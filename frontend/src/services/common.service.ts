export const convertDate = (date: string) => {
  const dateObj = new Date(date);
  return (
    dateObj.getHours() +
    ':' +
    dateObj.getMinutes() +
    ' ' +
    dateObj.getUTCDate() +
    '/' +
    dateObj.getUTCMonth() +
    '/' +
    dateObj.getUTCFullYear()
  );
};
