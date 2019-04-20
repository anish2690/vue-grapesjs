import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/Home.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Dashboard.vue'),
		},
		{
			path: '/dashboard1',
			name: 'DashboardCopy',
			component: () => import(/* webpackChunkName: "DashboardCopy" */ './views/dashboard/DashboardTest.vue'),
		},
		{
			path: '/email',
			name: 'email',
			component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Email.vue'),
		},
		{
			path: '/native',
			name: 'native',
			component: () => import(/* webpackChunkName: "native" */ './views/new/TestWithNative.vue'),
		},
	],
});
