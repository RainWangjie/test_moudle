import CArray, { swap } from './CArray';

/**
 * 希尔排序
 * 3个循环
 * 硬编码间隔序列：701，301，132，57，23，10，4，1
 * 动态间隔序列：
 */
function shellSort(_array: number[]) {
  // 动态间隔
  const len = _array.length;
  let h = 1;
  while (h < len / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = h; i < len; i++) {
      for (let j = i; j >= h && _array[j] < _array[j - h]; j -= h) {
        swap(_array, j, j - h);
      }
    }
    h = (h - 1) / 3;
  }
}

const myNum = new CArray(100000);
myNum.upset();
myNum.sort(shellSort);
