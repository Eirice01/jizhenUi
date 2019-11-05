import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)
// 此处代码用来解决3.0cli下3.1+ vue-router 在正确跳转后刷新页面包错（NavigationDuplicated报错）
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    // base: '/platform',
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: to => {
                return '/index'
            },
            children: [
                {
                    path: '/index',
                    component: () => import('@/views/navList/Index'),
                    name: 'index'
                },
                {
                    path: '/infolist',
                    component: () => import('@/components/InfoList/Infolist'),
                    name: 'info',
                    meta: { keepAlive: true }
                },
                {
                    path: '/details',
                    component: () => import('@/views/index/Details'),
                    name: 'details'
                }
            ]
        },
        {
            path: '/mianPage',
            component: () => import('@/views/index/mianPage'),
            name: 'mianPage'
        },
        {
            path: '/error',
            component: () => import('@/views/index/error'),
            name: 'error'
        },
        {
            path: '/login',
            component: () => import('@/common/Login/login'),
            name: 'login',
            meta: { loginBack: false }
        },
        {
            path: '/ielogin',
            component: () => import('@/common/Login/ieLoginInfo'),
            name: 'ielogin'
        },
        {
            path: '/system',
            component: () => import('@/views/System/index'),
            name: 'system',
            children: [
                {
                    path: '/curation',
                    component: () => import('@/components/System/ContentOfcuration/ContentOfCuration'),
                    name: 'curation',
                    meta: { loginBack: false }
                },
                {
                    path: '/application',
                    component: () => import('@/components/System/Application/ApplicationOfSystem'),
                    name: 'application'
                },
                // {
                //     path: '/partmanagement',
                //     component: () => import('@/components/System/PartManagement/PartManagement'),
                //     name: 'partmanagement'
                // }
                {
                    path: '/departList',
                    component: () => import('@/components/userCenter/DepartList'),
                    name: 'departList'
                },
                {
                    path: '/userManagement',
                    component: () => import('@/components/userCenter/UserManagement'),
                    name: 'userManagement'
                },
                {
                    path: '/software',
                    component: () => import('@/components/System/SoftwareDownload/SoftwareDownload'),
                    name: 'software'
                }
            ]
        }
    ]
})
