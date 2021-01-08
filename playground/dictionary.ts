class Dictionary {
  datasource: string[] = [];

  add(key: string, value: string | number) {
    this.datasource[key] = value;
  }

  remove() {}

  find(key: string) {
    return this.datasource[key];
  }

  showAll() {}
  sort() {}
  clear() {}
}

const dic = new Dictionary();

dic.add('me', 1);
console.log(dic.find('me'));
