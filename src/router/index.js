import Router from 'vue-router'
import Vue from 'vue'
import Nav from '../components/Nav.vue'
import LineHeight from '../components/LineHeight.vue'
import WriteToast from '../components/WriteToast.vue'
import Flex from '../components/Flex.vue'
import Form from '../components/FormValidate.vue'
import UseIcon from '../components/UseIcon.vue'
const Index = () => import(/* webpackChunkName: "index" */ '../pages/Index.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../pages/Login.vue')

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            redirect: '/index'
        },
        {
            path: '/',
            component: Nav
        },
        {
            path: '/line-height',
            component: LineHeight
        },
        {
            path: '/write-toast',
            component: WriteToast
        },
        {
            path: '/flex',
            component: Flex
        },
        {
            path: '/form',
            component: Form
        },
        {
            path: '/icon',
            component: UseIcon
        }
    ]
})
