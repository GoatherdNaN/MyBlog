#### 1. React不是一款MVC框架

我们首先要认清的事实就是， React 不同于我们之前常用的 MVC 框架，如 AngularJS 、 Backbone 等，因为 React 只专注于 view 层（即MVC中的V）的表现，它是一个用于构建前端可复用 UI 组件的库，同时，当数据发生变化时， React 会及时有效地更新和渲染相应的组件。对于越来越复杂的前端界面，尤其是对于数据不断变化的web应用， React 实现了将变化的数据高效无误的反映在页面上。

下面摘一句React官方doc中的一句话：

> We built React to solve one problem: building large applications with data that changes over time.

#### 2. 使用JSX取代HTML模板

JSX 是 React 的核心概念之一， JSX 并不是一种新语言，它是对 JavaScript 语言的扩展，但并没有改变 JavaScript 的语法，看起来很像 XML 。 JSX 使用基于 XML 的方式表达组件的嵌套，保持和 HTML 一致的结构，语法上除了在描述组件上比较特别以外，其它基本和 Javascript 保持一致。 并且最终 React 会把所有的 JSX 都编译为 JS 。

我们先来看一个小例子：


```
var element = <div className="title">
        <h1>Hello World</h1>
    </div>;
ReactDOM.render(element, document.body);
```

从该例子可以看出， React 实现了直接将 HTML 嵌入到 JavaScript 中的能力，相信很大一部分人刚接触 JSX 这种语法时，都心存怀疑，因为多少年我们一直强调 MVC ，即表现层与逻辑层是要分离的，我们使用 HTML 模板的目的也是为了避免表现层与逻辑层的耦合。但 React 使用 JSX 的这种设计思想，仿佛让我们一夜回到解放前。使用 JSX 的好处到底是什么呢？

其实，我们最初使用 HTML 模板的目的是让表现层更加独立，这样对 HTML 的修改就变得更加简单，不需要去看逻辑代码。但如今，web应用已经变得越来越复杂，模板对应的逻辑层代码也是严重依赖于模板 DOM 结构，这就造成了表现层与逻辑层的严重耦合，最初不看逻辑而简单修改界面的想法也打破了。换句话说，表现层和逻辑层还是互不可分的。而且，为了模板与逻辑的良好合作，还不得不引入很多新概念。我们拿 AngularJS 举例，使用 AngularJS 确实从结构上分离了表现层与逻辑层，但是 HTML 里却混入了大量的标记属性，而且，初学者如果不懂 AnjularJS 的语法，根本不明白 HTML 中标记属性的寓意何在，由此学习难度与成本也大幅度提升。

说到这儿，我们大概就能体会到 React 使用 JSX 的独到之处了。 JSX 除了使用 XML 标记的方式去直接声明界面以外，并没有增加其它未知的语法与标记，这不但降低了学习成本，让初学者更快地上手使用 React ，而且使写出的代码可读性更高，更易于理解。

另外，虽然 React 推荐使用 JSX ，但并不是必须的，我们也可以完全使用 JavaScript 进行开发，但 JSX 在定义类似 HTML 的树形结构时，非常简洁明了，下面的例子是不使用 JSX 和使用 JSX 开发的对比：

#不使用JSX，重复调用React.createElement方法

```
React.render(
    React.createElement('div', null,
        React.createElement('div', null,
            React.createElement('div', null, 'Hello World')
        )
    ),
    document.body
);
```


#使用JSX，简洁明了的类似HTML树形结构

```
React.render(
    <div>
        <div>
            <div>Hello World</div>
        </div>
    </div>,
    document.body
);
```

所以，有 JSX 这种好东西，我们有什么理由不用呢？

#### 3. 一切皆组件

组件，即被独立封装的可复用 UI 部件。组件也是 React 的核心思想之一。 React 让我们重新规划界面，把任何一个功能独立的模块都定义成组件。一个个的组件通过不断复用，组合与嵌套等，构成一套完整的 UI 界面。所以说，使用 React 开发的界面一切皆为组件。

