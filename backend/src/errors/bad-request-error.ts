import { CustomError } from "./custom-error.js";

export class BadRequestError extends CustomError {
  statusCode: number;

  constructor(public message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
