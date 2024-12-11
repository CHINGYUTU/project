import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/index.vue"),
      meta: { hideTopBar: true },
    },
    {
      path: "/resPwd",
      name: "resPwd",
      component: () => import("../views/forgetPwd/index.vue"),
      meta: { hideTopBar: true },
    },
    {
      path: "/verifymail",
      name: "verifymail",
      component: () => import("../views/verifymail/index.vue"),
      meta: { hideTopBar: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register/index.vue"),
      meta: { hideTopBar: true },
    },
    {
      path: "/housepage/:id",
      name: "housepage",
      component: () => import("../views/housepage/index.vue"),
      props: true,
    },
    {
      path: "/respwd/:token",
      name: "respwd",
      component: () => import("../views/resetPwd/index.vue"),
      props: true,
      meta: { hideTopBar: true },
    },

    {
      path: "/adminPage",
      name: "adminPage",
      component: () => import("../views/adminPage/index.vue"),
      meta: { requiresAuth: true, Role: "Admin" },
      children: [
        {
          path: "/admin/member",
          name: "member",
          component: () => import("../views/adminPage/components/member.vue"),
        },
        {
          path: "/admin/notReviewed",
          name: "notReviewed",
          component: () => import("../views/adminPage/components/notReviewed.vue"),
        },
        {
          path: "/admin/userProfile",
          name: "adminUserProfile",
          component: () => import("../components/UserProfile.vue"),
        },
        {
          path: "/admin/ConfirmFeedback",
          name: "adminConfirmFeedback",
          component: () => import("../views/adminPage/components/ConfirmFeedback.vue"),
        },
      ],
    },
    {
      path: "/userPage",
      name: "userPage",
      component: () => import("../views/userPage/index.vue"),
      meta: { requiresAuth: true, Role: "User" },
      children: [
        {
          path: "/user/userProfile",
          name: "userUserProfile",
          component: () => import("../components/UserProfile.vue"),
        },
        {
          path: "/user/favorites",
          name: "favorites",
          component: () => import("../views/userPage/components/FavoritesList.vue"),
        },
        {
          path: "/user/feedback",
          name: "user-feedback",
          component: () => import("../views/userPage/components/ListMyFeedBack.vue"),
        },
      ],
    },
    {
      path: "/landlordPage",
      name: "landlordPage",
      component: () => import("../views/landlordPage/index.vue"),
      meta: { requiresAuth: true, Role: "Landlord" },
      children: [
        {
          path: "/landlord/allPost",
          name: "allPost",
          component: () => import("../views/landlordPage/components/allPostHouses.vue"),
        },
        {
          path: "/landlord/userProfile",
          name: "landlordUserProfile",
          component: () => import("../components/UserProfile.vue"),
        },
        {
          path: "/landlord/ConfirmFeedback",
          name: "landlordConfirmFeedback",
          component: () => import("../views/landlordPage/components/ConfirmFeedback.vue"),
        },
      ],
      //
    },
    {
      path: "/404",
      name: "404Page",
      component: () => import("../views/404/index.vue"),
    },
    {
      path: "/post",
      name: "postHouse",
      component: () => import("../views/post/index.vue"),
      meta: { requiresAuth: true, Role: "Landlord" },
    },
    {
      path: "/imgUpdateTest",
      name: "imgUpdateTest",
      component: () => import("../views/post/components/UploadImage.vue"),
      meta: { requiresAuth: true, Role: "Admin" },
    },
    {
      path: "/verify/:token",
      name: "verify",
      component: () => import("../views/verify/index.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("session");
  const isAuthenticated = !!session;
  const userRole = session ? JSON.parse(session).Role : null;

  // 如果使用者已登入，並試圖訪問登入、註冊或重設密碼頁面，重定向到首頁
  if (isAuthenticated && (to.path === "/login" || to.path === "/register" || to.path === "/resPwd")) {
    next({ path: "/" });
  } else if (isAuthenticated && to.meta.Role && to.meta.Role !== userRole) {
    // 如果使用者已登入但角色不匹配，重定向到首頁
    next({ path: "/" });
  } else if (!isAuthenticated && to.matched.some((record) => record.meta.requiresAuth)) {
    // 如果未登入且路由需要身份驗證，重定向到登入頁
    next({ path: "/login" });
  } else {
    // 否則，繼續路由跳轉
    next();
  }
});

export default router;
