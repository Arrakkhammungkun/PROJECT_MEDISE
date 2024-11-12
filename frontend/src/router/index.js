import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Register from '@/views/Register.vue'
import HomePageView from '@/views/HomePageView.vue'
import AddcategoryView from '@/views/AddcategoryView.vue'
import AddProductView from '@/views/AddProductView.vue'
import ProductView from '@/views/ProductView.vue'
import TestView from '@/views/TestView.vue'
import OrderView from '@/views/OrderView.vue'
import CartView from '@/views/CartView.vue'
import EditProductView from '@/views/EditProductView.vue'
import { useUserStore } from '@/stores/counter'
import ProflieUserView from '@/views/ProflieUserView.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: HomePageView
  },
  {
    path: '/addcategory',
    name: 'addcategory',
    component: AddcategoryView
  },
  {
    path: '/addproduct',
    name: 'addproduct',
    component: AddProductView
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
   
  },
  {
    path: '/order:id',
    name: 'order',
    component: OrderView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/editproduct',
    name: 'editproduct',
    meta: { requiresAuth: true },
    component: EditProductView
  },
  {
    path: '/profileuser',
    name: 'profileuser',
    component: ProflieUserView 
  },
  {
    path: '/mangedocter',
    name: 'mangedocter',
    component: ()=>import ('@/views/Mange_DocterView.vue')
  },
  {
    path: '/h',
    name: 'h',
    component: ()=>import ('@/views/HomePageView.vue')
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: ()=>import ('@/views/DoctorView.vue')
  },
  {
    path: '/appointment/:id',
    name: 'appointment',
    component: ()=>import ('@/views/AppoinmentView.vue')
  },
  {
    path: '/videochat',
    name: 'videochat',
    component: ()=>import ('@/views/VedioChatView.vue')
  },
  {
    path: '/callvedio',
    name: 'callvedio',
    component: ()=>import ('@/views/CalledioView.vue')
  },
  {
    path: '/ceate',
    name: 'ceate',
    component: ()=>import ('@/views/ceateView.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: ()=>import ('@/views/MessageView.vue')
  },
  {
    path: '/chatdoctor/:doctorId/:userId',
    name: 'chatdoctor',
    props: true,
    component: ()=>import ('@/views/DoctorChatView.vue')
  },
  {
    path: '/doctorcontack/:doctorId',
    name: 'doctorcontack',
    props: true,
    component: ()=>import ('@/views/doctorContackView.vue')
  },
  {
    path: '/userchat/:doctorId',
    name: 'userchat',
    props: true,
    component: ()=>import ('@/views/UserChatView.vue')
  },
  {
    path: '/productedit/:id',
    props:true,
    name: 'productedit',
    component: ()=>import ('@/views/ProductEditView.vue')
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: ()=>import ('@/views/AdminLoginView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = localStorage.getItem('token');
  const tokenAdmin =localStorage.getItem('adminToken')

  if (to.meta.requiresAuth && !tokenAdmin) {
    return next({ name: 'admin-login' });
  }
 


  const protectedRoutes = ['addcategory', 'addproduct', 'cart', 'product','profileuser','doctor','appointmentr'];

  if (protectedRoutes.includes(to.name)) {
    if (!userStore.user && !token) {
      next({ name: 'login' }); // เปลี่ยนเส้นทางไปที่หน้า login ถ้าไม่มี user หรือ token
    } else if (token) {
      try {
        const response = await axios.get('/validate-token', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          userStore.setUser(response.data.user); // เก็บข้อมูลผู้ใช้ใน store
          next();
        } else {
          localStorage.removeItem('token');
          userStore.clearUser();
          next({ name: 'login' });
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        userStore.clearUser();
        next({ name: 'login' });
      }
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router
