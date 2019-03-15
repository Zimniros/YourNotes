/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
class ExtendedSet {
  constructor(iterable) {
    this._set = new Set(iterable);
    Object.defineProperty(this, 'size', {
      get: () => this._set.size,
      set(value) {
        this.size = value;
      },
    });
  }

  add(...args) {
    return this._set.add(...args);
  }

  delete(...args) {
    return this._set.delete(...args);
  }

  forEach(...args) {
    return this._set.forEach(...args);
  }

  [Symbol.iterator]() {
    return this._set[Symbol.iterator]();
  }

  map(cb) {
    const result = [];
    this._set.forEach((value, key) => {
      result.push(cb(value, key));
    });

    return result;
  }

  toArray() {
    return Array.from(this._set);
  }
}

export default ExtendedSet;
