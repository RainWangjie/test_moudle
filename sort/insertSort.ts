import CArray, { swap } from './CArray';

/**
 * 插入排序
 * 2个循环
 */
function insertSort(_array: number[]) {
  const len = _array.length;
  for (let outer = 0; outer < len - 1; outer++) {
    const temp = _array[outer];
    let inner = outer;
    while (inner > 0 && _array[inner - 1] >= temp) {
      _array[inner] = _array[inner - 1];
      inner--;
    }
    _array[inner] = temp;
  }
}

const myNum = new CArray(10000);
myNum.upset();
myNum.sort(insertSort);
