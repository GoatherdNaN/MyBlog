### css3兼容写法
-  -webkit-      以webkit做内核的浏览器
- -ms-      IE
- -moz-     火狐
- -o-      opera
- 不加则为标准属性，一般放最后（有前缀的兼容效果更好）
### 如何使用手册
- []		表示全部可选项
- ||		表示或者
- |		表示多选一
- ？	    表示0个或者1个
- \*		表示0个或者多个
- {}		表示范围
### 文本阴影
###### text-shadow:偏移量x 偏移量y 模糊度 阴影颜色
其中，模糊度可以省去不写，如果写了，则必须是非负数，0为实心的，数值越大越模糊
### 盒子阴影
###### box-shadow:偏移量x 偏移量y 模糊度 阴影大小 阴影颜色 inset
基本跟文本阴影一致，最后一项inset有则为内阴影，一般不用，默认外阴影

```
box-shadow: 8px 6px 40px 30px rgba(0,0,0,0.8) inset;//球体阴影效果(3D),里面数值可自行改变
```

### 利用border-radius绘制一些特殊的形状

```
html:
<!--鸡蛋-->
<div id="box1"></div>
<!--柠檬-->
<div id="box2"></div>
<!--半圆形-->
<div id="box3"></div>
css:
div{width:200px;height:200px;border:1px solid #f00;}
#box1{height:200px;width:160px;border-radius:110% 100% 100% 100%;border:0;}
#box2{border-radius:10px 120px 10px 120px;background:#f8c808;border:0;}
#box3{border-radius:200px 200px 0 0;height:100px;}
```
### 背景background
###### background-image背景图片
1. 可以插入多个背景图片，用逗号隔开。(注意：当插入了多个背景图片后，平铺方式、位置、定位都可以为每一张背景图单独设置，如果没有设置，则以第一张图的为准)

```
background-image:url(img/1.gif),url(img/2.gif),url(img/6.jpg);
```
2. 可以使用线性渐变创建背景图片
> background-image:linear-gradient(角度(deg),起始颜色,结束颜色...);  注意：角度也可以是方位词，如left,top...

```
background-image:-webkit-linear-gradient(135deg,#00f,#0ff,#f00,#ff0);//结束颜色可多个
```
3. 径向渐变

```
background-image:radial-gradient(circle,#f00 30%,#ff0 35%,#fff 70%);//circle： 指定圆形的径向渐变 /ellipse： 指定椭圆形的径向渐变

```
4. 重复线性渐变

```
background:repeating-linear-gradient(to bottom,transparent,transparent 29px,#f00 30px);//信纸效果
```
5. 重复径向渐变(很少用)

###### background-repeat背景平铺（有x,y两个方向，默认x,y两个方向都有),新增以下两个：
- round： 背景图像自动缩放直到适应且填充满整个容器。  
- space： 背景图像以相同的间距平铺且填充满整个容器或某个方向。
###### backgrouond-size:宽度高度(可以是数值，百分比，或者以下两个，如果写一个代表宽)
- cover： 将背景图像等比缩放到完全覆盖容器，背景图像有可能超出容器，超出不显示。
- contain： 将背景图像等比缩放到宽度或高度与容器的宽度或高度相等，背景图像始终被包含在容器内。说白了谁小适应谁。(常用于移动端开发)
###### background-origin背景原点属性
- padding-box：默认值，决定background-position起始位置从padding的外边缘(border的内边缘)开始显示背景图片。(内边距开始)
- border-box ：决定background-position起始位置从border的外边缘开始显示背景图片。(边框开始)
- content-box：决定background-position起始位置从content的外边缘padding的内边缘）开始显示背景图片。(内容开始)
###### background-clip背景绘制区域
可用来做遮罩效果，如下：

```
css:
#shade{
    width:800px;
    margin:30px auto;
    background:url(feng.jpg) no-repeat;
    background-size:50%;
    -webkit-background-clip:text;
    color:rgba(0,0,0,0);
    -webkit-animation:cliptext 8s linear infinite;
    -ms-animation:cliptext 8s linear infinite;
    -moz-animation:cliptext 8s linear infinite;
    -o-animation:cliptext 8s linear infinite;
    animation:cliptext 8s linear infinite;
    font:bold 196px/196px "arial narrow";
}
@-webkit-keyframes cliptext{
    0%{background-position:left top;}
    50%{background-position:right top;}
    100%{background-position:left top;}
}
html:
<div id="shade">
    <p>KEEP MOVING</p>
</div>
```

