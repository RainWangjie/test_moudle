import CArray, { swap, Time } from './CArray';

/**
 * 冒泡排序
 * 2层嵌套循环
 */
function bubbleSort(_array: number[]) {
  const len = _array.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (_array[i] > _array[j]) {
        swap(_array, i, j);
      }
    }
  }
}

const myNum = new CArray(10000);
myNum.upset();
myNum.sort(bubbleSort);
