export type ErrorLike = {
  message: string;
  cause?: unknown;
};

export function isErrorLike(err: unknown): err is ErrorLike {
  return (!!err && typeof err == 'object' && 'message' in err && typeof err.message == 'string');
}
