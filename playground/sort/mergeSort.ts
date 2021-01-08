import CArray, { swap } from './CArray';

/**
 * 归并排序
 *
 */
function mergeSort(_array: number[]) {
  if (_array.length < 2) {
    return;
  }

  let step = 1;
  let left: number, right: number;
  while (step < _array.length) {
    left = 0;
    right = step;
    while (right + step <= _array.length) {
      mergeArray(_array, left, left + step, right, right + step);
      left = right + step;
      right = left + step;
    }
    if (right < _array.length) {
      mergeArray(_array, left, left + step, right, _array.length);
    }
    step *= 2;
  }
}

function mergeArray(
  _array: number[],
  startLeft: number,
  stopLeft: number,
  startRight: number,
  stopRight: number
) {
  const rightArr = new Array(stopRight - startRight + 1);
  const leftArr = new Array(stopLeft - startLeft + 1);

  let k = startRight;
  for (let i = 0; i < rightArr.length - 1; i++) {
    rightArr[i] = _array[k];
    k++;
  }

  k = startLeft;
  for (let i = 0; i < leftArr.length - 1; i++) {
    leftArr[i] = _array[k];
    k++;
  }
  rightArr[rightArr.length - 1] = Infinity;
  leftArr[leftArr.length - 1] = Infinity;

  let m = 0,
    n = 0;

  for (k = startLeft; k < stopRight; k++) {
    if (leftArr[m] <= rightArr[n]) {
      _array[k] = leftArr[m];
      m++;
    } else {
      _array[k] = rightArr[n];
      n++;
    }
  }
  //   console.log('left:', leftArr);
  //   console.log('right:', rightArr);
  //   console.log('array:', _array);
}

const myNum = new CArray(10);
myNum.upset();
myNum.sort(mergeSort);
