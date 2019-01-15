class _Lazy {
  constructor(data) {
    this.iterator = initIterator(data);
  }

  map(...args) {
    this.iterator = map(this.iterator, ...args);
    return this;
  }

  filter(...args) {
    this.iterator = filter(this.iterator, ...args);
    return this;
  }

  take(...args) {
    this.iterator = take(this.iterator, ...args);
    return this;
  }

  valueOf() {
    return [...this.iterator]
  }
}

function* initIterator(arr) {
  for (const i of arr) {
    yield i;
  }
}

function* map(flow, mapFn) {
  for (const data of flow) {
    yield mapFn(data);
  }
}

function* filter(flow, filterFn) {
  for (const data of flow) {
    if (filterFn(data)) {
      yield data;
    }
  }
}

function take(flow, number) {
  let count = 0;
  const _filter = function() {
    count++;
    return count >= number;
  };

  return stop(flow, _filter);
}

function* stop(flow, stopFn) {
  for (const data of flow) {
    yield data;
    if (stopFn(data)) {
      break;
    }
  }
}

function Lazy(...args) {
  return new _Lazy(...args);
}

const result = Lazy([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .map(it => it * 2)
  .filter(it => it > 6)
  .take(3)
  .valueOf();
console.log("result===>>>>", result);
