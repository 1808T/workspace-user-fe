const compareArrays = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  );
};

export default compareArrays;
