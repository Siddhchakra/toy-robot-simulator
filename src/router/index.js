import { createRouter, createWebHistory } from 'vue-router';

// view components
const Home = () => import('../views/Home');
const Simulator = () => import('../views/Simulator');
const PageNotFound = () => import('../views/PageNotFound');

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/simulator',
    name: 'Simulator',
    component: Simulator
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
