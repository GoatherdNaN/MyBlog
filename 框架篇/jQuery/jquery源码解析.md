[点击查看详情](http://www.cnblogs.com/coco1s/p/5261646.html)
## jQuery 闭包结构

```
// 用一个函数域包起来，就是所谓的沙箱
// 在这里边 var 定义的变量，属于这个函数域内的局部变量，避免污染全局
// 把当前沙箱需要的外部变量通过函数参数引入进来
// 只要保证参数对内提供的接口的一致性，你还可以随意替换传进来的这个参数
//在代码压缩的时候，window 和 undefined 都可以压缩为 1 个字母并且确保它们就是 window 和 undefined。
(function(window, undefined) {
   // jQuery 代码
})(window);
```

![image](http://images2015.cnblogs.com/blog/608782/201603/608782-20160311094843022-2127919395.png)