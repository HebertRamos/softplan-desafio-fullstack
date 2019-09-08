import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import store from '../store'
import * as types from '../store/mutation-types'
import NavBar from '../components/layout/NavBar'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/login/Login'
import UsuarioList from '../components/usuario/UsuarioList'
import UsuarioForm from '../components/usuario/UsuarioForm'

import ProcessoList from '../components/processos/ProcessoList'
import ProcessoForm from '../components/processos/ProcessoForm'

const hasToken = (to, from, next) => {

    const token = localStorage.getItem('JWT')
    const username = localStorage.getItem('username')
    if (token) {
        store.commit(types.LOGIN_SUCCESS, { token, username })
        router.push('/home')
    } else {
        next()
    }
}

const requireAuth = (to, from, next) => {

    if (localStorage.getItem('JWT')) {
        next()
    } else {
        router.push('/login')
    }
}

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.component('NavBar', NavBar)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: hasToken
        },
        {
            path: '/',
            alias: '/home',
            name: 'Home',
            component: HelloWorld,
            beforeEnter: requireAuth
        },
        {
            path: '/usuarios',
            name: 'UsuarioListagem',
            component: UsuarioList,
            beforeEnter: requireAuth
        },
        {
            path: '/usuarios/add',
            name: 'UsuarioAdd',
            component: UsuarioForm,
            meta: {
                page: {
                    title: 'Novo Usuário',
                }
            },
            beforeEnter: requireAuth
        },
        {
            path: '/usuarios/edit/:id',
            name: 'UsuarioEdit',
            component: UsuarioForm,
            meta: {
                page: {
                    title: 'Editar Usuário',
                }
            },
            beforeEnter: requireAuth
        },
        {
            path: '/processos',
            name: 'ProcessoList',
            component: ProcessoList,
            meta: {
                page: {
                    title: 'Processos',
                }
            },
            beforeEnter: requireAuth
        },
        {
            path: '/processos/add',
            name: 'ProcessoAdd',
            component: ProcessoForm,
            meta: {
                page: {
                    title: 'Novo Processo',
                }
            },
            beforeEnter: requireAuth
        }
    ]
})

export default router