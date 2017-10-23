
Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。在Bootstrap项目中，css的构建是使用LESS来完成的，在此总结一下less的一些使用心得。
### 入门
###### 安装
> npm install -g less
###### 使用
1. 在项目文件夹的根目录创立less文件夹，在里面直接创建.less文件
2. 编译：安装Koala客户端，把less文件夹拖过去，配置输出路径(一般默认就是项目css文件夹)
### Less语法
###### 变量
```
<!--定义的变量应用没有前后顺序要求，为了阅读方便，最好能将变量定义在应用该变量的地方前面-->
@color:red;
Body{background-color:@color};
```
###### 类（函数）
函数体内定义的变量作用域也只是函数体内
```
.default(@color：red){<!--括号里有一个初始化的过程，即没有传实际参数时就是red-->
  background-color:@color;
  border:1px solid @color;
}
<!--调用，这里运用了变量，也可不用直接调用-->
@re:red;
@ye:yellow;
<!--在类名选择器为.con1和.con2里运用样式-->
.con1{default(@ye)};
.con2{default(@re)};
```
还可以使用@arguments来引用所有传入的变量

```
.border(@a,@b,@color:blue){

  border:@arguments;

}
```
###### 层级嵌套
比如class名为con1的div下的ul下的li项中的a链接hover状态下的color为red,不加下划线

```
div.con1{
     ul{
       li{
         a{text-decoration: none;
           &:hover{color:red};<!--&代表上级选择器，在这指的是a-->
         }
       }
     }
   }
```
###### 条件语句判断
可以在类函数定义时候使用条件判断
```
.border(@a) when (@a>10),(@a<3){<!--条件是大于10或者小于3-->
  border:@a solid blue;
}
.con1{.border(12px)}<!--‘px’可加可不加-->
```
###### LESS内置函数

除了上面介绍的unit外

```
unit(@a,px);                        // 增加或者取出单位

ceil(@number);                       // 向上取整

floor(@number);                      // 向下取整

percentage(@number);                 // 将浮点数转换为百分比，例如 0.5 -> 50%

round(number, [places: 0]);          // 四舍五入取整

saturate(@color, 10%);               // 饱和度增加 10%

desaturate(@color, 10%);             // 饱和度降低 10%

lighten(@color, 10%);                 // 亮度增加 10%

darken(@color, 10%);                 // 亮度降低 10%

fadein(@color, 10%);                 // 透明度增加 10%

fadeout(@color, 10%);              // 透明度降低 10%
```
