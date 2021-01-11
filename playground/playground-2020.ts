// 节流
const throttle = (fn: () => void, interval = 300) => {
  let canRun = true;
  return function() {
    if (!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
};

// 防抖
const debounce = (fn: () => void, interval = 300) => {
  let timer: number;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
};

// 深拷贝(不考虑Func)
const deepClone1 = (data: any) => {
  // 基础类型
  if (typeof data !== "object" || data === null) {
    return data;
  }

  // 引用类型
  const copyData = Array.isArray(data) ? [] : {};

  for (let i in data) {
    const value = data[i];
    if (value === data) {
      continue;
    }
    if (typeof value === "object") {
      copyData[i] = deepClone1(value);
    }
    copyData[i] = value;
  }
  return copyData;
};

const deepClone2 = (data: any) => {
  // 基础类型
  if (typeof data !== "object" || data === null) {
    return data;
  }
  // 引用类型
  const copyData = Array.isArray(data) ? [] : {};
  const queue: {
    key: string;
    value: any;
    parent: any;
  }[] = [];

  for (let key in data) {
    queue.push({
      key,
      value: data[key],
      parent: copyData
    });
  }
  while (queue.length) {
    const currentNode = queue.shift();
    const {
      key: currentKey,
      value: currentValue,
      parent: currentParent
    } = currentNode;
    if (typeof data !== "object" || data === null) {
      currentParent[currentKey] = currentValue;
      continue;
    }
    currentParent[currentKey] = Array.isArray(currentValue) ? [] : {};
    for (let key in currentValue) {
      queue.push({
        key,
        value: currentValue[key],
        parent: currentParent[currentKey]
      });
    }
  }
  return copyData;
};

// 数组去重
const uniqueArray = (arr: Array<any>) => {
  return Array.from(new Set(arr));
};

// 数组乱序
const shuffleArray = (arr: Array<any>) => {
  let m = arr.length;
  while (m > 1) {
    const index = ~~(Math.random() * m--);
    [arr[m], arr[index]] = [arr[index], arr[m]];
  }
  return arr;
};

// call\apply\bind

//@ts-ignore
Function.prototype.myBind = function(context) {
  const _this = this;
  const args = Array.prototype.slice.call(arguments, 1);
  return function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    return _this.apply(context, args.concat(bindArgs));
  };
};

//@ts-ignore
Function.prototype.myCall = function(context) {
  let _context = context || window;
  const arg = Array.from(arguments).slice(1);
  _context.fn = this;
  _context.fn(...arg);
  Reflect.deleteProperty(_context, "fn");
};
//@ts-ignore
Function.prototype.myApply = function(context) {
  let _context = context || window;
  const arg = Array.from(arguments).slice(1);
  _context.fn = this;
  _context.fn(arg);
  Reflect.deleteProperty(_context, "fn");
};

// 继承

// sleep

const sleep = (time = 1000) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

// 控制请求并发量

function handleFetchQueue(urls: string[], max = 5, callback: Function) {
  const urlCount = urls.length;
  const requestsQueue = [];
  const results = [];
  let i = 0;

  const handleRequest = (url: string) => {
    const req = fetch(url)
      .then(res => {
        console.log("当前并发： " + requestsQueue);
        const len = results.push(res);
        if (len < urlCount && i + 1 < urlCount) {
          requestsQueue.shift();
          handleRequest(urls[++i]);
        } else if (len === urlCount) {
          "function" === typeof callback && callback(results);
        }
      })
      .catch(e => {
        results.push(e);
      });

    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i]);
    }
  };

  handleRequest(urls[i]);
}

// promise

// curry
