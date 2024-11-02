import { CustomError } from "./custom-error.js";

export class GenericError extends CustomError {
  statusCode: number = 500;
  message: string = "something went wrong";
  constructor(message: string = "something went wrong") {
    super(message);

    Object.setPrototypeOf(this, GenericError.prototype);
  }

  serializeErrors(): { message: string; field?: string; statusCode: number }[] {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}
