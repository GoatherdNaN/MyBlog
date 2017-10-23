## Reacts介绍
> React 是Facebook推出的一个用于构建UI（用户界面）的 Javascript库。很多人认为 React 是 MVC 中的 V（视图）。       
> React主要解决一个问题：构建随着时间数据“不断变化”的“大规模”应用程序。
### React的优点
- **React速度很快**     
它引入了一个叫做虚拟DOM的概念，安插在JavaScript逻辑和实际的DOM之间。
这一概念提高了Web性能。在UI渲染过程中，React通过在虚拟DOM中的微操作来实对现实际DOM的局部更新。

- **跨浏览器兼容**      
虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。

- **组件化**        
为你程序编写独立的模块化UI组件，这样当某个或某些组件出现问题是，可以方便地进行隔离。
每个组件都可以进行独立的开发和测试，并且它们可以引入其它组件。这等同于提高了代码的可维护性。

- **单向数据流让事情一目了然**      
Flux是一个用于在JavaScript应用中创建单向数据层的架构，它随着React视图库的开发而被Facebook概念化。它只是一个概念，而非特定工具的实现。它可以被其它框架吸纳。例如，Alex Rattray有一个很好的Flux实例，在React中使用了Backbone的集合和模型。
### React入门
###### 方式一：使用 <script>引入react（入门学习）

```
<!--引入react文件-->
<script src="https://npmcdn.com/react@15.3.1/dist/react.min.js"></script>
<!--引入react-dom文件-->
<script src="https://npmcdn.com/react-dom@15.3.1/dist/react-dom.min.js"></script>
<!--引入bower.js以支持jsx语法-->
<script src="../build/browser.min.js"></script>
<!--html:创建接受组的容器-->
 <div id="app"></div>
 <!--jsx部分,text/babel声明其语法-->
 <script type="text/babel">
    ...
    ReactDOM.render(
        <MyContainer/>,
        document.getElementById('app')
    );
 </script>
```
###### 方式二：使用npm和webpack (官方推荐)
- **安装依赖包**
1. 新建一个项目（或已有项目）
2. 创建package.json配置
> npm init--yes
3. 安装react需要的依赖包和babel环境
> cnpm install --save react react-dom babel-preset-react babel-preset-es2015 babel-loader babel-core
4. 创建babel 配置文件 .babelrc

```
{ 
	"presets": ["react","babel-preset-es2015"]  //react和es2015编译
}
```
- **使用**
1. 新建一个js文件
```
var React = require('react');
var ReactDOM = require('react-dom');
ReactDOM.render(
	<h1>Hello World</h1>,
	document.getElementById("root")
);
```
2. 使用webpack打包

```
webpack index.js bundle.js --module-bind "js=babel-loader"  //官方文档是单引号，呵呵用不了。bundle.js是最终打包后的文件
```
3. 页面中引用bundle.js
4. Dos中运行webpack命令运行

###### 方式三：yeoman脚手架
1. 安装yeoman
> npm install -g yo
2. 安装react-webpack模板
> npm install -g generator-react-webpack
3. 使用yo创建项目       
创建一个空目录，在该目录文件夹下(shift+鼠标右键，进入DOS)，然后执行以下命令:
> yo react-webpack (自动创建项目结构和文件)
安到查不到换cnpm i是明智之选
4. 删除多余文件，src目录下只保留index为文件名的俩文件
5. 运行npm run 可以查看任务列表     
> npm start 启动服务器      
> npm run clean 清空dist目录        
> npm run lint  js语法验证      
> npm run dist 打包发布

修改下cfg/dist.js

```
new webpack.optimize.UglifyJsPlugin({
    	compress: {
	        warnings: false
	    }
})
```
###### 扩展：debugger断点
### JSX
> JS中的html部分就是JSX，需注意，JSX是可选的，它只是一个语法糖
#### JSX 与 HTML 的差异
1. 渲染HTML标签，声明变量采用 首字母小写，如：div / input / button。
而渲染React组件，声明变量采用 首字母大写，如：MyButton  MyDataList。      
React 的 JSX 使用大写和小写字母来区分本地的组件类和 HTML 标签。  
2. class 和 for 这两个属性，JSX语法最终是要被转换为纯Javascript的，所以要和在Javascript DOM中一样，用 **className** 和 **htmlFor** 。 （关键字）
#### JSX表达式
###### 普通取值

```
var url = 'http://www.itsource.cn';
<a href={url}>源码时代</a>
```
###### 三目运算 （不能使用if）

```
<div className={2 > 1 ? 'class-a' : 'class-b'}>content</div>
```
创建HTML标准内的元素时，JSX转化器会丢弃那些非标准的属性，如果一定要添加自定义属性，那么需要在这些自定义属性之前添加 data- 前缀。

```
<div data-custom-attribute="foo" />
```
###### 属性延伸

```
var props = {name:'username',type:'text'};
var input = <input {...props} value='二狗' />// 等效于<input name=’username’ type=’text’ value=’二狗’>
```
用到属性延展，一般会灵活的去使用**Object.assign(target, ...sources)**方法
> Object.assign(target, ...sources)

```
import assign from 'object-assign';<!--引入-->
var options= {};
assign(options,this.props);
if(!options.amStyle){<!--如果该属性不存在，就添加条默认的-->
	options.amStyle = 'secondary';
}
```


###### 样式属性
JSX把style当成对象来处理，所以style不能直接写成style=’color:red,background-color:yellow’

```
var styles = {color:'red',backgroundColor:'yellow'};
var div = <div style={styles}>一个div</div>

var div = <div style={{color:'red',backgroundColor:'yellow'}}>一个div</div><!--注意是两个{{}}，外括号为表达式，内花括号为json对象。-->
```
### JSX注意点
- JSX元素必须要用一个tag 包裹起来

```
var view = <div>第一个</div><div>第二个</div>; //错误的，必须被一个包裹。
var view=<div><div>第一个</div><div>第二个</div></div>//正确。
```


- JSX方式创建出来对象，并不是一个HTML中DOM，而是一个虚拟DOM。
React.createElement() 与document.createElement()创建出来的对象，是两种截然不同的对象。

- React的普通标签的事件名，采用on+事件名，click及为onClick, change为onChange。（驼峰命名法）
### 组件开发




