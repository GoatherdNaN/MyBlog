> 混合以一种灵活的方式为组件提供分布复用功能。混合对象可以包含任意的组件选项。当组件使用了混合对象时，混合对象的所有选项将被“混入”组件自己的选项中。

```
<!--BaseMixins.js-->
export default {
    created: {
        this.hello();
    },
    methods: {
        hello() {
            alert('你好');
        }
    }
}
<!--组件中-->
import BaseMixins from '../xxx/BaseMixins.js'
export default {
    minixs:[BaseMixins],
    ....
}
```
######  混合与Vue同名冲突
混合对象与组件包含同名选项时，这些选项将以适当的策略合并。例如，同名钩子函数被并入一个数组，因而都会被调用。另外，混合的钩子将在组件自己的钩子之前调用。