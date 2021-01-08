export default class CArray {
  dataSource: number[] = [];
  length = 0;
  pos = 0;
  constructor(num: number) {
    this.length = num;
    for (let i = 0; i < num; i++) {
      this.dataSource[i] = i;
    }
  }

  upset() {
    for (let i = 0, len = this.length; i < len; i++) {
      this.dataSource[i] = Math.floor(Math.random() * (len + 1));
    }
  }

  clear() {
    for (let i = 0, len = this.length; i < len; i++) {
      this.dataSource[i] = 0;
    }
  }

  toString() {
    let str = '';
    for (let i = 0, len = Math.min(this.length, 100); i < len; i++) {
      str += this.dataSource[i] + ' ';
      if (i % 10 === 9) {
        str += '\n';
      }
    }
    return this.length > 100 ? `共${this.length}项，仅展示前100项 \n${str}` : str;
  }

  sort(sortFunc: (_array: number[]) => void | number[]) {
    const time = new Time();
    // 原数据
    console.log(this.toString());

    time.start();
    this.dataSource = sortFunc(this.dataSource) || this.dataSource;
    time.end();

    // 排序后数据
    console.log(this.toString());
    time.diff();
  }
}

export const swap = (_array: any[], a: number, b: number) => {
  const temp = _array[a];
  _array[a] = _array[b];
  _array[b] = temp;
};

export function Time() {
  this.startTime = 0;
  this.endTime = 0;

  this.start = start;
  this.end = end;
  this.diff = diff;
  function start() {
    this.startTime = new Date().getTime();
  }
  function end() {
    this.endTime = new Date().getTime();
  }

  function diff() {
    if (this.startTime === 0) {
      console.log('需调用start()函数');
      return;
    }
    if (this.endTime === 0) {
      console.log('需调用end()函数');
      return;
    }
    console.log(`time: ${this.endTime - this.startTime}ms`);
  }
}
