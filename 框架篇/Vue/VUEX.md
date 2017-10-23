> 它将组件共享的数据状态抽取出来，以一个全局单例模式管理，它所提供的单向数据流使得组件之间的状态变得很容易维护。

![image](C:\Users\edlan\Desktop\vuex.png)

上面的数据流向图表示：

- 整个store中的数据定义在一个state中
- 可以通过getters对state中的数据进行读取
- state中的数据只能通过mutations进行更改
- 在actions中可以提交mutations，而且在actions中可以完成异步操作
### store.js
store.js作为vuex的核心文件，从这个文件中export出一个vuex实例

```
import Vue from 'vue'
import Vuex from 'vuex'

//引入getters与actions
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

//注册vuex
Vue.use(Vuex)  

//定义各组件需要进行通信的数据
const state = {
    show: 'hot',
    loginway: 'login',
    hotArticles: [{
        author: '小熊猫',
        title: '每天努力多一点点',
        time: '大约6小时前',
        read: '7231',
        comment: '247',
        like: '2341',
        pay: '2',
        src: 'url(../../static/images/vue-demo-hot.jpg)'
    }, {
        author: '大熊猫',
        title: '每天前进一点点',
        time: '大约6小时前',
        read: '7231',
        comment: '247',
        like: '2341',
        pay: '2',
        src: 'url(../../static/images/vue-demo-hot.jpg)'
    }]
}

//导出vuex的实例，其中包含state，mutations，getters，actions
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
```
### getters.js
getters.js用来获取state中的数据，可以认为是store中的计算属性，每个方法都会接收一个state对象作为参数

```
export const getShow = state => state.show

export const getArticles = state => state.articles

export const getTopicArticles = state => state.topicArticles

export const getBonus = state => state.texts

export const getLoginway = state => state.loginway

export const getArticleFlag = state => state.articleFlag
```
### mutations.js
mutations.js用于修改state中的数据状态，vuex中的mutations类似于事件，每个mutation都有一个字符串的事件类型（type）和一个回调函数（handler）。在其回调函数中接收state作为第一个参数，还可以传入额外的参数，称为载荷（payload）。

不能直接调用一个mutation的handler，而是应该用commit方法去触发该mutation。

```
export default {
    DISPLAY_ARTICLES (state, type) {
        state.show = type
        state.articles = state[type + 'Articles']
    },
    DISPLAY_TOPIC (state, type) {
        state.show = type
        state.topicArticles = state[type + 'TopicArticles']
    },
    SORT_CONTENT (state, type) {

    },
    CHANGE_LOGINWAY (state, loginway) {
        state.loginway = loginway
    },
    CHANGE_ARTICLEFLAG (state, flag) {
        state.articleFlag = flag
    }
}
```
### actions.js
Action提交的是mutation，而不是直接更改数据状态，而且在Action中可以包含任意的异步操作。Action函数接收一个与store实例具有相同方法和属性的context对象，因此可以调用context.commit提交mutation，或者通过context.getters，context.state来获取store的getters和state。

Action通过store.dispatch方法触发，由于mutation必须同步执行的限制，所以如果需要执行异步操作用Action将会非常方便

```
export const displayArticles = ({commit},type)=> {
    commit('DISPLAY_ARTICLES', type)
}

export const displayTopic = ({commit},type)=> {
    commit('DISPLAY_TOPIC', type)
}

export const sortContent = ({commit},type)=> {
    commit('SORT_CONTENT', type)
}

export const changeLoginway = ({commit}, loginway)=> {
    commit('CHANGE_LOGINWAY', loginway)
}

export const changeArticleFlag = ({commit}, flag)=> {
    commit('CHANGE_ARTICLEFLAG', flag)
}
```
### vuex在组件中的调用
- App.vue

```
<script>
  //在vuex2.0中提供mapGetters用于获取getters中的内容，接收一个key: value类型的对象
  import { mapGetters } from 'vuex'

  export default {
      data () {
          return {
              show: 'home'
          }
      },
      //mapGetters接收的参数表示，页面上定义的变量articleFlag通过getters的getArticleFlag方法来获取
      computed: mapGetters({
          articleFlag: 'getArticleFlag'
      }),
      methods: {
           //每个组件可以通过this.$store获取vuex的store，然后可以通过dispatch方法来触发一个action，
           //在action中接收一个loginway参数
          changeLoginway (loginway) {
              this.$store.dispatch('changeLoginway', loginway)
          }
      }
  }
</script>
```
- Home.vue

```
<script>
   import { mapGetters } from 'vuex'

   export default {
       //mapGetters中接收的参数表示，在页面上定义的show参数通过getters的getShow方法来获取
       computed: mapGetters({
           show: 'getShow'
       }),
       methods: {
           //该方法表示触发store的actions中的displayArticles
           displayArticles (type) {
               this.$store.dispatch('displayArticles', type)
           }
       },
       //页面加载完后，触发store的actions中的displayArticles和changeArticleFlag
       mounted () {
           this.$store.dispatch('displayArticles', 'hot')
           this.$store.dispatch('changeArticleFlag', true)
       }
   }

</script>
```
- ArticleList.vue

```
<script>
  import { mapGetters } from 'vuex'

  export default {
      //计算属性articles通过store的getters中的getArticles方法获取
      computed: mapGetters({
          articles: 'getArticles'
      }),
      mounted () {
          this.$store.dispatch('changeArticleFlag', true)
      }
  }

</script>
```






