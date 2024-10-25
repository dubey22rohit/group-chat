import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ExpressValidator.ValidationError[]) {
    super("Invalid request");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
