/// <reference lib="dom" />

// const a: any = { b: 3 };

// function foo(obj) {
//   obj.b = 5;

//   return obj;
// }

// const aa = foo(a);

// console.log(a.b);

// console.log(aa.b);

function Ofo() {}

function Bick() {
  this.name = 'mybick';
}

var myBick = new Ofo();

Ofo.prototype = new Bick();

var youbick = new Bick();

console.log(myBick.name);
console.log(Ofo.prototype.name);
console.log(youbick.name);