### 盒子模型
###### box-sizing 盒模型组成模式
- content-box：将对象定义为标准模式下的盒模型。宽高仅作用于内容区域   
- border-box：将对象定义为怪异模式下的盒模型。宽高作用于 除外边距区域
### resize自由缩放
- none:不允许自由缩放，多用于给文本域固定宽高
- both: 用户可以拖动元素，同时修改元素的宽度和高度。
- horizontal: 用户可以拖动元素，仅可以修改元素的宽度，但不能修改高度。
- vertical: 用户可以拖动元素，仅可以修改元素的高度，但不能修改宽度。
- inherit: 继承父元素的resize属性值。
###### 一般要结合overflow：auto使用，尤其行内元素。
### columns多列布局(兼容性在移动端比较好，客户端兼容不好)
1. column-width: 设置每一栏的宽度
2. column-count: 设置总栏数
3. column-gap: 设置栏之间的空隙
4. column-rule: 设置栏与栏之间的分隔线，写法与边框一样
5. column-span: 设置对象可以横跨多栏，不写默认不跨栏
6. column-fill:设置对象所有列的高度是否统一。匹配同一行最高栏，一般为auto。

```
#news{
    -webkit-column-width:300px;
    -webkit-column-count:3;
    -webkit-column-gap:50px;
    -webkit-column-rule:1px solid #666;
    -webkit-column-fill:auto;
}
#news h1{
    -webkit-column-span:all;
}
```
### 弹性盒子
#### 父盒子(flex container)
1. **display:flex** 将容器设置为弹性盒子(行内元素用**display:inline-flex**)
2. **flex-direction** 设置排列方向
- row 默认，横向从左向右排列
- row-reverse  横向从右到左排列
- column  纵向从上到下排列
- column-reverse 纵向从下到上排列
3. **flex-wrap** 设置超出处理方式
- nowrap 默认，超出不换行，自动压缩每一个弹性盒子
- wrap  超出部分换行
- wrap-reverse  超出部分换行并且纵向反转
4. **flex-flow** 设置方向和超出处理，复合属性
flex-direction  flex-wrap

```
flex-flow:row-reverse wrap-reverse;//最新发布的内容显示在最前面
```
5. **justify-content** 设置弹性项目的主轴对齐方式
- flex-start  默认， 设置成主轴起始位置对齐（左对齐）
- flex-end  设置成主轴结束位置对齐（右对齐）
- center  设置成主轴中对齐（居中对齐）
- space-between  将盒子按主轴进行平均分配（两端对齐）
- space-around  弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半
6. **align-items**  设置弹性项目的侧轴对齐方式
- flex-start  设置弹性项目侧轴起始点对齐
- flex-end  设置弹性项目侧轴结束点对齐
- center  设置弹性项目侧轴居中对齐
- baseline 设置弹性项目侧轴基线对齐
- stretch  拉伸对齐
7. **align-content** 设置弹性盒堆叠伸缩行的对齐方式
- flex-start 设置盒子向侧轴起点对齐
- flex-end  设置盒子向侧轴终点对齐
- center 设置盒子向侧轴居中对齐
- space-between 两端对齐
- space-around  各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。
- stretch拉伸对齐
###### 扩展：align-items和align-content的区别(假设主轴水平)
align-items在对齐前，会先根据行数把容器的高度平均分配，然后在各自行的高度里进行对齐；而后者则不会进行分配高度这一项，直接对齐。
#### 子盒子(flex items)
1. **order** 设置项目的排序号
> 排序号默认为0 ，从小到大排序,设置一个值比0小，就排前面(与z-index规则相反)
2. **flex-grow** 设置项目的主轴排列比率（分配主轴剩余空间）
> 注意：这里是分配剩余的空间，比如总宽度100，两个各30的子盒子，把剩余40瓜分
3. **flex-shrink** 设置项目的收缩比率，设置跟flex-grow一样就行
4. **flex-basis**用来指定伸缩基准值，即在根据伸缩比率计算出剩余空间的分布之前，「flex子项」长度的起始数值，不写默认0%。
5. **align-self** 设置项目自己的对齐方式
- auto  默认
- flex-start  设置项目自己的侧轴起始点对齐
- flex-end  设置项目自己的侧轴终点对齐
- center  设置项目自己的侧轴居中对齐
- baseline 设置项目自己的侧轴基线对齐
- stretch 设置项目自己的侧轴拉伸对齐
###### 扩展：移动端项目那些事
1. 移动端需在utf-8下面加上这句：

```
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
```

2. 图片设置宽度用百分比，且尽量设置在行内，这样不用做二次解析
3. 单位用rem，即相对于html标签字体的大小，我们可以在一开始就给html,body设置如下样式：

```
html,body{
    margin: 0;
    padding: 0;
    font-size: 1rem;
}
```
常用的rem：
- 0.75rem相当于12px，最小号
- 0.8rem正文小
- 0.9rem正文大
- 1rem相当于16px，标题
- 1.25rem大号标题   
 
常用的手机端颜色：#333
### web图标字体
把要用到的.ttf文件放在项目文件夹中，然后通过下列方式引入:

```
@font-face{
    font-family:字体名称;//字体名称自定义，最好英文
    src:url(路径) format('truetype');//format固定写，定义类型
}
```
要用到的地方，用下列方式添加图标：

```
xxx:before{
    content:"\f287";//‘\f287’是该图标的编号，可以查到在给出的html中
    .....
}
```
注意：这里添加的图标字体，其样式也会受目标元素的样式管制。













