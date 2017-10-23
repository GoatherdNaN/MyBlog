## 一、前言
###### 为什么需要服务端渲染？什么情况下进行服务端渲染？      
当我们要求渲染时间尽量快、页面响应速度快时（优点），才会采用服务器渲染，并且应该“按需”对页面进行渲染 ——“首次加载/首屏”。即服务端渲染的优势在于：由中间层( node端 )为客户端请求初始数据、并由node渲染页面。  
服务端渲染的原理就是通过ReactDOM读取渲染完成的html字符串，然后将字符串替换进现有的服务端文件模版中，最后输出至客户端进行渲染。 这个操作也就是我们将之前的前端渲染逻辑放置在后端进行处理。由于前端技术日新月异，所以，具体将渲染放置在哪一步由具体的业务决定。

[查看资料](http://www.yodfz.com/detail/13/React%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93(SSR).html)
###### 那客户端渲染和服务端渲染有什么差别？服务端渲染究竟快在哪里呢？
## 二、原因与思路
###### 客户端渲染路线：
1. 请求一个html
2. 服务端返回一个html
3. 浏览器下载html里面的js/css文件
4. 等待js文件下载完成 
5. 等待js加载并初始化完成
6. js代码终于可以运行，由js代码向后端请求数据( ajax/fetch )
7. 等待后端数据返回
8. react-dom( 客户端 )从无到完整地，把数据渲染为响应页面
###### 服务端渲染路线：
1. 请求一个html 
2. 服务端请求数据( 内网请求快 )
3. 服务器初始渲染（服务端性能好，较快）
4. 服务端返回已经有正确内容的页面
5. 客户端请求js/css文件
6. 等待js文件下载完成
7. 等待js加载并初始化完成
8. react-dom( 客户端 )把剩下一部分渲染完成( 内容小，渲染快 )
###### 说明：
对同一个组件，服务端渲染“可视的”一部分( render/componentWillMount部分代码  )，为确保组件有完善的生命周期及事件处理，客户端需要再次渲染。即：服务端渲染，实际上也是需要客户端进行 再次地、但开销很小的二次渲染。
###### 时间耗时比较：
1. 数据请求：由服务端请求数据而不是客户端请求数据，这是“快”的一个主要原因。服务端在内网进行请求，数据响应速度快。客户端在不同网络环境进行数据请求，且外网http请求开销大，导致时间差（主要原因）。
2. 步骤：服务端是先请求数据然后渲染“可视”部分，而客户端是等待js代码下载、加载完成再请求数据、渲染。即：服务端渲染不用等待js代码下载完成再请求数据，并会返回一个已经有内容的页面。
3. 渲染性能：服务端性能比客户端高，渲染速度快( 猜测，该项数据不详 )。
4. 渲染内容：服务端渲染会把”可视“部分先渲染，然后交给客户端再作部分渲染。而客户端渲染，则是从无到有，需要经历完整的渲染步骤。
![image](http://images2015.cnblogs.com/blog/896425/201608/896425-20160823183140230-956996613.png)
## 三、注意事项与问题
###### 1. 项目依赖什么？
node端：express、react-dom/server、webpack。前端：React、mobx（一个更好的redux）、React-router、webpack
###### 2. 前端/node端共用那部分代码？
node端/前端有各自的入口文件，server.js/client.js，通过react-router的路由配置文件routes.js作中间层

```
// routes.js
module.exports = (
    <Route path="/" component={ IComponent } >
        <Route path="/todo" component={ AComponent }>
        </Route>
    </Route>
)
```
###### 3. 代码是由前后端共享，那如何分平台地操作不同代码？答：通过webpack。对共享代码，进行不同平台的，webpack(babel)编译，通过在webpack.config.js中加入

```
// webpack.client.config.js
plugins: [
      new webpack.DefinePlugin({
          '__isServer__': false,
          '__isClient__': true
      })
  ]
// webpack.server.config.js
plugins: [
      new webpack.DefinePlugin({
          '__isServer__': true,
          '__isClient__': false
      })
  ]
// xxx.js
if( __isServer__ ) {
   ...
}else { ... }
```
![image](http://images2015.cnblogs.com/blog/896425/201608/896425-20160823195811292-1422162065.png)
###### 4. 组件的生命周期是如何的呢？
componentWillMount( node端 ) --> render( node端 ) --> 客户端生命周期和以前一样
###### 5. 拉取数据后如何处理呢？
先在node端根据数据渲染好，再把数据随页面返回至前端，再由React根据数据进行渲染校对( 若前后端渲染结果不一致将报错 )。应该在componentWillMount让组件进行本地的数据同步

```
// 组件.js
componentWillMount() {
    if( __isClient__ ) {
         this.todoStore.todos = window.initTodos;  
    }
}    
// node端返回
`
<!doctype html>
<html lang="utf-8">
   <head>
   <script> window.initTodo = ${...}</script>
   </head>
   <body> ... </body>
   <script src="/static/vendor.js"></script>
   <script src="/static/client.bundle.js"></script>
  </html>
```
###### 6. 前端/node端“入口文件”通过webpack构建有什么不同？
前端是为了解析JSX与es6代码（包括mobx的es6 decorator），node端除了以上，还需要加入babel-plugin-transform-runtime，是为了在node良好地运行es7 async / awatit
###### 7. 如何保证node端能够先请求数据然后再渲染？
es7的async / await语法
###### 8. 前端的react-router路由与node端路由如何配合？node如何知道该路由是渲染哪个数据呢？
前端是以前的react-router配置，node端是react-router的match/RouterContext

```
// 共享文件routes.js
const routes = (
    <Route path="/" component={ IComponent } >
        <Route path="/todo" component={ AComponent }>
        </Route>
    </Route>
)
// 前端入口文件client.js
render(
    <Router routes={ routes } history={ browserHistory } />,
    ele
)
// node端入口文件server.js
let app = express();
app.get('/todo', (req, res) => {

   match({ routes: routes, location: req.url }, async (err, redirect, props) => {
         // match会帮我们找到要渲染的组件链，注：上面一行使用了async语法，因此可以在render之前使用await运行拉取数据的代码
         let html = renderToString(<RouterContext {...props}  />)
         res.send( indexPage(html) )
    }
})  
// node端返回      
let indexPage = (html)=>{
    return `
    <!doctype html>
        <html lang="utf-8">
            <head>
                <script>
                </script>
            </head>
            <body>
                <section id="hzpapp" >${html}</section>
            </body>
            <script src="/static/vendor.js"></script>
            <script src="/static/client.bundle.js"></script>
        </html>
    `
}
```
###### 9. client.js中是否还能继续使用webpack的require.ensure ?  
可以。但闪白明显，且node端返回html后会有报错，在加载脚本后该错误能忽略。
###### 10. 若我使用的是mobx，该如何实例化store ? 
每一个node请求，都应该返回一个新的独立的store实例，而不是每个node请求共用一个store实例（笔者易犯）。
![image](http://images2015.cnblogs.com/blog/896425/201608/896425-20160823203247870-1027969800.png)