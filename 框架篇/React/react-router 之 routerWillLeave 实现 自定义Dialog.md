> react-router 可以在 react中起到路由的作用，同时也有一个routerWillLeave，这个函数帮助我们再处理路由的时候，离开某个路由要做的某个判断起到了很好的作用，但是version 2 才有这个功能，这里记录下如何自定自己弹出框。
1. 先建立一个函数

```
setAsyncRouteLeaveHook = (router, route, hook) => {
    let withinHook = false
    let finalResult = undefined
    let finalResultSet = false
    router.setRouteLeaveHook(route, nextLocation => {
      withinHook = true
      if (!finalResultSet) {
        hook(nextLocation).then(result => {
          finalResult = result
          finalResultSet = true
          if (!withinHook && nextLocation) {
            router.replace(nextLocation)
          }
        })
      }
      let result = finalResultSet ? finalResult : false
      withinHook = false
      finalResult = undefined
      finalResultSet = false
      return result
    })
  }
```
2. 然后添加一下routerWillLeave的逻辑
```
routerWillLeave = nextLocation => {
    return new Promise((resolve, reject) => {
      confirm.warning({
        content: '有更改未保存，确定跳转吗？',
        confirm: () => {
          resolve(true);
        }
      });
    })
    return false
  }
```
3. 调用

```
this.setAsyncRouteLeaveHook(this.props.router, this.props.route, this.routerWillLeave);
```
