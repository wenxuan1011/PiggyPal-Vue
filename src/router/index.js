import { createRouter, createWebHistory } from 'vue-router'
// import the component that we created
import LogIn from '../views/loginView.vue'
import SignUp from '../views/signupView.vue'
import MainPage from '../views/mainView.vue'
import AccounTing from '../views/accounting.vue'
import ProJect from '../views/project.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: AccounTing
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    component: MainPage
  },
  {
    path: '/accounting',
    name: 'accounting',
    component: AccounTing
  },
  {
    path: '/project',
    name: 'project',
    component: ProJect
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
