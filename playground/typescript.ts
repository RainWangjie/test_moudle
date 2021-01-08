/// <reference lib="dom" />

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// * Pick
type TodoPreviewPick = Pick<Todo, 'title' | 'completed'>;

// * Omit
type TodoPreview = Omit<Todo, 'description'>;

// * Parameters<Type>
declare function f1(arg: { a: number; b: string }): void;
type T1 = Parameters<(s: string) => void>;
type T3 = Parameters<typeof f1>;

// * ReturnType<Type>
declare function f2(): { a: number; b: string };

type T0 = ReturnType<() => string>;
type T4 = ReturnType<typeof f2>;

// * InstanceType<Type>
class C {
  x = 0;
  y = 0;
}

class C_C extends C {}

type I0 = InstanceType<typeof C>;
type I1 = InstanceType<typeof C_C>;

// * Required<Type>
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5, b: '1' };

// * ThisParameterType<Type>
// * OmitThisParameter<Type>
// * ThisType<Type>

// * 装饰器 Decorator

function testable(isTestable: boolean) {
  return function (target) {
    target.isTestable = isTestable;
  };
}

@testable(true)
class MyTestableClass {}

// MyTestableClass.isTestable; // true

function f() {
  console.log('f(): evaluated');
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called');
  };
}

function g() {
  console.log('g(): evaluated');
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called');
  };
}

class C_Decorator {
  @f()
  @g()
  method() {}
}

// * Set
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter((x) => !b.has(x)));
// Set {1}
