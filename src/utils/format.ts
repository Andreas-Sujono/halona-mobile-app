export const formatDateTime = (timestamp: number, timezone = '') => {
  if (timezone) {
    return new Date(timestamp).toLocaleString();
  }
  return new Date(timestamp).toLocaleString();
};
