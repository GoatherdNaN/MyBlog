###### 我们要借助bundle-loader来实现按需加载。
1. 首先，新建一个bundle.js文件：

```
import React, { Component } from 'react'

export default class Bundle extends React.Component {

    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        })
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        if (!this.state.mod)
            return false
        return this.props.children(this.state.mod)
    }
}
```
2. 然后，在入口处使用按需加载：

```
// ...

// bundle模型用来异步加载组件
import Bundle from './bundle.js';

// 引入单个页面（包括嵌套的子页面）
// 同步引入
import Index from './app/index.js';
// 异步引入
import ListContainer from 'bundle-loader?lazy&name=app-[name]!./app/list.js';

const List = () => (
    <Bundle load={ListContainer}>
        {(List) => <List />}
    </Bundle>
)

// ...

    <HashRouter>
        <Router basename="/">
            <div>
                <Route exact path="/" component={Index} />
                <Route path="/list" component={List} />
            </div>
        </Router>
    </HashRouter>

// ...
```
3. webpack.config.js文件配置

```
output: {
    path: path.resolve(__dirname, './output'),
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js',
},
```


