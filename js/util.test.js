import { validateType } from './util.js';

describe('util test', () => {
  test('validateType test', () => {
    expect(validateType(3, 'number')).toBe(true);
    expect(validateType(NaN, 'number')).toBe(false);
    expect(validateType('abc', 'string')).toBe(true);
    expect(validateType(true, 'string')).toBe(false);
    expect(validateType({}, 'boolean')).toBe(false);
    expect(validateType(undefined, 'undefined')).toBe(true);
    expect(validateType(function(){}, 'function')).toBe(true);
  });
})