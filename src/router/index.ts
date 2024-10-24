import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import AuthLayout from '../layouts/AuthLayout.vue';
import AppLayout from "@/layouts/AppLayout.vue";

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
                component: () => import('../pages/dashboard/Dashboard.vue'),
            },
            {
                name: 'history',
                path: 'history',
                component: () => import('../pages/history/History.vue'),
            },
            {
                name: 'schedule',
                path: 'schedule',
                component: () => import('../pages/scheduler/NewSchedule.vue')
            },
            {
                name: 'upload',
                path: 'upload',
                component: () => import('../pages/upload/UploadSchedule.vue'),
            },
            {
                name: 'stats',
                path: 'stats',
                component: () => import('../pages/stats/Stats.vue'),
            },
            {
                name: 'settings',
                path: 'settings',
                component: () => import('../pages/settings/Settings.vue'),
            },
            {
                name: 'profile',
                path: 'profile',
                component: () => import('../pages/profile/Profile.vue'),
            },
            {
                name: 'constraints',
                path: 'constraints:constraint?',
                props: true,
                component: () => import('../pages/constraints/ModConstraints.vue')
            }
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
            {
                path: '',
                redirect: { name: 'login' },
            },
        ]
    },

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

export default router
