import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import AuthLayout from '../layouts/AuthLayout.vue';
import AppLayout from "../layouts/AppLayout.vue";
import axios from "axios";
import {useUserStore} from "../stores/user-store";


const routes: Array<RouteRecordRaw> = [
    {
        name:'home',
        path: '/',
        component: AppLayout,
        props: true,
        children: [
            {
                name:'dashboard',
                path: 'dashboard',
                component: () => import('../pages/dashboard/DashBoard.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'history',
                path: 'history',
                component: () => import('../pages/history/History.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'schedule',
                path: 'schedule',
                component: () => import('../pages/scheduler/NewSchedule.vue'),
                meta: {
                    requiresAuth: true,
                    requiresAdminPrivileges: true
                }
            },
            {
                name: 'upload',
                path: 'upload',
                component: () => import('../pages/upload/UploadSchedule.vue'),
                meta: {
                    requiresAuth: true,
                    requiresAdminPrivileges: true
                }
            },
            {
                name: 'settings',
                path: 'settings',
                component: () => import('../pages/settings/Settings.vue'),
                meta: {
                    requiresAuth: true,
                    requiresAdminPrivileges: true,
                }
            },
            {
                name: 'profile',
                path: 'profile',
                component: () => import('../pages/profile/Profile.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                name: 'constraints',
                path: 'constraints:constraint?',
                props: true,
                component: () => import('../pages/constraints/ModConstraints.vue'),
                meta: {
                    requiresAuth: true,
                    requiresAdminPrivileges: true,
                }
            },
        ]
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                name: 'login',
                path: 'login',
                component: () => import('../pages/auth/Login.vue'),
            },
            {
                name: 'signup',
                path: 'signup',
                component: () => import('../pages/auth/Signup.vue'),
            },
            {
                name: 'recover-password',
                path: 'recover-password',
                component: () => import('../pages/auth/RecoverPassword.vue'),
            },
            {
                name: 'recover-password-email',
                path: 'recover-password-email',
                component: () => import('../pages/auth/CheckTheEmail.vue'),
            },
        ]
    },
    {
        path: '',
        redirect: {name: 'login'}
    }

]


const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        // For some reason using documentation example doesn't scroll on page navigation.
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        } else {
            window.scrollTo(0, 0)
        }
    },
    routes,
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (to.name == 'login' || to.name == 'signup' || to.name == 'recover-password' || to.name == 'recover-password-email') {
        axios
            .get('http://localhost:8000/api/scheduler/logout');
        userStore.loggedIn = false;
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userStore.loggedIn) {
            next({
                name: 'login',
            })
        }
        else {
            next()
        }
    } else {
        next()
    }
})

export default router
