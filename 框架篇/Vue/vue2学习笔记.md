### vue-cli
> vue init webpack projectName(建议，也可以用vue list查看更多的模板)
### 过滤器
内置过滤器移除了，用以下方式定义

```
//将时间戳转化为本地时间格式
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default{
    //...省略
    filters:{
        date(val){
            return moment(val).calendar()
        }
    }
}
//在template中使用
{{time | date}}
```


