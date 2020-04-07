## 项目初始化构建
    1. 全局安装vue-cli
    2. 使用vue init webpack projectname进行构建
    3. 选择需要使用的包
    4. cd到项目文件夹，使用cnpm下载包
## 路由中的#号表示路由模式使用的是hash模式
    我们也可以在路由文件中进行更改，在export default new Router({})
    中的第一行使用mode: 'history'可以更改成history模式，这种模式下，
    路由访问就不需要#号了
## 动态路由参数获取
    $router.params.参数名就可以取到
## 二级路由(嵌套路由)path参数不用加/, 加/表示一级路由
    使用二级路由(子路由)需要在一级路由(父组件)里面使用<router-view></router-view>加载子路由，然后通过标签卡的这种形式，使用<router-link to="/goods/watch"></router-link>，to中的url使用的是绝对地址
## 编程式路由
    编程式路由就是通过编辑代码(js)来创建路由，形式如下：
    1. $router.push("name")
    2. $router.push({path:"name"})
    3. $router.push({path:"name?a=123"})或者
       $router.push({path:"name",query:{a:123}})
    4. $router.go(1) 可以传正负数，表示前后
## 命名路由和命名视图
   命名路由：就是给路由一个name值，值就是路由配置文件中的path值
   <router-link :to="{name: 'cart', params: {cartId: 123}}"></router-link>params就是动态路由的参数，注意这个时候to要动态，使用v-bind:to，可以缩写为:to

    命名视图：就是给router-view一个name值，具体用法
    1. 在路由配置文件中：
        {
            path: '/',
            name: 'Goods',
            components: {
                default: Goods,
                title: Title,
                img: Img
            }
        }
    2. 在vue文件中调用：
        <router-view></router-view>
        <router-view name="title"></router-view>
        <router-view name="img"></router-view>
## 对于ES6中的rest参数即...m的遍历
    我们可以使用ES6新增的语法：
    for(var i of m) {}

## 可以通过express server快速生成一个express环境
    1. morgan模块就是进行日志输出的

## nodejs get和post取参的区别
    get: req.params.name
    post: req.body.name

## nodejs中的model模型中，没有定义的属性，直接使用user.productNum是添加不了的

## 查看是否登录，就需要查看当前的路由，捕获路由的方法
    1. req.originalUrl =='/users/login'
    2. req.originalUrl.indexOf('/goods/list')>-1
    3. req.path == '/goods/list'
    == 表示路径
    indexOf表示请求的完整路由
    像分页这种动态参数的路由，需要使用indexOf

## nodejs的登录拦截功能实现方法
   在使用路由前，先use一个函数(use可以当成一个中间件，但是里面是函数的话，可以先执行这个函数)
   函数里面去从cookie里面取登录后填进去的字段，如果有，就next向下继续调用中间件，如果没有，可以
   重定向到登录页面，或者给出提示，让用户自己选择

## vue中父向子传递数据
   1. 父组件在调用的子组件中：:mdShow="mdShowCart" mdShow是子组件需要接收的变量名，mdShowCart是
   父组件传递给子组件的
   2. 子组件接收：props: ['mdShow']
## 子组件触发父组件的函数(方法)
    父组件在子组件中：@close="closeModal"
    子组件触发的方法：this.$emit('close')
    此时触发的就是父组件的closeModal方法

## nodejs中如果登录需要使用session的方式，需要下载一个express-session的包，具体使用可以百度

## 回车触发事件的功能(比如实现回车登录功能)
   使用@keyup.enter这个事件触发就可以

## vue全局过滤器与局部过滤器的定义
    全局：在main.js中引入封装好的过滤器函数，然后
        Vue.filter("name", name)
    局部：在组件中引入封装好的过滤器函数，然后
        filters: {
            name: name
        }
    注意：第一个是你使用的时候的过滤器名称，第二个是你封装的函数名称，
        第二个参数一定是一个函数
