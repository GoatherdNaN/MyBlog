> App.vue作为程序入口的主组件，与main.js绑定在一起

```
<template> 
<divclass="container">
    <!-- 左边菜单栏 -->
    <divclass="sidebar">
        
    </div>
    <!-- 中间主显示框 -->
    <divclass="home">
        <transitionname="display"node="out-in">
            <!--用于展示Home.vue部分的内容 -->
            <router-view></router-view>
        </transition>
    </div>
    
    <!-- 右侧登录/注册栏，这个articleFlag参数表示，如果是在文章显示的页面，则会删除掉右边的登录/注册部分 -->
    <divclass="rightbar"v-if="articleFlag">  
        <nav>
            <ulclass="nav-ul">
                <li@click="changeLoginway('login')">
                    <router-linkto="/login">
                        <iclass="fa fa-sign-in"></i>
                        登录
                    </router-link>
                </li>
                <li@click="changeLoginway('register')">
                    <router-linkto="/login">
                        <iclass="fa fa-user"></i>
                        注册
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</div>
</template>
```
