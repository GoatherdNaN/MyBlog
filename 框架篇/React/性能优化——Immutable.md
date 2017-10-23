> 为了新建一个对象，我们在原对象的基础上进行了深度拷贝，然后改变新对象的值，深度拷贝的坏处很明显，对象越复杂，性能开销越大，而Immutable.js能通过不可变对象来避免这个问题
###### shouldComponentUpdata

```
import { is } from 'immutable';
shouldComponentUpdate: (nextProps, nextState) => {
  return !(this.props === nextProps || is(this.props, nextProps)) ||
         !(this.state === nextState || is(this.state, nextState));
}
```
###### setState

```
getInitialState() {
    return {
      data: Map({ times: 0 })
    }
  },
  handleAdd() {
    this.setState(({data}) => ({
      data: data.update('times', v => v + 1) })
    });
  }
```

