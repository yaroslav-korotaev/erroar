interface Context {
  err?: Error;
  payload?: {};
}

export default class Erroar extends Error {
  public readonly code: string;
  public readonly err?: Error;
  public readonly payload?: {};
  
  constructor(code: string, ctx?: Context, message?: string) {
    super(message);
    
    this.code = code;
    this.err = ctx && ctx.err;
    this.payload = ctx && ctx.payload;
  }
  
  toJSON() {
    return {
      code: this.code,
      message: this.message,
      err: this.err,
      payload: this.payload,
    };
  }
}

export function internal(ctx?: Context, message?: string): Erroar {
  const msg = message || 'internal error';
  return new Erroar('EINTERNAL', ctx, msg);
}
