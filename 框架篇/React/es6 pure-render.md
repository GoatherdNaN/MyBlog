1. 安装
```
npm install pure-render-decorator -S
```
2. 使用

```
import {Component} from 'react';
import pureRender from 'pure-render-decorator';
 
@pureRender
export default class Test extends Component {
  render() {
    return <div />;
  }
}
```