组件的概念并不难理解，最重要的还是组件之间的交互。 React 为每个组件都提供一个 render 方法，这个方法返回组件的实例。组件有两个重要的概念： props 和 state ，他们的作用都是用于描述组件的状态。 props 是组件对外交互的接口，是一种父级向子级传递数据的方式； state 用于记录组件的不同状态， React 把组件看成是一个状态机，通过与用户的交互，实现不同状态，然后重新渲染组件，让UI界面及时有效地随数据变化而变化。

以下是在组件中使用 state 和 props 的应用实例。我们可以在父组件中设置 state ，并通过在子组件上使用 props 将其传递到子组件上。


```
var MainCom = React.createClass({
  getInitialState: function() {
    return {
      message: "Learn React",
      link: "https://facebook.github.io/react/"
    };
  },
 
  render: function() {
    return (
      <div>
        <Message message={this.state.message} />
        <Link link={this.state.link} />
      </div>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <h1>{this.props.message}</h1>
    );
  }
});

var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.link}>
        {this.props.link}
      </a>
    );
  }
});

ReactDOM.render(
  <MainCom />,
  document.getElementById('main-container')
);
```

组件化的方式带来了 UI 功能模块之间的分离。对于 MVC 开发模式来说，开发者将实现表现层，数据层，控制层的分离。对于 React 而言，则完全是一个新的思路，开发者从功能的角度出发，将UI界面分成不同的组件，每个组件都独立封装。

#### 4. 虚拟DOM提升性能

传统的web开发中，我们通常使用 JS 或 jQuery 操作DOM的方式将不断变化的数据实时地反映到页面上，随着页面逻辑复杂度的提升，频繁大量的DOM操作往往会造成网站性能较低，代码也变得越来越难维护。即使使用了 MVC 框架来重新架构代码，但也没有办法减少你所维护的状态，也就是说没有办法减少DOM操作。

后来又出现了 MVVM 模式，通过视图模板和状态的双向绑定，双向绑定引擎就会在状态更新的时候自动更新视图。 MVVM 模式很大程度的减少了视图更新的逻辑，即减少了DOM操作。但这种方法也是存在问题的，每次状态发生变化时，模板引擎都会重新渲染整个视图，即用新的视图替换掉旧的视图。我们知道，这样做是影响性能的，因为即使一处小小的修改都会引起重新渲染DOM。

在 React 的思想里，是完全不需要操作DOM的。 React 提出了新概念，即 虚拟DOM 。使用 React 进行开发时，所有的DOM构造都是通过 虚拟DOM 进行的，每当数据发生变化时， React 都会重新构造DOM树，然后将新构造的DOM树与上一次的DOM树进行对比（这就用到了React的 DOM Diff算法 ），得到两者之间的差异后，仅需将变化的DOM部分进行更新。由于每次生成虚拟DOM都很快， DOM Diff算法 找出两个DOM树之间的差异也很快（时间复杂度 O(n) ），所以跟传统的操作DOM相比，使用 虚拟DOM 的方法在速度和性能上的优势是十分明显的。

我们举一个简单的例子，假设我们有一个list如下：


```
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```

现在想把它更新成：


```
<ul>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
</ul>
```

我们传统的做法是先删除1，2，3，4这些节点，然后再追加6，7，8，9，10这几个新节点，这就意味这会有4次删除操作和5次添加操作。但React会把旧的和新的DOM树做一下Diff，然后发现其实不用删除1，2，3，4节点，而是可以直接修改这四个节点的innerHTML为6，7，8，9，然后再追加一个节点10就可以了。这样就比9次节点DOM操作快多了。

#### 5. 总结

本文只是个人对React的设计思想的一些浅显的认识，写的比较零散，当然React的优点还有很多的，还待大家去慢慢学习与体会。当然，事物都有相对性，在实际的开发过程中，还是要挑选最适合的框架，而不是盲目从众。