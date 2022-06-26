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
  // return number.toLocaleString('en-us', { style: 'currency', currency: 'IDR' }).slice(0, -3);
  try {
    const decimalCount = 0;
    const thousands = '.';
    const decimal = ',';

    const negativeSign = number < 0 ? '-' : '';

    let i = parseInt(Math.abs(Number(number) || 0).toFixed(decimalCount)).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    const numberString =
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(number - Number(i))
            .toFixed(decimalCount)
            .slice(2)
        : '');
    return 'Rp ' + numberString;
  } catch (e) {
    console.log(e);
    return '';
  }
};

export const formatDate = (date?: Date | string) => {
  if (!date) {
    return '';
  }
  return moment(date).format('DD/MMM/yyyy');
};
