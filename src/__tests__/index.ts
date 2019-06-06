import * as e from '../';

describe('erroar', () => {
  test('Erroar class', () => {
    const reason = new Error('reason');
    const payload = { foo: 'bar' };
    const err = new e.Erroar('ETEST', 'test error', {
      err: reason,
      payload,
      expose: true,
    });
    const errWithDefaults = new e.Erroar('ETEST', 'test error');
    
    expect(err.code).toBe('ETEST');
    expect(err.message).toBe('test error');
    expect(err.err).toBe(reason);
    expect(err.payload).toBe(payload);
    expect(err.expose).toBe(true);
    expect(err.toJSON()).toEqual({
      code: 'ETEST',
      message: 'test error',
      payload: {
        foo: 'bar',
      },
    });
    expect(errWithDefaults.expose).toBe(false);
  });
  
  test('isErroar type guard', () => {
    const err = new e.Erroar('ETEST', 'test error');
    
    expect(e.isErroar('test')).toBe(false);
    expect(e.isErroar(42)).toBe(false);
    expect(e.isErroar({})).toBe(false);
    expect(e.isErroar(Object.create(null))).toBe(false);
    expect(e.isErroar(() => {})).toBe(false);
    expect(e.isErroar(true)).toBe(false);
    expect(e.isErroar(null)).toBe(false);
    expect(e.isErroar(undefined)).toBe(false);
    expect(e.isErroar(new Error('test'))).toBe(false);
    expect(e.isErroar(err)).toBe(true);
  });
  
  test('factory functions', () => {
    const factory = e.createFactory('ETEST', 'test error', true);
    const err = factory();
    
    expect(err.code).toBe('ETEST');
    expect(err.message).toBe('test error');
    expect(err.expose).toBe(true);
    
    const whatFactory = e.createWhatFactory('ETEST', what => `${what} broken`, true);
    const whatErr = whatFactory({ what: 'something' });
    
    expect(whatErr.code).toBe('ETEST');
    expect(whatErr.message).toBe('something broken');
    expect(whatErr.expose).toBe(true);
  });
  
  test('default factory error codes', () => {
    const whatCtx = { what: 'something' };
    
    expect(e.internal().code).toEqual('EINTERNAL');
    expect(e.access().code).toEqual('EACCESS');
    expect(e.notfound(whatCtx).code).toEqual('ENOTFOUND');
    expect(e.exists(whatCtx).code).toEqual('EEXISTS');
    expect(e.invalid(whatCtx).code).toEqual('EINVALID');
  });
});
