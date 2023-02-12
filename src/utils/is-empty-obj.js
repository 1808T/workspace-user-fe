const isEmptyObj = (obj) => {
  return JSON.stringify(obj) === '{}';
};

export default isEmptyObj;
