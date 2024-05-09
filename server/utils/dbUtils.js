const handleErrors = (e) => {
  const errors = [];
  if (e.errors) {
    for (let i = 0; i < e.errors.length; i++) {
      errors.push(e.errors[i].message);
    }
  } else {
    errors.push(e.message);
  }
  return errors;
};

module.exports = {
  handleErrors,
};
