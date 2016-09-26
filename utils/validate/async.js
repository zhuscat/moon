function flattenSeries(series) {
  const ret = [];
  Object.keys(series).forEach(k => {
    ret.push(...series[k]);
  });
  return ret;
}

function asyncEvery(arr, func, callback) {
  const results = [];
  let total = 0;
  const arrLen = arr.length;
  const count = errors => {
    results.push(...errors);
    total += 1;
    if (total === arrLen) {
      callback(results);
    }
  };
  arr.forEach(a => {
    func(a, count);
  });
}

function asyncOneError(arr, func, callback) {
  let index = 0;
  const arrLen = arr.length;
  const next = errors => {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    const prev = index;
    index += 1;
    if (prev < arrLen) {
      func(arr[prev], next);
    } else {
      callback([]);
    }
  };
  next([]);
}

/**
 * series: {name: }
 *
 */
export default function asyncPool(series, func, callback, options) {
  // 验证直到出现第一个错误
  if (options.first) {
    const fseries = flattenSeries;
    asyncOneError(fseries, func, callback);
    return;
  }
  const keys = Object.keys(series);
  const seriesLen = keys.length;
  let total = 0;
  const results = [];
  const next = (errors) => {
    results.push(...errors);
    total += 1;
    if (total === seriesLen) {
      callback(results);
    }
  };
  // 验证到每一个字段出现的第一个错误
  if (options.firstField) {
    keys.forEach(key => {
      const arr = series[key];
      asyncOneError(arr, func, next);
    });
  } else {
    keys.forEach(key => {
      const arr = series[key];
      asyncEvery(arr, func, next);
    });
  }
}
