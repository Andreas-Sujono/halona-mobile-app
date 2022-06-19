import moment from 'moment';

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
  if (!number) {
    number = 0;
  }
  return number.toLocaleString('en-us', { style: 'currency', currency: 'IDR' }).slice(0, -3);
};

export const formatDate = (date?: Date | string) => {
  if (!date) {
    return '';
  }
  return moment(date).format('DD/MMM/yyyy');
};
