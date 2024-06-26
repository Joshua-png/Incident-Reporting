const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong";
  console.log(error);
  res.status(statusCode).json({ msg: message });
};

module.exports = { errorHandlerMiddleware };
