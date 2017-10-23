
```
class NewArray extends Array {
  constructor(...args) {
    // 调用父类Array的constructor()
    super(...args)
  }
  push (...args) {
    console.log('监听到数组的变化啦！');

    // 调用父类原型push方法
    return super.push(...args)
  }
  // ...
}

let list3 = [1, 2];

let arr = new NewArray(...list3);
console.log(arr)
// (2) [1, 2]

arr.push(3);
// 监听到数组的变化啦！
console.log(arr)
// (3) [1, 2, 3]
```
