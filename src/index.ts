export const BRAND = Symbol.for('erroar');

export interface Context {
  err?: Error;
  payload?: object;
  expose?: boolean;
}

export interface WhatContext extends Context {
  what: string;
}

export class Erroar extends Error {
  public static readonly [BRAND]: boolean = true;
  
  public readonly code: string;
  public readonly err?: Error;
  public readonly payload?: object;
  public readonly expose: boolean;
  
  constructor(code: string, message: string, ctx?: Context) {
    super(message);
    
    this.code = code;
    this.err = ctx && ctx.err;
    this.payload = ctx && ctx.payload;
    this.expose = !!(ctx && ctx.expose);
  }
  
  public toJSON(): object {
    return {
      code: this.code,
      message: this.message,
      payload: this.payload,
    };
  }
}

export function isErroar(err: any): err is Erroar {
  // tslint:disable-next-line:no-unsafe-any
  return !!(err && typeof err == 'object' && err.constructor && err.constructor[BRAND]);
}

export function createFactory(
  code: string,
  defaultMessage: string,
  expose: boolean,
): (ctx?: Context, message?: string) => Erroar {
  return (ctx, message) => {
    return new Erroar(code, message || defaultMessage, { ...ctx, expose });
  };
}

export function createWhatFactory(
  code: string,
  getDefaultMessage: (what: string) => string,
  expose: boolean,
): (ctx: WhatContext, message?: string) => Erroar {
  return (ctx, message) => {
    const {
      payload,
      what,
    } = ctx;
    
    return new Erroar(code, message || getDefaultMessage(what), {
      ...ctx,
      payload: { ...payload, what },
      expose,
    });
  };
}

export const internal = createFactory('EINTERNAL', 'internal error', true);
export const access = createFactory('EACCESS', 'access denied', true);
export const notfound = createWhatFactory('ENOTFOUND', what => `${what} not found`, true);
export const exists = createWhatFactory('EEXISTS', what => `${what} already exists`, true);
export const invalid = createWhatFactory('EINVALID', what => `invalid ${what}`, true);
