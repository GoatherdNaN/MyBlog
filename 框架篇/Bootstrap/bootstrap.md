### bootstrp是什么？
>  Bootstrap ，来自Twitter，是一个基于HTML、CSS、Javascript的开源前端++UI框架++。主要用于开发响应式布局、移动设备优先的Web项目。我们可以直接在其中文文档中拷贝代码，直接修改就能得到想要的效果。
---
### bootstrp优点
- 跨设备(移动设备优先)
- 跨浏览器（ chrome ， IE9及以上， Firefox ， Safari ， Opera …）
- 响应式布局
- 具有实用性强的组件(21个css组件和12个基于jQuery的插件)
- 内置 jquery 插件
- 还可提供了基于 Web 的定制。
---
### 栅格系统
响应式网格系统随着屏幕或视口（ viewport ）尺寸的增加，系统会自动分为最多 12 列。
###### 工作原理
**底层原理是浮动和百分比**
- 行必须放置在 .container (固定宽度)或者 .container-fluid(100%宽度) class 内，获得适当的对齐 (alignment) 和内边距 (padding)
- 内容放置在列中，唯有列可以是行的直接子元素
- 预定义的网格类，比如 .row 和 .col-lg-4 ，可用于快速创建网格布局(下列四种可组合)

    > col-lg-num 只有屏幕的尺寸大于1200px才生效     
    > col-md-num 只有屏幕的尺寸大于992px才生效  
    > col-sm-num 只有屏幕的尺寸大于768px才生效  
    > col-xs-num 一直生效
- 列通过内边距 （padding） 来创建列内容之间的间隙
###### 媒体查询
- 超小设备（手机，小于768px）
默认的,因为Bootstrap是移动设备优先的吗
- 小型设备（平板电脑，大于等于768px） 
> @media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
- 中型设备（台式电脑，大于等于992px）
> @media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
- 大型设备（大台式电脑，大于等于1200px）
> @media (min-width: @screen-lg-min) { ... }
###### 列偏移，让中间保持空隙

```
<div class="container">
    <div class="row">
        <div class="col-md-8">1-8</div>
        <div class="col-md-3 col-md-offset-1">10-12</div>
    </div>
</div>
```
###### 可以嵌套，嵌满也是12列

```
<divclass="container">
    <divclass="row">
        <divclass="col-md-9">
            <divclass="col-md-8">1-8</div>
            <divclass="col-md-4">9-12</div>
        </div>
        <divclass="col-md-3">10-12</div>
    </div>
</div>
```
###### 可以把两个列交换位置， push 向右移动（推）， pull向左移动（拉）
```
<divclass="container">
    <divclass="row">
        <divclass="col-md-8 col-md-push-4">8</div>
        <divclass="col-md-4 col-md-pull-8">4</div>
    </div>
</div>
```
---
### 模态框插件
###### 用法
- 可以通过 data 属性 data-toggle data-toggle="modal" data-target="#myModal"
- data-toggle 表示触发类型
- data-target 表示触发的节点
- 如果不是使用 <button> ，而是 <a> ，其中 data-target 也可以使用href="#myModal" 取代
- 建议使用 data-target 。除了 data-toggle 和 data-target 两个声明 属性外，还有一些可以用选项
###### 事件
- **show.bs.modal** 在show方法调用时立即触发。
- **shown.bs.modal** 在模态框完全显示出来，并且等 CSS 动画完成之后触发。
- **hide.bs.modal** 在hide方法调用时，但还未关闭隐藏时触发。
- **hidden.bs.modal** 在模态框完全隐藏之后，并且等 CSS 动画完成之后触发

```
$('#myModal').on('show.bs.modal',function(){
  alert('在 show 方法调用时立即触发！');
});
$('#myModal').on('loaded.bs.modal',function(){
  alert('远程数据加载完毕后触发！');
});
```
### 轮播
###### data 属性
- data-slide 接受关键字 prev 或 next ，用来改变幻灯片相对于当前位置的位置；
- data-slide-to 来向轮播底部创建一个原始滑动索引， data-slide-to="2" 将把滑 动块移动到一个特定的索引，索引从 0 开始计数。
- data-ride="carousel" 属性用户标记轮播在页面加载时开始动画播放。
- data-interval 默认值 5000 ，幻灯片的等待时间(毫秒)。如果为 false ，轮播将不会自动开始循环。
- data-pause 默认鼠标停留在幻灯片区域( hover )即暂停轮播，鼠 标离开即启动轮播。
- data-wrap 默认值 true ，轮播是否持续循环。
- 如果在 JavaScript 调用就直接使用键值对方法，并去掉 data- ；

```
$('#myCarousel').carousel({//设置自定义属性
 interval : 2000,//设置自动播放`/2` 秒
 pause : 'hover',//设置暂停按钮的事件
 wrap : false,//只播一次
});
```

###### 方法
- cycle 循环各帧(默认从左到右)
- pause 停止轮播
- number 轮播到指定的图片上(小标从 0 开始，类似数组)
- prev 循环轮播到上一个项目
- next 循环轮播到下一个项目

```
$('button').on('click',function(){//点击按钮执行
 $('#myCarousel').carousel('cycle');//点击后，自动播放
}
```

###### 事件

- slide.bs.carousel 当调用 slide 实例方式时立即触发该事件。
- slid.bs.carousel 当轮播完成一个幻灯片触发该事件

```
$('#myCarousel').on('slide.bs.carousel',function(){
 alert('当调用 slide 实例方式时立即触发');
 });
$('#myCarousel').on('slid.bs.carousel',function(){
 alert('当轮播完成一个幻灯片触发');
});
```
 