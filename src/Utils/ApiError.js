class ApiError extends Error {
    constructor(StatusCode , message="Something went wrong "){
  
      super(message);
      this.StatusCode = StatusCode;
      this.isOperational = true;
      Error.captureStackTrace(this,this.constructor);
    }
  }
  export {ApiError};