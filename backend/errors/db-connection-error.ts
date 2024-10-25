import { CustomError } from "./custom-error";
export class DBConnectionError extends CustomError {
  statusCode: number = 500;
  message = "error connecting to database";

  constructor() {
    super("error connecting to database");

    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
