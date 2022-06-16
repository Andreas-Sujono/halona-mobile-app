export const formatDateTime = (timestamp: number, timezone = '') => {
  if (timezone) {
    return new Date(timestamp).toLocaleString();
  }
  return new Date(timestamp).toLocaleString();
};

const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novermber',
  'December',
];
export const getCurrentMonth = () => {
  const month = new Date().getMonth();
  return monthMap[month];
};

export const formatCurrency = (number: number) => {
  return number.toLocaleString('en-us', { style: 'currency', currency: 'IDR' }).slice(0, -3);
};