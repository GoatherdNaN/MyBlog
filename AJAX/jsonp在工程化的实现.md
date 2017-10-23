1. 安装jsonp
```
npm i jsonp -S
```
2. 项目中

```
import jsonp from 'jsonp'
...
<!--跟正常$.get和$.post一样写参数就行，这里列举get-->
jsonp(url?xx=xx,(err, res)=>{...})
```
