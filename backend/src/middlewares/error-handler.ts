import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  res.status(500).send({
    errors: [{ message: "something went wrong" }],
  });
  return;
};
