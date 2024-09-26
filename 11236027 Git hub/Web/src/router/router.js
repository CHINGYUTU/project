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
    ]
})

export default router;

