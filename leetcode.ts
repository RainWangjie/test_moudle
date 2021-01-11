function rotate(nums: number[], k: number): void {
  const len = nums.length;
  const _k = k % len;
  if (_k === 0) {
    return;
  }

  for (let i = 0; i < _k; i++) {
    let temp = nums[i];
    for (let j = i; j < len; j = j + _k) {
      const next = (j + _k) % len;
      console.log(`交换${j}:${temp},${next}:${nums[next]},暂存${nums[next]}`);
      let _t = nums[next];
      nums[next] = temp;
      temp = _t;
    }
  }
  console.log(nums);
}
rotate([1, 2, 3, 4, 5, 6, 7], 3);
