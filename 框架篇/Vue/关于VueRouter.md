
### routes.js
```
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入组件
import Main from './Main.vue'
import Home from './Home.vue'
import Explorer from './Explorer.vue'
import Cart from './Cart.vue'
import Me from './Me.vue'
//使用路由实例插件
Vue.use(VueRouter)

export default  = new VueRouter({
  mode:'history',
  base:__dirname,
  linkActiveClass:"active",//激活的自动添加类名active
  routers: [
    {
        name:'Main',
        path:'/',
        component:Main,
        children:[
            {name:'Explorer',path:'explorer',component:Explorer},
            {name:'Cart',path:'cart',component:Cart},
            {name:'Me',path:'me',component:Me}
        ]
    },
    {name:'BookDetails',:'/books/:id',component:BookDetails  }
  ]
})
```
### <router-link>

```
//tag属性将<router-link>标签生成别的标签,激活状态的精确匹配加上exact属性
<router-link to="{name:'Home'}" tag="li" exact>
    //……
</router-link>

<!--关于history的控制-->

<router-link to="{name:'Home'}">
   <!-- 默认的push：每次的改变会被保留到history中-->
</router-link>
<router-link to="{name:'Home'}" append>
    <!--append模式：如从/a切换到一个相对路径b,没设置append,为/b，设置了为/a/b-->
</router-link>
<router-link to="{name:'Home'}" replace>
    <!--replace：以目标url替换掉现在的url,导航后不会留下history记录
</router-link>
```
### <router-view>
渲染路径匹配到的视图组件
### 动态路由

```
<!--routes.js-->
routers: [{
    name:'BookDetails',
    path:'/books/:id',
    component:BookDetails  
}]

<!--组件中-->
<router-link to="{name:'BookDetails',params:{id:1}}" tag="li">
    //……
</router-link>

<!--如果要讲该params在组件中读出来-->
export default{
    created(){
        const bookId=this.$router.params.id
    }
}

<!--
注意，当复用路由时，created、mounted等钩子函数在页面第二次加载时将失败
，要想路由参数跟着改变，则需要进行如下操作-->
export default{
    template:'...',
    watch:{
        '$route' (to,from) {
            <!--对路由做出反应-->
        }
    }
}
```
### 路由切换动画

```
<template>
  <transition name="slide-fade">
  <!--keep-alive可以缓存数据，这样不至于重新渲染路由组件的时候，之前那个路由组件的数据被清除了。-->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </transition>
</template>
<style>
  .slide-fade-enter-active{
    transition:all .3s ease;
  }
  .slide-fade-leave-active{
    transition:all .3s cubic-bezier(1.0,0.5,0.8,1.0);
  }
  .slide-fade-enter,.slide-fade-leave-active{
    transform:translateX(-430px);
    opacity:0;
  }
</style>
```
### 其他小需求
###### 不同路由不同页面标题
多页面应用我们可以给每一个页面都设置一个不同的标题，但是如果是单页面应用的路由呢？其实也是可以实现的，实现的方法不止一种，我之前用的是结合命名路由和导航钩子函数的方法。如下：

```
// 定义路由的时候如下定义，name也可为中文
const routes = [
  { path: '/goods', component: goods, name: 'goods' },
  { path: '/ratings', component: ratings, name: 'ratings' },
  { path: '/seller', component: seller, name: 'seller' }
];
// 创建路由实例
const router = new VueRouter({
  routes: routes
})
// 关键在这里，设置afterEach钩子函数
router.afterEach((to, from, next) => {
  document.title = to.name;
})
```
###### 进入应用就渲染某个路由组件
1. 重定向

```
const routes = [
  { path: '/', redirect: '/goods'}
]
```

2. 利用vue-router的导航式编程的router.push方法也可以实现上面的需求。

```
// 在创建vue实例并挂载后调用
router.push('/goods')
```


