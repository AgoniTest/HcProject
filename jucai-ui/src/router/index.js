import Vue from 'vue'
import Router from 'vue-router'
import AboutSys from '../views/userManage/System.vue'
import UserInfo from '../views/userManage/UserInfo.vue'
import UserBase from '../views/userManage/UserBase.vue'
import NotFound from '@/views/404'
import LoginView from '../views/LoginView.vue'
import Layout from '../views/Layout/Index.vue'

Vue.use(Router)


//此VueRouter是自己自定义引入暴露出来的，即是自定义的，以下的VueRouter同样是这样
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export const asyncRouterMap = [{
        path: '/',
        name: 'dashboard',
        component: Layout,
        hidden: true,
        redirect: '/home',
        children: [{
            path: '/home',
            name: 'home',
            meta: { title: 'commen.Home Page', icon: 'fa fa-home fa-lg', requireAuth: true },
            component: () =>
                import ('@/views/Home.vue')
        }]
    },
    {
        path: '/login',
        name: 'Login',
        hidden: false,
        component: LoginView
    }, {
        path: '/404',
        name: 'notFound',
        hidden: false,
        component: NotFound
    }, {
        path: '/user',
        component: Layout,
        redirect: '/userInfo',
        hidden: false,
        children: [{
                path: '/userinfo',
                name: 'userInfo',
                meta: { title: 'commen.Personal Center', requireAuth: true },
                component: UserInfo
            },
            {
                path: '/userbase',
                name: 'base',
                meta: { title: 'commen.Change Password', requireAuth: true },
                component: UserBase
            }, {
                path: '/system',
                name: 'system',
                meta: { title: 'commen.About System', requireAuth: true },
                component: AboutSys
            }
        ]
    },
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: asyncRouterMap
})

router.beforeEach((to, from, next) => {

    //登录成功以后，会把用户存在回话
    //存在时间为会话生命周期，页面关闭即失效
    let username = sessionStorage.getItem("userName")
    if (to.path == '/login') {
        next();
    } else {
        username ? next() : next({ path: '/login' })
    }
})



export default router