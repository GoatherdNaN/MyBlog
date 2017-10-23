### vue-cli ：vue脚手架
###### 功能：建立基本项目结构，跟express-generator类似，其本身集成很多项目模板：
1. simple		个人觉得一点用都没有，相当于插件的Demo
2. webpack	一般大型项目中使用，集成功能较多，如下列两个功能:
> 1. Eslint 检查代码规范
> 2. 单元测试
3. webpack-simple	推荐使用, 比webpack少了Eslint功能，用的较多
4. browserify	
5. browserify-simple
---
###### 基本使用流程
1. 安装 vue命令环境，验证安装成功与否，用vue --version命令
>  npm install vue-cli -g	
2. 生成项目模板     
> vue init <模板名> 本地文件夹名称
3. **在生成目录下**，运行下列命令来安装package中所列依赖包
> npm install
4. 运行项目
>  npm run dev
---
###### 与vue-loader的配合
vue-loader：使.vue文件能够被识别的编译工具
1. 下载vue-router模块
```
cnpm install vue-router@0.7.13  <!--指定版本(c)npm用@+版本号，bower用#+版本号-->
```
2. 引入模块
```
<!--在main.js下引入依赖的模块-->
import Vue from 'vue'
import App from './App'
<!--在总路由(App.vue)中引入你的分路由(模块)-->
import News from './components/News.vue'    <!--分路由News.vue中就是分路由的模板代码-->
```


3. 路由挂载

```
Vue.use(VueRouter);
```
4. 配置路由
```
var router=new VueRouter();
router.map({
<!--路由规则-->
})
```

5. 开启

```
router.start(App,'#app');
```

```
<!--************************注意！！！！！！！**************************-->
<!--之前是直接在html中使用<app></app>，现在是如下方式，即用id来写的方式-->
<template>
  <div id="app">
    <h3>welcome Vue-webpack</h3>
    <strong>{{msg}}</strong>
    <News></News>
  </div>
</template>
```
***
###### 扩展：
- 每个vue文件代码都有三个块，即：     
> 1. <template></template>
> 2. <script></script>
> 3. <style></style>

其中，<script></script>代码书写方式如下：

```
<script>
    import News from './components/News.vue' <!--引入子模块(路由)-->
    export default{ <!--相当于大(父)路由-->
      data () {
        return {
          msg: '我是数据'
        }
      },
      components: {
        News    <!--直接写上面引入子路由时import后的名字-->
      }
    }
</script>
```
- loader是什么？  
> 模块和资源的转换器，也叫加载器。它本身是一个函数，运行在node.js环境中，接受源文件作为参数，返回转换的结果。从而使我们可以通过require来加载任何类型的模块或文件，比如VUE、JSX、SASS 或图片。                
如：css-loader、url-loader、html-loader，ES6加载器babel-loader

- package.json中的配置一角

```
"dev": "webpack-dev-server --inline --hot --port 8084",<!--hot:热启动，即无刷新更新页面；port：端口号-->
```


