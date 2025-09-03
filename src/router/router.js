import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ItemListing from "../views/ItemListing.vue"
import Chat from "../views/Chat.vue";
import Profile from "../views/Profile.vue";
import Community from "../views/Community.vue";
import ItemPost from "../views/ItemPost.vue";
import ItemPostUpdate from "../views/ItemPostUpdate.vue";
import Home from "../views/Home.vue";

const routes = [
  { path: '/', component: Home }, 
   { path: '/login', component: Login },    
  { path: '/signup', component: SignUp },
  { path: '/itemlisting', component: ItemListing },
  { path: '/chat', component: Chat },
  { path: '/community', component: Community },
  { path: '/profile', component: Profile },
  { path: '/itempost', component: ItemPost },
  { path: '/item_post_update', component: ItemPostUpdate },

    
];


const router = createRouter({
    history : createWebHistory(),
    routes,
})

export default router;