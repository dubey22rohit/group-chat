import { CustomError } from "./custom-error.js";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;
  message: string = "not authorized";

  constructor() {
    super("not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
