### vue之过渡(动画)
*本质走的css3: transtion ,animation*
1. **引入amimate.css**

```
<link rel="stylesheet" href="animate.css">
```
2. **编写动画代码**

```
<!--html-->
<div id="div1" class="animated" v-show="bSign" transition="自定义名字"></div>
<!-- v-show="bSign"是隐藏或显示的事件，可以灵活配置或不要-->
-----------------------------------------------------------------
<!--js-->
data:{
    bSign:true
},
methods:{
    toggle(){
        this.bSign=!this.bSign;
    }
},
transitions:{ //定义所有动画名称
    你上面自定义的名字:{
    <!--这里是点击显示与隐藏相互切换，所以有两个动画-->
        enterClass:'zoomInLeft',
        leaveClass:'zoomOutRight'
    }
}
```
***
### vue组件
*其本质是一个大对象。*
1. **组件定义**     
- 全局组件
    
```
<!--经过下面的定义后，然后在#box中写上<aaa></aaa>即可使用该组件-->
var Aaa=Vue.extend({
    template:'<h3>我是标题3</h3>'
});
Vue.component('aaa',Aaa);
var vm=new Vue({
    el:'#box'
});
```  
扩展：另一种形式

```
<!--直接传json，推荐使用-->
Vue.component('aaa',{
    template:'<h3>我是标题3</h3>'
});
```

- 局部组件

```
var vm=new Vue({
    el:'#box',
    components:{
        'my-aaa':{
            data(){
                return {
                    msg:'welcome vue'
                }
            },
            methods:{
                change(){
                    this.msg='changed';
                }
            },
            template:'<h2 @click="change">标题2->{{msg}}</h2>'
        }
    }
});
```
扩展：另一种形式

```
<!--先在外面定义，然后vm对象中直接通过名字引用，不推荐-->
Vue.component('aaa',{
    data(){
        return {
            msg:'welcome vue'
        }
    },
    methods:{
        change(){
        	this.msg='changed';
        }
    },
    template:'<h2 @click="change">标题2->{{msg}}</h2>'
});
var vm=new Vue({
    el:'#box',
    components:{ //局部组件
    	my-aaa:aaa
    }
});
```
2. **配合模板使用**

```
<template id="aaa">
<!--模板内容-->
</template>
<!--在html中定义以下模板块，然后在上文中的template后直接引用id-->
template:'#aaa'
```
3. **动态组件**

```
<!--html-->
<div id="box">
    <input type="button" @click="a='aaa'" value="aaa组件">
    <input type="button" @click="a='bbb'" value="bbb组件">
    <component :is="a"></component><!--:is即组件是谁的意思，相当于传一个参数-->
</div>
<!--js,vm对象里的部分代码-->
components:{
    'aaa':{
        template:'<h2>我是aaa组件</h2>'
    },
    'bbb':{
        template:'<h2>我是bbb组件</h2>'
    }
}
```
**扩展**：vue调试工具

```
<!--https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd-->
```
4. **组件数据传递**
- 父子组件定义

```
components:{
    'aaa':{
        data(){
            return {
                 msg:'我是父组件的数据'
            }
        },
        template:'<h2>我是aaa组件</h2><bbb></bbb>',
        components:{<!--再次插入组件-->
            'bbb':{
                  template:'<h3>我是bbb组件->{{msg}}</h3>'
            }
        }
    }
}
```
- 子组件就想获取父组件data

```
<!--html-->
<template id="aaa">
	<h1>11111</h1>
	<bbb :mmm="msg"></bbb><!--:mmm为自定义名字，在下面的的props中用到，注意命名最好符合*驼峰命名法*-->
</template>
<!--js-->
components:{
    'aaa':{
        data(){
            return {
            msg:'我是父组件的数据'
        }
    },
    template:'#aaa',
    components:{
        'bbb':{
            props:['mmm'],
            <!--另一种写法
            props:{
		'm':String,
		'myMsg':Number
	    }-->
            template:'<h3>{{mmm}}</h3>'
        }
    }
}
```
- 父级获取子级数据

