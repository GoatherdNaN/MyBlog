使用 cnpm 安装 axios

> cnpm install axios -S

安装其他插件的时候，可以直接在 main.js 中引入并 Vue.use()，但是 axios 并不能 use，只能每个需要发送请求的组件中即时引入。

为了解决这个问题，有两种开发思路，一是在引入 axios 之后，修改原型链，二是结合 Vuex，封装一个 aciton。
#### 方案一：改写原型链
首先在 main.js 中引入 axios

```
import axios from 'axios'
```

这时候如果在其它的组件中，是无法使用 axios 命令的。但如果将 axios 改写为 Vue 的原型属性，就能解决这个问题


```
Vue.prototype.$ajax = axios
```

在 main.js 中添加了这两行代码之后，就能直接在组件的 methods 中使用 $ajax 命令

```
methods: {
  submitForm () {
    this.$ajax({
      method: 'post',
      url: '/user',
      data: {
        name: 'wise',
        info: 'wrong'
      }
   })
}
```
#### 方案二：在 Vuex 中封装
Vuex 的仓库是 store.js，将 axios 引入，并在 action 添加新的方法。

```
// store.js
import Vue from 'Vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    test01: {
      name: 'Wise Wrong'
    },
    test02: {
      tell: '12312345678'
    }
  },
  actions: {
    // 封装一个 ajax 方法
    saveForm (context) {
      axios({
        method: 'post',
        url: '/user',
        data: context.state.test02
      })
    }
  }
})

export default store
```
###### 注意：即使已经在 main.js 中引入了 axios，并改写了原型链，也无法在 store.js 中直接使用 $ajax 命令，换言之，这两种方案是相互独立的
在组件中发送请求的时候，需要使用 this.$store.dispatch 来分发

```
methods: {
<!--submitForm 是绑定在组件上的一个方法，将触发 saveForm，从而通过 axios 向服务器发送请求-->
  submitForm () {
    this.$store.dispatch('saveForm')
  }
}
```
上面封装的方法中，使用了 axios 的三个配置项，实际上只有 url 是必须的，为了方便，axios 还为每种方法起了别名，比如上面的 saveForm 方法等价于：

```
axios.post('/user', context.state.test02)
```
完整的请求还应当包括 .then 和 .catch

```
<!--当请求成功时，会执行 .then，否则执行 .catch-->
.then(function(res){
  console.log(res)
})
.catch(function(err){
  console.log(err)
})
```




