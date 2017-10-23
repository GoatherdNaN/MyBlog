> Webpack 是前端模块化管理和打包工具。它可以将许多松散的模块按照*依赖和规则*打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。
### webpack特点
- **代码拆分**      
> Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

- **Loader**
> Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

- **智能解**析
> Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。

- **插件系统**
> Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。

- **快速运行**
> Webpack 使用异步 I/O （NodeJs）和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。
---
### webpack安装上手
1. **全局安装webpack**

```
npm i webpack -g    <!--webpack version-->
```
2. **新建项目（文件夹），npm init 初始化package.json包配置文件**
3. **进到项目目录下，本地再安装一次**

```
npm i webpack --save-dev   <!--webpack+@版本号可以指定版本-->
```
4. **建立主文件模块main.js,使用依赖**

```
//导入b模块
var printMsg = require("./b");
//使用b模块
printMsg("明天会更好");
//b.js 模块
define(function(){
    return function(msg){
        console.log("b 模块："+msg);
    }
});
```
---
### webpack.config.js配置
> 1. 配置文件就是一个模块
> 2. 配置“入口”文件
> 3. 配置“输出”文件
> 4. 直接在配置文件所在目录，命令行执行： webpack（它会自动读取配置文件）
---
###### 安装loader
> npm install 加载器名 --save-dev

注意：配置一个加载器可能用到多个loader，这时直接用空格隔开一起安装，如：
> npm install css-loader style-loader --save-dev  （style文件加载器）
---
###### webpack-dev-server服务器
基于express的一个服务器，并且提供热加载功能，方便我们开发。
- **安装webpack-dev-server（两次）**
> npm install webpack-dev-server -g     
npm install webpack-dev-server //本地安装
- **执行**
> webpack-dev-server --hot --inline;
---
###### 插件
> http://webpack.github.io/docs/list-of-plugins.html（插件列表地址）
---
###### 异步加载模块

```
require.ensure(
    dependencies: String[],    // 依赖
    callback: function([require]),  // 回调
    [chunkName: String]) // 额外抽取的块的名称
)
//下面来一个该写法的实例
require.ensure(["./message"],function(message){
    message();
},"xxx");//第三个参数在webpack.config.js的output最后一个参数有对应配置，它会运用到提取的大块的文件名上，如：xxx.bundle.js
```
---
###### webpack.config.js配置详情
```
// 引入webpack模块
var webpack = require('webpack');
// webpack的配置文件，也是一个模块
module.exports = {
    watch : true,// 代码改变的观察者（观察入口文件相关的修改，进行同步编译。
    
    //配置入口
    entry:[
    	"webpack-dev-server/client?http://localhost:8080/", //嵌入开发者服务器（--inline）
    	"webpack/hot/dev-server",   //嵌入热部署，无需刷新页面，自动更新（--hot）
    	"./scripts/a"   //入门文件,项目的主文件
    ],
    
    //配置输出
    output:{
    	path:"static/", //输出的路径
    	filename:"bundle.js"   //输出的文件名
    	,publicPath:"/static/"   //浏览器引用时的输出文件的公共URL地址
    	,chunkFilename:"[name].bundle.js"   //异步块的名称， [name]站位，获取js代码中，定义的chunkName
    }
    // 配置外部模块
    ,module:{
    	loaders:[   // 配置加载器,
    	// 配置一个css加载器
            { 
              test : /\.css$/   // 正则表达式(规定范围)
              ,loader:'style?singleton=true!css'  // 加载器，多个由!连接，加载顺序从右到左，在加载器后面跟上？可以配置参数（singleton:代表开启单个文件生成模式[合并]）
            }
        // less加载器
            ,{
            	test : /\.less$/,
            	loader : 'style?singleton=true!css!less'
            }
        //(图片)文件加载器
            ,{
            	test : /\.(jpg|png|gif)$/,
            	loader : 'url?name=[path]/[name].[ext]&limit=8192' //limit 指的是图片文件的最大字节数，如果超过，则用file-loader，下载无需配置，直接用，这是为了避免主文件臃肿
            }
    	]
    }
    //插件
    ,plugins:[  
        // 热刷新
    	new webpack.HotModuleReplacementPlugin()
        // 最前面的注释信息 
	new webpack.BannerPlugin("webpack 打包制作")
        //压缩插件
	,new webpack.optimize.UglifyJsPlugin({
            comments:false  // 去掉注释
            ,compress:{ //抑制警告
                warnings:false
            }
	})
        // 提取"公共代码"插件，默认会把所有入口节点的公共代码提取出来,生成一个common.js
	,new webpack.optimize.CommonsChunkPlugin('common.js')
        //自动加载模块，模块中使用（key）标识符（比如，$、jQuery）时会自动导入 (jquery模块无需手动require('jquery'))
        //引用外部库，webpack的模块可以使用jquery，但是不会对其打包。需要自己在页面中使用<script>，主要是兼容jquery的插件,因为jquery某些插件并没有采用模块化开发。
 	,new webpack.ProvidePlugin({
             $:"jquery",
             jQuery:"jquery"
 	})
 	
    ]
}
```


