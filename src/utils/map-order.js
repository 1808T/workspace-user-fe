// Order an array of objects based on other array order
// -----------------------------------------------------
const mapOrder = (array, order, key) => {
  if (!array || !order || !key) return [];

  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
  return array;
};

export default mapOrder;
