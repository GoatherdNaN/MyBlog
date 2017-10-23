> 使用ES7的装饰器（decorator）代码会更加简洁。

###### 首先，安装babel-plugin-transform-decorators-legacy:


```
npm install --save-dev babel-plugin-transform-decorators-legacy
```

###### 之后，配置.babelrc文件：


```
{
    "presets": ["es2015", "react", "stage-0"],
    "plugins": [
        ["transform-decorators-legacy"]
    ]
}
