### vue生命周期之钩子函数
其实类似一些事件。
- created	->   实例已经创建	√
- beforeCompile	->   编译之前
- compiled	->   编译之后
- ready		->   插入到文档中	√
- beforeDestroy	->   销毁之前
- destroyed	->   销毁之后

```
var vm=new Vue({
    el:'#box',
    data:{
        msg:'well'
    },
    created:function(){
        alert('实例已经创建');
    },
    beforeCompile:function(){
        alert('编译之前');
    },
    compiled:function(){
        alert('编译之后');
    },
    ready:function(){
        alert('插入到文档中');
    },
    beforeDestroy:function(){
        alert('销毁之前');
    },
    destroyed:function(){
        alert('销毁之后');
    }
});
```
***
### 防止闪烁的几个指令
(指令: 扩展html语法)
- v-cloak	一般放在一个大块上

```
<!--css-->
[v-cloak] {
  display: none;
}
```

- v-text   文本防止闪烁，即解析时花括号{{}}不出现

```
<span>{{msg}}</span><!--闪烁版-->
<span v-text="msg"></span><!--改进版-->
```
- v-html代码防止闪烁

```
<span>{{{msg}}}</span><!-- msg:'<strong>welcome</strong>'-->
<span v-html="msg"></span>
```
***
### 计算属性的使用
vue对象的直接属性
```
<!--实现a和b的双向绑定，即a变了b也会变，同样b变了a也会变-->
computed:{
    b:{
        get:function(){
            return this.a+2;<!--get是一个属性，其值取决于return返回的东西-->
        },
        set:function(val){
            this.a=val;
        }
    }
}
```
***
### vue实例(vm)的一些简单方法
写在创建vue实例的外面
- vm.$el >>>>  就是元素

```
vm.$el.style.background='red';
```

- vm.$data  >>>>  就是data

```
console.log(vm.$data.a);
```

- vm.$mount >>>>  手动挂在vue程序

```
var vm=new Vue({
    data:{
        a:1
    }
}).$mount('#box');<!--省去了vue对象里的el写法-->
```

- vm.$options	>>>>   获取自定义属性

```
var vm=new Vue({
    aa:11, //自定义属性,
    show:function(){
        alert(1);
    },
}).$mount('#box');
vm.$options.show();
console.log(vm.$options.aa);
```

- vm.$destroy	>>>>   销毁对象，不咋用

```
<!--点击页面销毁对象-->
document.onclick=function(){
    vm.$destroy();
};
```

- vm.$log();	>>>>  查看现在数据的状态

```
console.log(vm.$log());
```
***
### 循环时遇到重复数据
track-by='$index/uid'   提高循环性能

```
<li v-for="val in arr" track-by="$index">
    {{val}}
</li>
```
***
### vue之过滤器
```
<!--使用格式如下-->
{{msg| filterA}}
{{msg| filterA | filterB}}
```
###### vue提供过滤器
1. capitalize首字母大写
2. uppercase转化为大写
3. lowercase转化为小写
4. currency钱 $   

```
{{12|currency '￥'}}<!--后面带参数-->
```

5. debounce	配合事件，延迟执行，和setouttime类似

```
<input type="text" @keyup="show | debounce 2000">
```
###### 数据配合使用过滤器
1. limitBy 限制数据个数

```
<li v-for="val in arr | limitBy 2"><!--一个参数从开始数2个-->
    {{val}}
</li>
--------------------------------------------------------------------
<li v-for="val in arr | limitBy 2 arr.length-2"><!--参数一：取几个  参数二：从哪开始-->
    {{val}}
</li>
```
2. filterBy 过滤数据

```
<li v-for="val in arr | filterBy 'w'"><!--只要含有'w'的数据-->
    {{val}}
</li>
```
3. orderBy	排序

```
<li v-for="val in arr | orderBy a"><!--按照'a'排序，a也可换成1或-1,1代表正序，-1代表倒序-->
    {{val}}
</li>
```
###### 自定义过滤器
用Vue.filter来自定义过滤器

```
<!--将时间戳转换成0000-00-00 0:00:00的标准输出格式-->
Vue.filter('date',function(input){  <!--input指输出，固定写法-->
    var oDate=new Date(input);
    var oYear=oDate.getFullYear();
    var oMouth=(oDate.getMonth()+1)<10?'0'+(oDate.getMonth()+1):''+(oDate.getMonth()+1);
    var oDay=oDate.getDate()<10?'0'+oDate.getDate():''+oDate.getDate();
    var oHours=oDate.getHours();
    var oMinutes=oDate.getMinutes()<10?'0'+oDate.getMinutes():''+oDate.getMinutes();
    var oSeconds=oDate.getSeconds()<10?'0'+oDate.getSeconds():''+oDate.getSeconds();
    return oDate+'-'+oMouth+'-'+oDay+' '+oHours+':'+oMinutes+':'+oSeconds;
});
```
扩展：双向过滤器

```
<!--将输入的标签名隐藏并编译-->
Vue.filter('filterHtml',{
    read:function(input){ <!--model-view-->
        return input.replace(/<[^<]+>/g,'');
    },
    write:function(val){ <!--view-model-->
        return val;
    }
});
```
***
### 指令扩展
**Vue.directive(** 指令名称,function(参数)**{**         
	this.el	-> 原生DOM元素      
**})**;             
*注意: 必须以 v-开头*
```
<!--自定义拖拽指令-->
Vue.directive('drag',function(){
    var oDiv=this.el;
    oDiv.onmousedown=function(ev){
        var disX=ev.clientX-oDiv.offsetLeft;
        var disY=ev.clientY-oDiv.offsetTop;

        document.onmousemove=function(ev){
            var l=ev.clientX-disX;
            var t=ev.clientY-disY;
            oDiv.style.left=l+'px';
            oDiv.style.top=t+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        };
    };
});
------------------------------------------------------
<!--html应用该自定义拖拽指令-->
<div v-drag :style="{width:'100px', height:'100px', background:'blue', position:'absolute', right:0, top:0}"></div>
```
***
### 监听数据变化
vm.$watch(name,fnCb);  //浅度

```
<!--该属性也类似一个事件可以用来实现a、b的双向绑定-->
vm.$watch('a',function(){<!--a是data里的一个数据，普通的Number-->
    this.b=this.a+100;
});
```

vm.$watch(name,fnCb,{deep:true});  //深度监视 

```
vm.$watch('json',function(){
    <!--变化了的逻辑代码-->
},{deep:true});
```











