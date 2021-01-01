// 字典书节点
class TireNode {
  isWord: boolean = false;
  prefix: number = 0;
  // @ts-ignore
  next: TireNode[] = new Array(26).fill(undefined);

  constructor() {}
}

// 字典树
class Tire {
  private root: TireNode = new TireNode();

  // 插入字符
  insert(str: string) {
    if (!this.root || str.length == 0) {
      return;
    }

    let _root = this.root;
    const strLen = str.length;

    str.split('').forEach((word, index) => {
      const wordIndex = word.charCodeAt(0) - 97;
      if (!_root.next[wordIndex]) {
        _root.next[wordIndex] = new TireNode();
      }
      _root = _root.next[wordIndex];
      _root.prefix++;
      strLen === index + 1 && (_root.isWord = true);
    });
  }

  search(str: string) {
    if (!this.root || str.length == 0) {
      return;
    }

    let _root = this.root;

    const flag = str.split('').some((word) => {
      const wordIndex = word.charCodeAt(0) - 97;
      if (!_root.next[wordIndex]) {
        return true;
      }
      _root = _root.next[wordIndex];

      return false;
    });

    return !flag;
  }

  searchPrefix(str: string) {
    if (!this.root || str.length == 0) {
      return;
    }

    let _root = this.root;
    let prefixNum = 0;

    const strLen = str.length;
    str.split('').some((word, index) => {
      const wordIndex = word.charCodeAt(0) - 97;
      if (!_root.next[wordIndex]) {
        return true;
      }

      _root = _root.next[wordIndex];

      if (index + 1 === strLen) {
        prefixNum = _root.prefix;
      }
      return false;
    });

    return prefixNum;
  }
}

const tireTree = new Tire();

tireTree.insert('hello');
tireTree.insert('hel');
tireTree.insert('hella');
tireTree.insert('helloworld');

console.log(tireTree.search('hello'));
console.log(tireTree.search('hellr'));
console.log(tireTree.searchPrefix('hel'));
console.log(tireTree.searchPrefix('hell'));
