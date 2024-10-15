import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ()=> import('../views/home/index.vue'),
            //主頁
        },
        {
            path: '/login',
            name: 'login',
            component: ()=> import('../views/login/index.vue'),
            meta: { hideTopBar: true }
            //登入
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('../views/register/index.vue'),
            meta: { hideTopBar: true }
            //註冊
        },
        {
            path: '/info/:id',
            name: 'info',
            component: ()=> import('../views/info/index.vue'),
            props: true
        },
        {
            path: '/adminPage',
            name: 'adminPage',
            component: ()=> import('../views/adminPage/index.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/member',
                    name: 'member',
                    component: ()=> import("../views/adminPage/components/member.vue"),
                },
                {
                    path: '/notReviewed',
                    name: 'notReviewed',
                    component: ()=> import("../views/adminPage/components/notReviewed.vue"),
                }
            ]
        },
        {
            path: '/userProfile',
            name: 'userProfile',
            component: ()=> import('../views/userProfile/index.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/landlordPage',
            name: 'landlordPage',
            component: ()=> import('../views/landlordPage/index.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/404',
            name: '404Page',
            component: ()=> import('../views/404/index.vue'),
        },
        {
            path: '/post',
            name: 'postHouse',
            component: ()=> import('../views/post/index.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('session'); // 假設你將用戶資訊存在 localStorage 中

    // 如果用戶已登入且試圖訪問登入頁面，重定向到主頁或其他頁面
    if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        next({ path: '/' }); // 這裡可以改成其他需要重定向到的路由
    } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        // 如果路由需要身份驗證且用戶未登入，則重定向到登入頁面
        next({ path: '/login' });
    } else {
        next(); // 繼續路由
    }
});

export default router;

