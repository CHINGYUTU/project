import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ()=> import('../components/Home.vue'),
            //主頁
        },
        {
            path: '/login',
            name: 'login',
            component: ()=> import('../views/login/index.vue'),
            //登入
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('../views/register/index.vue'),
            //註冊
        }
    ]
})

export default router;