```
<!--html-->
<template id="aaa">
	<span>我是父级 -> {{msg}}</span>
	<bbb @child-msg="get"></bbb><!--child-msg为自定义名字，下面$emit中的第一个参数-->
</template>
<template id="bbb">
	<h3>子组件-</h3>
	<input type="button" value="send" @click="send"><!--点击把数据发送给父组件-->
</template>
<!--js-->
components:{
    'aaa':{
        data(){
            return {
                msg:111<!--初始化msg数据-->
            }
        },
        template:'#aaa',
        methods:{
            get(msg){<!--接收到子组件send过来的数据-->
                this.msg=msg;
            }
        },
        components:{
            'bbb':{
                data(){
                    return {
                        a:'我是子组件的数据'
                    }
                },
                template:'#bbb',
                methods:{
                    send(){
                        this.$emit('child-msg',this.a);<!--通过$emit方法发送数据给父组件-->
                    }
                }
            }
        }
    }
}
```
**扩展**：slot位置、槽口，其作用就是占个位置，类似于angularjs中的transclude指令

```
<!--组件中给具体的原始内容添加slot属性名来供模板中的slot标签定位-->
<aaa>
    <ul slot="ul-slot">
    	<li>1111</li>
    </ul>
    <ol slot="ol-slot">
    	<li>111</li>
    </ol>
</aaa>
<!--模板中用slot给原始内容占位，通过name属性与具体的原始内容绑定-->
<template id="aaa">
	<slot name="ol-slot">这是默认的情况</slot>
	<slot name="ul-slot">这是默认的情况2</slot>
</template>
```
***
### vue路由
#### 1. 定义路由
###### 第一步：引入路由模块

```
<script src="vue-router.js"></script>
```
###### 第二步：编写路由代码
- html代码

```
<div id="box">
<!--a标签的href属性被替换成vue里的v-link,path即你要路由到的路径-->
    <a v-link="{path:'/home'}">主页</a>
    <a v-link="{path:'/news'}">新闻</a>
    <router-view></router-view><!--展示内容-->
</div>
```
- js代码（每个步骤缺一不可）

```
<!--1. 准备一个根组件-->
var App=Vue.extend();
-------------------------------------------------------------
<!--2. Home News组件都准备-->
var Home=Vue.extend({
	template:'<h3>我是主页</h3>'<!--可用template标签代替-->
});

var News=Vue.extend({
	template:'<h3>我是新闻</h3>'<!--可用template标签代替-->
});
-------------------------------------------------------------
<!--3. 准备路由-->
var router=new VueRouter();
-------------------------------------------------------------
<!--4. 关联-->
router.map({<!--map方法，类似nodejs中把分路由挂到总路由上-->
    'home':{    <!--home前可以加'/',看个人习惯，这里与html中的path对应，下同-->
    	component:Home
    },
    'news':{
    	component:News<!--News对应第二步,上同-->
    }
});
-------------------------------------------------------------
<!--5. 启动路由-->
router.start(App,'#box');
-------------------------------------------------------------
<!--6. 跳转(类似选项卡的默认显示项)-->
router.redirect({    <!--redirect跳转到，重定向-->
    '/':'home'
});
```
#### 2. 路由嵌套
###### 路由嵌套规则（嵌套多层以此类推）
- html代码

```
<!--子路由的html代码写在父路由的模板中-->
<template id="home">
    <a v-link="{path:'/home/login'}">登录</a>
    <a v-link="{path:'/home/reg'}">注册</a>
    <router-view></router-view>
</template>
```
- js代码
```
router.map({
    'home':{
        component:Home,
        subRoutes:{ <!--subRoutes相当于最外层的map,这里是定义子路由-->
            'login':{
                component:{
                     template:'<strong>我是登录信息</strong>'
                }
            },
            'reg':{
                component:{
                    template:'<strong>我是注册信息</strong>'
                }
            }
        }
    }
}
```
#### 3. 路由的其他信息

```
<!--html-->
<template id="news">
    <a v-link="{path:'/news/detail/001'}">新闻001</a>
    <a v-link="{path:'/news/detail/002'}">新闻002</a>
    <router-view></router-view>
</template>
<template id="detail">
    {{$route.params | json}}    <!--{ "id": "001" } -->
    {{$route.path}}      <!--/news/detail/001 -->
    {{$route.query | json}}     <!--获取数据，这里没有数据，所以是{}-->
</template>
-------------------------------------------------------------------
<!--js-->
'news':{
    component:News,
    subRoutes:{
        '/detail/:id':{
          component:Detail
        }
    }
}
```















