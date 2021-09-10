/** Create Error from error of unknown type */

export function createError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  } else if (typeof error === "string") {
    return new Error(error);
  } else {
    return new Error(String(error));
  }
}
