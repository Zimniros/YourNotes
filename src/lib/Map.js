/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
class ExtendedMap {
  constructor(iterable) {
    this._map = new Map(iterable);
    Object.defineProperty(this, 'size', {
      get: () => this._map.size,
      set(value) {
        this.size = value;
      },
    });
  }

  get(...args) {
    return this._map.get(...args);
  }

  set(...args) {
    return this._map.set(...args);
  }

  delete(...args) {
    return this._map.delete(...args);
  }

  forEach(...args) {
    return this._map.forEach(...args);
  }

  map(cb) {
    const result = [];
    for (const [key, value] of this._map) {
      result.push(cb(value, key));
    }
    return result;
  }

  [Symbol.iterator]() {
    return this._map[Symbol.iterator]();
  }

  toArray() {
    return [...this._map.values()];
  }
}

export default ExtendedMap;
