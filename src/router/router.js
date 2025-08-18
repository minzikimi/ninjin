import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";
import Profile from "../views/Profile.vue";
import Community from "../views/Community.vue";

const routes = [
  { path: '/', component: Login },   
  { path: '/signup', component: SignUp },
  { path: '/home', component: Home },
  { path: '/chat', component: Chat },
  { path: '/community', component: Community },
  { path: '/profile', component: Profile },
];


const router = createRouter({
    history : createWebHistory(),
    routes,
})

export default router;