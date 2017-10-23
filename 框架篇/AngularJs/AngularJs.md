> Angular.JS是一个开源的JavaScript框架，最适于开发客户端的单页面应用。它实现了前端MVC架构，专注于扩展HTML功能，提供动态数据绑定（Data Binding），且能与其它框架（如jQuery）合作融洽。
### angular模块
> 一个模块可以作为您的应用程序的不同部分的容器。比如：控制器、服务、过滤器、指令统统都属于某个模块。angular组件都位于模块中。
###### 用处
- 保持全局命名空间的清洁；
- 编写测试代码更容易，并能保持其清洁，以便更容易找到互相隔离的功能；
- 易于在不同应用间复用代码；
- 使应用能够以任意顺序加载代码的各个部分。
###### 定义一个angular模块
- 参数一: 定义的angular模块名称
- 参数二: 引入依赖的模块
> var app = angular.module("myapp",[]);
###### 获取模块(主要在其他页面需要myapp模块时，使用)
> var app = angular.module("myapp");
###### 运行一个模块（全局）
> app.run(function(依赖的服务，如：$scope){  业务代码   }
---
### 作用域scope
> 作用域包含了渲染视图时所需的功能和数据，它是所有视图的唯一源头。可以将作用域理解成视图模型（view model）。
###### 主要分为两个：
$rootScope 全局作用域、$scope 局部作用域
###### 主要功能
- 提供｛观察者以"监视"数据模型的变化；
- 可以将数据模型的变化通知给整个应用，甚至是系统外的组件；
- 可以进行嵌套，隔离业务功能和数据；
- 给表达式提供运算时所需的执行环境。
###### 作用域取值和设置
- 取值：  “就近原则”，跟js全局作用域和局部作用域关系类似
- 设值： “最小范围影响”，只会影响到当前控制器的局部作用域（当前有则改，无则设）
---
### 过滤器filter
###### 内置过滤器
- currency 货币格式
    
```
{{8000 | currency:'￥' }}<!--默认情况下会采用客户端所处区域的货币符号，但是也可以自定义货币符号。-->
```
- date 日期格式

```
{{now | date:'yyyy年MM月dd HH:mm:ss'}}
```
- json 格式化

```
{{ person | json }}   //person={name:”张二蛋”,age:20}
```
- limitTo 截取

```
<!--传入参数的正负值可以控制从前面还是从后面开始截取-->
{{"abcdefg"|limitTo:2}}     <!--ab-->
{{[2,39,12,49,39]|limitTo:-3}}   <!--[12,49,39]-->
```
- lowercase 小写
- uppercase 大写
- number 数字

```
{{'1234567.845278' | number:1}}<!--1,234,567.8-->
{{'1234567.845278' | number:-1}}<!--1,234,570-->
```
- orderBy 排序

```
{{employees | orderBy:"age":true}}<!--按照age排，升序-->
{{numArr | orderBy:"-":true}}<!--降序再升序-->

```
###### 自定义过滤器

```
<!--首字母大写过滤器-->
app.filter("myFilter",function(){
    return function(input){<!--返回一个处理格式化的函数，直到这里都是固定写法-->
        return input.substr(0,1).toUpperCase() + input.substr(1); <!-- 返回值代表过滤器处理的结果-->
    }
});
```
---
### angular指令（部分）
> AngularJS 指令是扩展的 HTML 属性，带有前缀 ng-。
#### 自带指令
###### ng-model
- 绑定视图到模型，如 input, textarea或select 等指令。 
- 提供验证操作 (如必输、数字、email、url)。 
- 维护控件的状态 (有效/无效, 有改动/无改动, 触摸过/未触摸, 验证错误等)。 
- 设置元素上相关的css类 (ng-valid, ng-invalid, ng-dirty, ng-pristine, ng-touched, ng-untouched) ，包括动画。 
- 注册控件到父表单

```
<select ng-model="研发部">
    <option value="市场部">市场部</option>
    <option value="研发部">研发部</option>
    <option value="测试部">测试部</option>
</select>
```
- ng-show，ng-hide指令

```
<div ng-show="true">希望显示的内容</div>
<div ng-hide="true">希望隐藏的内容</div>
```
- ng-if指令

```
$scope.isVip=true; 
<div ng-if="isVip">你是VIP客户，你可以享受VIP特权</div>
```
- ng-class指令

```
<!--css-->
.sd{width: 100px;height: 100px;background-color: #f00;}
<!--html-->
<input type="button" value="点我加样式" ng-click="addClass()"/>
<div ng-class="{sd:flag}"></div><!--多个class在花括号里用逗号分隔-->
<!--js-->
$scope.flag=false;
$scope.addClass=function(){
    $scope.flag=!$scope.flag;
}
```
- ng-href

```
$scope.homePage = "http://www.itsource.cn";
<a ng-href="{{homePage}}" href="#" target="_blank">itsource</a>
```
- ng-src

```
$scope.imgPath = "./img/ddm.jpg";
<img ng-src="{{imgPath}}" />  <!--表达式获取值后，才会去加载图片-->
```
- ng-repeat遍历     
每个模板实例的作用域中都会暴露一些特殊的属性。
    1. $index：遍历的进度（0...length-1）。
    2. $first：当元素是遍历的第一个时值为true。
    3. $middle：当元素处于第一个和最后元素之间时值为true。
    4. $last：当元素是遍历的最后一个时值为true。
    5. $even：当$index值是偶数时值为true。
    6. $odd：当$index值是奇数时值为true。
    
    ```
    <!--css-->
    .even {background-color: darkgoldenrod;}
    <!--html-->
    <li ng-repeat="item in arr" ng-class="{even:$odd}">
	    {{ $index+1 }} {{item.name}} {{item.age}}
	</li>
    ```
#### 自定义指令

> 指令定义的核心就是function中的return {}。

- replace：替换标签，默认为 false，就是将模版的内容追加到元素中。
- template：指令的模版，它的值就是最终生成的内容。
- templateUrl: 指令的模版URL地址。
- restrict：指令在DOM中可以何种形式被声明，默认的值是**A**。可选值如下：
    - E（element元素）
<helloworld/>
    - C（class类名）
<div class="helloworld"></div>
    - M（comment注释）
<--directive:helloworld-->
    - A（attributes属性）
<div helloworld></div>  

选项可以单独使用，也可以混合在一起使用：

```
restrict:"A" //单独使用
restrict:"EACM"  //混合使用
```


- link
可以简单理解为，当directive被angular 编译后(添加到页面中，可以操作DOM了)，执行该方法

```
<!--html-->
<helloworld mytext="呵呵呵"/> 
-------------------------------------------------------------------------
<!--js-->
app.directive("helloworld",function(){
    return {<!--指令定义的核心-->
        restrict : "E",
        template : "<h1 ng-click='handleClick()'>Hello {{message}}</h1>",
        <!--scope:作用域；el: 对应的元素,打印出来是个数组；param:参数-->
        link:function(scope, el, param){
            scope.message = param.mytext;
            el.bind("click",function(){<!--对当前元素内容，添加点击事件-->
            	scope.message = "我是修改的内容！！";
            })
            scope.handleClick = function(){<!--在angular上定义一个事件响应函数-->
            	scope.message = "我是修改的内容！！";
            }
        }
    }
})
```
---
### angular路由
> 原理：路由是指根据不同的url展示不同的页面。            
1、onhashchange:在当前 URL 的锚部分(以 '#' 号为开始) 发生改变时触发      
2、var realPath=window.location.hash.substr(1);
#### *ngRouter路由模块*
1. 加入实现路由的 js 文件：angular-route.min.js。

```
<script src="//cdn.bootcss.com/angular.js/1.5.8/angular-route.min.js"></script>
```
2. 包含了 ngRoute 模块作为主应用模块的依赖模块。

```
var app = angular.module("app",["ngRoute"]);
```
3. 使用 ngView 指令，指定当前路由所对应的模板在DOM中的渲染位置

```
<div ng-view></div>
```
4. 配置 $routeProvider来定义路由规则
- template: string,
- templateUrl: string,
- controller: string, function 或 array,
- controllerAs: string, 为controller指定别名
- redirectTo: string, function,
- resolve: object<key, function>    指定当前controller所依赖的其他模块

```
app.config(["$routeProvider",function($routeProvider){
    $routeProvider
    .when("/", { template : "<h1>首页</h1>"})
    .when("/about", { template : document.querySelector("#xxxTemp").innerHTML})<!--当地址为“/”时候，显示template对应的内容-->
    .when("/login:type", { 
        templateUrl : "./script/view/login.html",
        controller : "LoginController"
    })
    .otherwise({redirectTo:"/"})<!--缺省配置，都不满足转到首页-->
})
```
###### 扩展：真实项目中控制器与路由的分离以及路由参数
routeParams路由参数，在when里面的url后加上:paramName或者通过?param=value，AngularJS就会把它解析出来并传递给$routeParams

```
<!--创建app模块-->
<script type="text/javascript">
    var app = angular.module("app",["ngRoute"]);<!--声明包含了 ngRoute 模块作为主应用模块的"依赖"模块-->
</script>
<!--引入控制器-->
<script src="script/controllers/LoginController.js" type="text/javascript" charset="utf-8"></script>
<!--配置路由-->
app.config(["$routeProvider",function($routeProvider){
    <!--路由配置代码块,下面是传routeParams 路由参数的配置 :type即:paramName-->
    .when("/login:type", {
         <!--配置-->
    }
}])
----------------------------------------------------------------------
<!--中间引入的LoginController.js中接收路由参数的代码-->
app.controller("LoginController",function($scope,$routeParams){
    var type = $routeParams.type;
    	if(type===":vip"){
            $scope.msg ="会员";
    	}else if(type===":normal"){
            $scope.msg ="游客";
    	}
    });

```
#### *ng-ui路由*
> ui-router。它是一个路由框架，允许你通过"状态"组织接口，而不是简单的URL路由。
1. 加入ng-ui的js文件

```
<script src="//cdn.bootcss.com/angular-ui-router/0.3.2/angular-ui-router.min.js"></script>
```

2. 声明包含了 ngRoute 模块作为主应用模块的依赖模块

```
var app = angular.module("app", ["ui.router"]);
```
3. 使用ui-view

```
<div ui-view></div>
-----------------------------
<!--a标签的书写-->
<a ui-sref=".home">首页</a>
```
4. 配置ui-router路由规则

```
<!----><!--配置状态和路径路由-->
app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
    $stateProvider
        <!--state()里的第一个值与html中a标签属性ui-sref的值对应-->
    	.state('home', {
            url: '/',
            template: '首页。。。。'
    	})
    	.state('one', {
            url: '/one',
            template: 'one页面'
    	})
    	.state('two', {
            url:'/two',
            template: 'two页面'
    	});
    	<!--定义一个当请求的路径是无效路径时跳转的路径-->
    	$urlRouterProvider.otherwise("/");
}]);
```
---
### angular服务
> AngularJS 内建了30 多个服务。 $location、$filter、$timeout 等。。。每个服务完成特定的功能，方便使用和维护。
###### 自定义服务

```
<!--工厂方式注册服务（参数：服务名，工厂函数）-->
app.factory("LoginService",["$location",function(){
    var serviceInstance = {	<!--服务对象定义-->		
        checkLogin : function(user){
            if(user.username === "小强"){
                alert("登录成功！！");	
            }else{
                alert("登录失败！！");	
            }
        }   
    };
    return serviceInstance;<!--发布服务对象-->
}]);
<!--使用该服务只需要向其他内置服务那样在controller的回调上注入即可，注意：自己写的服务要放在内置服务的后面-->
```
---
### 交互$http
> $http服务只是简单的封装了浏览器原生的XMLHttpRequest对象。

```
var app=angular.module('app',[]);
app.controller('mycontroller',['$scope','$http',function($scope,$http){
    $http({
        method:'GET',
        url:'data.json'
    }).success(function(data,status,headers,config){
        console.log(data);
        $scope.users=data;
    }).error(function(data,status,headers,config){
        console.log('出错了....');
    })；
}])
```

