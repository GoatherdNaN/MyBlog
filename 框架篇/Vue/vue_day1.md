vue.js：一个mvvm框架(库),比较容易上手、小巧.官网:http://cn.vuejs.org/
***
### vue.js入门
```

var vm=new Vue({
    el:"#mybox",//任意选择器
    data:{
       <!--这是一个json，里面可以放任何json的东西，如数组，json，Number-->
    },
    methods:{//函数写在这里面
        show:function () {
           this.arr.push("哈哈哈哈")
         }
    }
})
```
***
### 常用指令
```
    v-model	多用于表单元素(input、select、textarea)	双向数据绑定

v-for   循环:
	v-for="name in arr" <!--循环上面有{{$index}} {{$key}}-->
   	v-for="(k,v) in json"<!--第二种写法-->

```
#### 事件

```
事件定义:
    v-on:click="函数"
    简写形式：@click="函数名"<!--如果函数不带参数则可以省略函数名后面的()-->
    v-on:click/mouseout/mouseover/dblclick/mousedown.....
    
事件对象:
     @click="show($event)"
阻止事件：
    1）阻止冒泡:  
	@事件名.stop
    2）阻止默认行为:
        @事件名.prevent	

键盘事件：(可用keycode代替键名)
    @keyup/keydown.left 上
    @keyup/keydown.right 下
    @keyup/keydown.up 左
    @keyup/keydown.down 右
```
***
### 属性

```
     v-bind:属性名=""           简写：:src=""
	eg：<img :src="url" alt="">	
```
#### 扩展：:class和:style:两者表达式内都是JSON对象
注意：vue的样式绑定，必须绑定到判断对象上，不能直接写css类名，即使要绑定一个固定的类名，也要写成:class="{'btn':true}"

class的几种写法：
```
:class="[red]"	//red是数据

:class="[red,b,c,d]"
	
:class="{red:a, blue:false}"

:class="json"
	data:{
		json:{red:a, blue:false}
	}
	//注意: 复合样式，采用驼峰命名法,比如backgroundColor；
//vue2中，属性名也要加双引号
:class="{'red':a, 'blue':false}"

```
***
### vue交互

```
this.$http({
    url:地址
    data:给后台提交数据,
    method:'get'/post/jsonp
    jsonp:'cb' //cbName
});
<!---------例如------------->
this.$http({
    url:'weibo.php',
    data:{ 
        act:'add',
        content:this.t1
    }
}).then(function(res){
   <!--成功的业务逻辑-->
}，function(){
    console.log('失败')；
});
```
***


