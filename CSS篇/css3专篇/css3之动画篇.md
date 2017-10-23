CSS3动画的属性主要分为三类：transition、transform以及animation。
### transition过渡
**transition**：参与过渡的属性 持续时间(s) 动画类型(贝塞尔曲线) 延迟时间;      
（4个值一组，如果有多个属性参与过渡，可以每个属性的写一组，中间逗号隔开）
1. 参与过渡的属性**transition-property**
- all:所有属性均参与过渡。 
- 具体的属性，比如width,background
2. 持续时间**transition-duration**，单位为秒，比如1s,.5s
3. 动画类型**transition-timing-function**
- linear： 线性过渡。等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0) 
- ease： 平滑过渡。等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0) 
- ease-in： 由慢到快。等同于贝塞尔曲线(0.42, 0, 1.0, 1.0) 
- ease-out： 由快到慢。等同于贝塞尔曲线(0, 0, 0.58, 1.0) 
- ease-in-out： 由慢到快再到慢。等同于贝塞尔曲线(0.42, 0, 0.58, 1.0) 
- cubic-bezier(<number>, <number>, <number>,<number>)：特定的贝塞尔曲线,类型，4个数值需在[0, 1]区间内。
4. 延迟执行的时间**transition-delay**，单位为秒，比如1s,.5s
### transform变形（结合其他两动画使用，它的值是一些函数）
**1. 缩放： scale(x,y)**
- 可以写一个值，也可以写两个值。
- 值的类型是数字（浮点数）
- 1个值： x轴和y轴等比例缩放
- 2个值： x轴和y轴分别按相应值缩放

```
transform: scale(0.2,3);
```
也可以指定一个方向上缩放：
> scalex()： 指定对象X轴的（水平方向）缩放  
> scaley()： 指定对象Y轴的（垂直方向）缩放 

**2. 平移： translate(x,y)**
- 值的类型是长度单位

```
transform: translate(-100px,-100px);
```

**3. 旋转： rotate(角度)**
- 值的类型是角度单位 0deg
- 2D旋转只有这一个，绕z轴旋转
- 实际项目中角度一般在0~90deg范围内

```
transform: rotate(360deg) scale(2);//旋转一圈并且放大两倍
```

###### 扩展：
> 1. **transform-origin**原点，默认为 50% 50%    
> 值的类型：
> - 长度单位
> - 百分比
> - 方位词： left  right  center  top  bottom     
> 注意：可以将原点设置到盒子的外面

```
transform-origin:150px 100px;//原点是一个属性，跟background、color这些是一样的
```

> 2. 3D旋转 （x,y大小写均可）  
> rotatex()： 指定对象在x轴上的旋转角度   
> rotatey()： 指定对象在y轴上的旋转角度     

```
rotatey(180deg);//原地转身
rotatex(180deg);//倒立
```

**4. 斜切： skew(x,y)**
- 值的类型是角度单位
- 可以指定一个方向上的斜切  
skewX(角度)： 指定对象X轴的（水平方向）扭曲     
skewY(角度>)： 指定对象Y轴的（垂直方向）扭曲 
```
transform: skew(0deg,90deg);
```
### animation动画
动画可以通过“关键帧”定制复杂的效果。总共有以下两个步骤：
1. 定义动画  
> @keyframes 动画名称{    
> 起始点{起始属性}          
> ....此处省略一万个关键帧....        
> 	终止点{终止属性}        
> } 

```
@keyframes moveto{
    0%{transform:translatex(0);}//0%可以换成from
    49%{transform:translatex(1000px) rotatey(0deg);}
    50%{transform:translatex(1000px) rotatey(180deg);}
    99%{transform:translatex(0) rotatey(180deg);}
    100%{transform:translatex(0);}//100%可以换成to
}
```
小技巧：    
- 关键帧兼容写法：@-webkit-keyframes（移动端只要兼容webkit即可）
- 循环动画首尾连接，即0%与100%时一样
2. 执行动画         
定义好一个动画后，我们就可以绑定到某个选择器上面执行，至少需要设置两个重要的 CSS3 动画属性：
- 规定动画的名称  :  动画名
- 规定动画的时长  :  动画执行时长

```
animation: myfirst 5s;
<!--多个动画用逗号隔开-->
animation:fly 1s infinite,moveto 5s 2;
<!--实现一个动画接一个动画效果，只需把第二个动画的延迟时间设置成第一个动画的执行时间即可-->
```
当然，除了这两个属性外，还有其他属性可以设置：
1. animation-timing-function：动画的过渡类型（贝塞尔曲线）
2. animation-delay： 动画延迟的时间 
3. animation-iteration-count： 动画的循环次数 
- infinite：无限循环
- num：具体次数
4. animation-direction： 动画在循环中是否反向运动 
- normal： 正常方向[默认]
- reverse： 反方向运行 
- alternate： 动画先正常运行再反方向运行，并持续交替运行 
- alternate-reverse： 动画先反运行再正方向运行，并持续交替运行
5. animation-fill-mode： 动画时间之外的状态（结束时是回到起始状态还是维持终止状态） 
- none： 默认值。不设置对象动画之外的状态 
- forwards： 设置对象状态为动画结束时的状态 【常用】
- backwards： 设置对象状态为动画开始时的状态 
- both： 设置对象状态为动画结束或开始的状态
### 拓展
1. **animation-play-state**：设置动画的状态
- running： 运动 
- paused： 暂停

```
#pic{
    animation: around 8s linear infinite;
    animation-play-state: paused;<!--默认暂停-->
}
<!--**********************************************-->
$('#music').on('play',function(){<!--play是音频播放时触发的事件，暂停时触发的事件是pause-->
    $('#pic').css('animation-play-state','running');<!--事件触发，动画开始动-->
})
```
2. **css3动画的监听事件**
- animation动画监听     
开始事件：(webkit)animationstart        
结束事件：(webkit)animationend      
重复运动事件：(webkit)animationiteration
- transition动画监听
结束事件：(webkit)transitionend






