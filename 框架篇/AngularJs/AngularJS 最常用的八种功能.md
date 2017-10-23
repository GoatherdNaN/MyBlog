#### 第一 迭代输出之ng-repeat标签
ng-repeat让table ul ol等标签和js里的数组完美结合

```
<ul>
    <li ng-repeat="person in persons">
        {{person.name}} is {{person.age}} years old.
    </li>
</ul>
```

你甚至可以指定输出的顺序：
```
<li ng-repeat="person in persons | orderBy:'name'">
```

#### 第二 动态绑定之ng-model标签
任何有用户输入，只要是有值的html标签，都可以动态绑定js中的变量，而且是动态绑定。


```
<input type="text" ng-model='password'>
```

对于绑定的变量，你可以使用{{}} 直接引用

```
<span>you input password is {{password}}</span>
```

如果你熟悉fiter，你可以很容易的按你的需要格式输出

```
<span>{{1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'}}</span>
```
#### 第三 绑定点击事件之ng-click事件
使用ng-click你可以很容易的为一个标签绑定点击事件。

```
<button ng-click="pressMe()"/>
```

当然前提是你要在$scope域中定义的自己的pressMe方法。

和传统的onclick方法不同，你甚至可以为ng-click方法传递一个对象，就像这样：

```
<ul>
    <li ng-repeat="person in persons">
        <button ng-click="printf(person)"/>
    </li>
</ul>
```

当然还有ng-dblclick标签

#### 第四 分支语句之ng-switch on、ng-if/ng-show/ng-hide/ng-disabled标签
分支语句让你在界面上都可以写逻辑判断。

```
<ul>
    <li ng-repeat="person in persons">
        <span ng-switch on="person.sex">
            <span ng-switch-when="1">you are a boy</span>
            <span ng-switch-when="2">you are a girl</span>
        </span>
        <span ng-if="person.sex==1">you may be a father</span>
        <span ng-show="person.sex==2">you may be a mother</span>
        <span> please input your baby's name:
            <input type="text" ng-disabled="!person.hasBaby"/>
        </span>
    </li>
</ul>
```

#### 第五 校验语法之ng-trim ng-minlength ng-maxlength required ng-pattern 等标签
表单中的输入框，你可以使用上面的标签来实现对用户输入的校验。
从字面意思上你已经知道了它们的意思。

```
<form name="yourForm">
    <input type="text" name="inputText" required ng-trim="true" ng-model="userNum" ng-pattern="/^[0-9]*[1-9][0-9]*$/" ng-maxlength="6" maxlength="6"/>
</form>
```

- 你可以通过 $scope.yourForm.inputText.$error.required 来判断输入框是否为空
- 你可以通过 $scope.yourForm.inputText.$invalid来判断输入的内容是否满足ng-pattern，ng-maxlength，maxlength
- 你通过$scope.userNum获得的输入内容是去掉前后空白的，因为ng-trim的存在。

- 第六 下拉框之ng-options标签
ng-options是为下拉框专门打造的标签。

```
<select ng-model="yourSelected" ng-options="person.id as person.name in persons"></select>
```

下拉框中显示的是person.name，当你选中其中一个的时候，你可以通过yourSelected得到你选中的person.id.

#### 第七  控制css之ng-style标签
ng-style帮你轻松控制你的css属性

```
<span ng-style="myColor">your color</span>
```

你可以通过给myColor赋值的形式来改变你想要的效果，就像这样：

```
$scope.myColor={color:'blue'};
$scope.myColor={cursor: 'pointer',color:'blue'};
```

#### 第八  异步请求之$http对象。
AngularJS 提供了一个类似jquery的$.ajax的对象，用于异步请求。
在AngularJS中对异步操作是推崇至极的，所以$http的操作都是异步的不像jquery.ajax里还提供了async参数。

```
$http({
    method : 'POST',
    params : { id:123}, 
    data:{name:'john',age:27}, 
    url : "/mypath"
})
.success(function(response, status, headers, config){
//do anything what you want;
})
.error(function(response, status, headers, config){
//do  anything what you want;
});
```

如果你是POST请求，params里的数据会帮你拼到url后面，data里的数据会放到请求体中。