import CArray, { swap } from './CArray';

/**
 * 选择排序
 * 2层嵌套循环
 */
function selectSort(_array: number[]) {
  const len = _array.length;
  for (let outer = 0; outer < len - 1; outer++) {
    let min = outer;

    for (let inner = outer + 1; inner < len; inner++) {
      if (_array[inner] < _array[min]) {
        min = inner;
      }
    }
    swap(_array, outer, min);
  }
}

const myNum = new CArray(100000);
myNum.upset();
myNum.sort(selectSort);
