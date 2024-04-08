import { type ErrorLike, isErrorLike } from './error';

export type DetailsErrorOptions = ErrorOptions & {
  details?: Record<string, unknown>;
};

export class DetailsError extends Error {
  public details?: Record<string, unknown>;
  
  constructor(message?: string, options?: DetailsErrorOptions) {
    super(message, options);
    
    if (options?.details) {
      this.details = options.details;
    }
  }
}

export type DetailsErrorLike = ErrorLike & {
  details?: Record<string, unknown>;
};

export function isDetailsErrorLike(err: unknown): err is DetailsErrorLike {
  return isErrorLike(err)
}
