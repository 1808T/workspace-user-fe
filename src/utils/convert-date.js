export const convertToDate1 = (timestamp) => {
  const ts = new Date(timestamp);
  return ts
    .toLocaleDateString('zh-Hans-CN', {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
    })
    .split('/')
    .join('-');
};

export const convertToDate2 = (timestamp) => {
  const ts = new Date(timestamp);
  return ts.toDateString().split(' ').slice(1).join(' ');
};

export const toShortMonth = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'short',
  });
};
