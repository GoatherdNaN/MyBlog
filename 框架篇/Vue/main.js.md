
> main.js作为应用程序脚本文件的主入口，在main.js中引入vue，vue-router，vuex等，并对vue-router进行配置。
```
import Vue from 'vue'   //引入vue
import VueRouter from 'vue-router'   //引入vue-router
import store from '../vuex/store'    //引入vuex的store

Vue.use(VueRouter)     //注册vue-router

//配置路由，部分代码，不同于vue-router1.0，vue-router2.0利用routes参数进行路由配置，
//接收path和component属性组成的对象，子路由采用children参数
const router = new VueRouter({
    routes: [{
        path: '/home',
        component: Home,
        children: [{
            path: 'article/:type',
            component: ArticleList
        }]
    }, {
        path: '/topic',
        component: Topic,
        children: [{
            path: 'topic_article/:type',
            component: topicActicle
        }]
    }]
  ))
  
  var vm = new Vue({
    el: '#app',  //vue实例的根元素
    router,    //在vue实例中,引入定义的路由
    store,    //在vue实例中,引入vuex的store
    render: h=> h(App)    //渲染App组件
})
```
