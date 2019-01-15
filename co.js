function co(fn) {
  var gen = fn();
  return new Promise((resolve, reject) => {
    next();
    function next(res) {
      var ret;
      ret = gen.next(res);
      // 全部结束
      if (ret.done) {
        resolve(ret.value);
        return;
      }

      // 执行回调
      if (typeof ret.value === "function") {
        ret.value(function() {
          next.apply(this, [...arguments]);
        });
      } else if (ret.value instanceof Promise) {
        ret.value.then(
          val => {
            next.apply(this, [val]);
          },
          error => {
            reject(error);
          }
        );
      } else {
        throw "yield target no supported!";
      }
    }
  });
}

co(function* a() {
  const result = yield sleep1(1000);
  console.log("promise result==>>", result);
  return result;
}).then(val => {
  console.log('promise val===>>>>', val);
});

function sleep1(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, ms);
  });
}

co(function* a() {
  const result = yield sleep2(1000);
  console.log("cb result==>>", result);
  return result;
}).then(val => {
  console.log('cb val===>>>>', val);
});

function sleep2(ms) {
  return function (cb) {
    setTimeout(() => {
      cb(1);
    }, ms);
  }
}
