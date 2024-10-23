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
            path: '/resPwd',
            name: 'resPwd',
            component: ()=> import('../views/forgetPwd/index.vue'),
            meta: { hideTopBar: true }
        },
        {
            path: '/verifymail',
            name: 'verifymail',
            component: ()=> import('../views/verifymail/index.vue'),
            meta: { hideTopBar: true },
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('../views/register/index.vue'),
            meta: { hideTopBar: true }
            //註冊
        },
        {
            path: '/housepage/:id',
            name: 'housepage',
            component: ()=> import('../views/housepage/index.vue'),
            props: true
        },
        {
            path: '/respwd/:token',
            name: 'respwd',
            component: ()=> import('../views/resetPwd/index.vue'),
            props: true,
            meta: { hideTopBar: true }
        },
        
        {
            path: '/adminPage',
            name: 'adminPage',
            component: ()=> import('../views/adminPage/index.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/admin/member',
                    name: 'member',
                    component: ()=> import("../views/adminPage/components/member.vue"),
                },
                {
                    path: '/admin/notReviewed',
                    name: 'notReviewed',
                    component: ()=> import("../views/adminPage/components/notReviewed.vue"),
                },
                {
                    path: '/admin/userProfile',
                    name: 'adminUserProfile',
                    component: ()=> import("../components/UserProfile.vue"),
                },
            ]
        },
        {
            path: '/userPage',
            name: 'userPage',
            component: ()=> import('../views/userPage/index.vue'),
            meta: { requiresAuth: true },
            children: [

                {
                    path: '/user/userProfile',
                    name: 'userUserProfile',
                    component: ()=> import("../components/UserProfile.vue"),
                },
                {
                    path: '/user/favorites',
                    name: 'favorites',
                    component: ()=> import("../views/userPage/compomemts/FavoritesList.vue"),
                }

            ]
        },
        {
            path: '/landlordPage',
            name: 'landlordPage',
            component: ()=> import('../views/landlordPage/index.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/landlord/allPost',
                    name: 'allPost',
                    component: ()=> import("../views/landlordPage/components/allPostHouses.vue"),
                },
                {
                    path: '/landlord/userProfile',
                    name: 'landlordUserProfile',
                    component: ()=> import("../components/UserProfile.vue"),
                },

            ]
            // 
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
        },
        {
            path: '/imgUpdateTest',
            name: 'imgUpdateTest',
            component: ()=> import('../views/post/components/UploadImage.vue'),
        },
        {
            path: '/verify/:token',
            name: 'verify',
            component: ()=> import('../views/verify/index.vue'),
        },
        
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('session'); // 假設你將用戶資訊存在 localStorage 中

    // 如果用戶已登入且試圖訪問登入頁面，重定向到主頁或其他頁面
    if (isAuthenticated && (to.path === '/login' || to.path === '/register' || to.path === '/resPwd')) {
        next({ path: '/' }); // 這裡可以改成其他需要重定向到的路由
    } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        // 如果路由需要身份驗證且用戶未登入，則重定向到登入頁面
        next({ path: '/login' });
    } else {
        next(); // 繼續路由
    }
});

export default router;

