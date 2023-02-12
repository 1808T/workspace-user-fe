const selectTextHandler = (e) => {
  e.target.focus();
  e.target.select();
};

const saveContentAfterPressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.target.blur();
  }
};

export { selectTextHandler, saveContentAfterPressEnter };
