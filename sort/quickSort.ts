import CArray, { swap } from './CArray';

/**
 * 快速排序
 * 2个循环
 */
function quickSort(_array: number[]) {
  if (_array.length === 0) {
    return [];
  }
  let lesser: number[] = [];
  let greater: number[] = [];
  const pivot = _array[0];
  for (let i = 1; i < _array.length; i++) {
    if (_array[i] < pivot) {
      lesser.push(_array[i]);
    } else {
      greater.push(_array[i]);
    }
  }

  return quickSort(lesser).concat(pivot, quickSort(greater));
}

const myNum = new CArray(100000);
myNum.upset();
myNum.sort(quickSort);
