const errorMassage = {
  400: "missing required name field",
  404: "Not found",
};

const HttpError = (status, massage = errorMassage[status]) => {
  const error = new Error(massage);
  error.status = status;
  return error;
};

module.exports = HttpError;
