### 使用方法

使用getChildContext方法将属性传递给子组件，并使用childContextTypes声明传递数据类型，子组件中需要显式地使用contextTypes声明需要用到的属性的数据类型。

需要传递进context参数才可以在constructor方法中使用context，要不然React将会报错。

在组件中，通过this.context访问context中的属性或方法。

### 相关api

contextTypes

当需要在当前组件使用从上级组件传入的context的属性时，需要为用到的属性声明数据类型

childContextTypes

声明传递给子组件的属性的数据类型。

getChildContext

设置传递给子组件的属性，可以覆盖，也可以新增。
```
import ReactDOM from 'react-dom';
import React from 'react'

// Children component
class Children extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: this.context.name
    };
  }

  render() {
    return(
      <ul>
        <li>
          {`child context is: ${this.context.age}`} // child context is: 18
        </li>
        <li>
          {`state from context: ${this.state.name}`} // state from context: mars
        </li>
        <li>
          {`print age: ${this.context.print(this.context.age)}`} // print age: 18
        </li>
      </ul>
    );
  }
}

Children.contextTypes = {
  name: React.PropTypes.string,
  age: React.PropTypes.number,
  print: React.PropTypes.func
};


// Parent component
class Parent extends React.Component {
  getChildContext() {
    return {
      name: 'mars',
      age: 18
    };
  }

  render() {
    return (
      <div>
        {`from App component: ${this.context.name}`} // from App component: bruno
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Parent.contextTypes = {
  name: React.PropTypes.string
};
Parent.childContextTypes = {
  age: React.PropTypes.number,
  name: React.PropTypes.string
};

// App component
class App extends React.Component {
  getChildContext() {
    return { 
        name: 'mars',
        print: (m) => m
     };
  }

  render() {
    return (
      <Parent>
        <Children />
      </Parent>
    );
  }
}

App.childContextTypes = {
  name: React.PropTypes.string,
  print: React.PropTypes.func
};

ReactDOM.render(<App />, document.getElementById('app'));
```

