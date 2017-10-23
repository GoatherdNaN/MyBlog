> Grunt 是一个基于Nodejs平台的自动化构建工具（任务执行工具），简化开发，提供效率。
#### 准备
Node.js >= 0.8.0；奇数版本号的 Node.js 被认为是不稳定的开发版。
> node -v    查看node当前版本       
> npm -v    查看npm当前版本 
#### 安装
> npm i -g grunt-cli
#### 准备一份新的 Grunt 项目
一般需要在你的项目根目录中添加两份文件：package.json 和 Gruntfile。
1. **package.json**      
在创建的项目目录下(在文件夹中shift+右键，打开cmd)，通过下列命令可以生成该文件
> npm init --yes

该文件的配置依赖如下：

```
"devDependencies": {    //开发依赖，去掉dev是项目依赖
    "grunt": "~1.0.1",
    "grunt-contrib-clean": "^1.0.0",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-uglify": "~0.5.0",
    "grunt-contrib-watch": "^1.0.0"
  },
```
配置完后，运行下列命令即可安装所有依赖包：
> npm install

当然，也可一个个下载(当前项目目录下)：
> npm i 插件名 --save-dev   (去掉-dev则出现在项目依赖)
2. **Gruntfile.js**     
该文件用来配置或定义任务（task）并加载Grunt插件的。规则参考下面的内容：
```
// grunt的配置文件，是进行模块化定义的
module.exports = function(grunt) {
     // 初始化grunt配置
     grunt.initConfig({
           // 把package.json的内容读取出来，配置给pkg属性
           pkg : grunt.file.readJSON('package.json'),	
------------------------------------------------------------------           
           // 连接（合并）文件
           concat:{
                //配置信息
                options:{
                            separator: ';',//<!--分隔符-->
                },
                // 文件对象方式
                a:{
                    files:{
                       // 输出文件: 源文件
                       'dest/all.js' : ['js/*.js']
                     'dest/all.js' : ['js/a.js','js/b.js']
                    }
                }
           }
------------------------------------------------------------------           
           // uglify混淆“任务”配置
           ,uglify : {
                // 当前任务相关的“配置”信息
                options:{
                   // 显示在处理结果的最顶部
                   banner:"/* 作者: <%= pkg.author %>,版本号:<%= pkg.version %>, 时间：<%= grunt.template.today('yyyy年mm月dd HH:MM:ss') %> */ \n"
                   ,sourceMap : true   //调试
                },
                // 当前任务下，其中一个子任务
                build:{
                   // 要压缩的源文件
                   src: "dest/all.js",
                   // 要压缩的目标文件
                   dest:"dest/all.min.js"
                },
                // 当前任务下，其中一个子任务
                all:{
                   //expand 设置为true用于启用下面的选项：
                   expand : true,
                   // cwd源文件的目录路径，这里配置的信息最终不会输出在结果文件信息中
                   cwd:"./js/",
                   // src 相对于cwd路径的匹配模式
                   src :"*.js",
                   
                   // dest 目标文件"路径前缀"
                   dest : "./dest/",
                   // ext 配置输出文件的后缀名
                   ext:".min.js"
                }
           }
-----------------------------------------------------------------------
            //清除
           ,clean:{
           	allClean:['./dest/'],
           	allJSMapClean:['./dest/all.js','./dest/*.map']
           }
-----------------------------------------------------------------------
        //监控文件变动
        ,watch: {
        	// 检测的目录或文件
            files: ['js/*.js'],
            // 如果检测的文件发生修改，需要执行的“任务名称”
            tasks: ['dev'],
        }
     });
     
     // 引入任务依赖的插件
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-clean');
     // 代码观测者插件，能够动态识别文件的修改，并去执行指定的一个任务
     grunt.loadNpmTasks('grunt-contrib-watch');
     
     // 手动注册default任务
     grunt.registerTask("default",["clean:allClean","concat:a","uglify:build","clean:allJSMapClean","watch"]);
     
     grunt.registerTask("dev",["clean:allClean","concat:a","uglify:build"]);
     grunt.registerTask("publish",["clean:allClean","concat:a","uglify:build","clean:allJSMapClean"]);
};
```
#### 运行命令
1. 运行单个命令，如：
> grunt clean:allClean
2. 运行单个功能命令
> grunt clean
3. 运行命令串
> grunt dev