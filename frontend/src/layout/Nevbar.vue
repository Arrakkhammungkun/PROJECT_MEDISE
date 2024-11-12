<template>
  <div>
    <div class="app">
      <header
        class="navbar z-50 fixed top-0 left-0 w-screen h-[5.3rem] bg-gradient-to-r from-[#4285F4] 0 to-[#264D8E] shadow-md transition-transform duration-100 ease-out p-6 px-14 flex justify-between items-center"
        :class="{ 'navbar--hidden translate-y-[-100%] shadow-none': !showNavbar }"
      >
        <RouterLink to="/" class="ml-[9rem]">
          <img class="w-16 h-16" src="../img/iconLogo.png" alt="icon">
        </RouterLink>
        <nav class="flex items-center gap-5 ">
          <RouterLink 
            :to="{ name: 'home' }"   
            class="text-white  no-underline  hover:text-[#10DBAC] transition-colors duration-500 ease-in-out text-[2.2vh]"
            :class="{ 'text-[#10DBAC]': activeLink === 'home' }"
            @click="navigate('home')"
          >
            หน้าหลัก
          </RouterLink>

          <RouterLink 
            :to="{ name: 'doctor' }" 
            class="text-white  no-underline hover:text-[#10DBAC] transition-colors duration-500 ease-in-out text-[2.2vh]"
            :class="{ 'text-[#10DBAC]': activeLink === 'doctor' }"
            @click="navigate('doctor')"
          >
            พบแพทย์
          </RouterLink>

          <RouterLink 
            :to="{ name: 'product' }" 
            class="text-white  no-underline hover:text-[#10DBAC] transition-colors duration-500 ease-in-out text-[2.2vh]"
            :class="{ 'text-[#10DBAC]': activeLink === 'product' }"
            @click="navigate('product')"
          >
            สินค้า
          </RouterLink>





          <RouterLink 
            :to="{ name: 'cart' }" 
            class="text-white  no-underline hover:text-[#10DBAC] mr-[-1rem] transition-colors flex items-center duration-500 ease-in-out text-[2.2vh]"
            :class="{ 'text-[#10DBAC]': activeLink === 'cart' }"
            @click="navigate('cart')"
          >
          <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl" style="color: #ffffff;" />
          </RouterLink>

          <div class="dropdown dropdown-end ">
            <div tabindex="0" role="button" class="btn btn-ghost rounded-btn "
            >

            <div v-if="user">
              <img v-if="user.profileImage" :src="user.profileImage" class="w-[2.3rem] h-[2.3rem] bg-white border-[1px] rounded-full" alt="Profile Image">
              <img v-else src="../img/person.png" class="w-[2.3rem] h-[2.3rem] bg-white border-[1px] rounded-full" alt="Profile Image">

            </div>
            <div v-else>
              <img src="../img/person.png" class="w-[2.5rem] h-[2.5rem] bg-white border-[1px] rounded-full" alt="Profile Image">

            </div>

            </div>
              <ul
                tabindex="0"
                class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                <li v-if="!isLoggedIn">
                  <RouterLink :to ="{name:'login'}">
                    <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
                    เข้าสู่ระบบ
                  </RouterLink>
                </li>
                <li class="flex">
                  
                  <RouterLink :to="{name:'profileuser'}" >
                    <font-awesome-icon class="w-[1rem]" :icon="['fas', 'user']" />
                    บัญชี
                  </RouterLink>
                </li>
                <!-- <li>
                  <a>
                    <font-awesome-icon :icon="['fas', 'stethoscope']" />
                    ผลการรักษา
                  </a>
                </li> -->
                <li>
                  <button @click="handleNavigation">
                    <font-awesome-icon :icon="['fas', 'shop']" />
                    จัดการหลังบ้าน
                  </button>
                </li>
                <li v-if="isLoggedIn">
                  <a @click="logout">
                    <font-awesome-icon :icon="['fas', 'power-off']" />
                    ออกจากระบบ
                  </a>
                </li>
              </ul>
          </div>

          <!-- <RouterLink 
            :to="{ name: 'login' }" 
            aria-label="เข้าสู่ระบบ"  
            class="ml-8 bg-white rounded-full"
          >
            <img class="w-12 h-12 bg-white rounded-full" src="../img/person.png" alt="">
          </RouterLink> -->
        </nav>
      </header>
    </div>
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="loader"></div> 
      </div>
    <slot></slot>
    <div>
      <footer class="footer min-w-min bg-[#3E296A] text-base-content p-10">
        <aside class="ml-[5rem]">
          <img class="w-20 h-20 my-[-1rem] ml-[8rem]" src="../img/iconLogo.png" alt="icon">
          <p class="w-64 ml-[3rem] my-[1rem] text-white">
            เว็ปสำหรับการพบหมอออนไลน์ตั้งแต่พบแพทย์เพื่อให้คำปรึกษา สั่งยา เก็บประวัติและติดตามผล ให้บริการหลากหลายในด้านผิวทุกส่วนต่าง ๆ อาทิ ปรึกษาเรื่องสิว ชนิดผิวพรรณแต่ละประเภท รวมไปถึงผมและหนังศีรษะ
            <br />
          </p>
        </aside>
        <nav>
          <h6 class="footer-title text-white">LINKS</h6>
          <a class="link link-hover text-white">-หน้าหลัก</a>
          <a class="link link-hover text-white">-พบแพทย์</a>
          <a class="link link-hover text-white">-สินค้า</a>
          <a class="link link-hover text-white">-ตะกร้าสินค้า</a>
          <a class="link link-hover text-white">-ผลการรักษา</a>
        </nav>
        <nav>
          <h6 class="footer-title text-white">CONTACT</h6>
          <a class="link link-hover text-white">ติดต่อลงโฆษณา</a>
          <a class="link link-hover text-white">โทร : 089 XXX XXXX</a>
          <a class="link link-hover text-white">หรือ : 098 XXX XXXX</a>
          <a class="link link-hover text-white">อีเมลล์ : XXXXXXXgmail.com</a>
        </nav>
      </footer>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/counter.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, nextTick,onMounted } from 'vue'
import { computed,watchEffect } from 'vue'
import axios from "axios";
import Swal from 'sweetalert2'; 

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const activeLink = ref(route.name)
    const loading =ref(false)
    const userStore = useUserStore()

    const isLoggedIn = computed(() => userStore.user !== null)
    // const isAdmin = computed(() => userStore.isAdmin());
    const isAdmin = computed(() => userStore.adminToken !== null);

    watchEffect(() => {
      userStore.adminToken = localStorage.getItem('adminToken');
    });

    console.log("admin",isAdmin.value)
    const handleNavigation = () => {
      if (isAdmin.value) {
        router.push({ name: 'editproduct' });
      } else {
        router.push({ name: 'admin-login' });
      }
    };
    const user = computed(() => userStore.user);
    const logout = () => {
      loading.value = true; 

      setTimeout(() => {
        userStore.clearUser();
        loading.value = false; 
        router.push({ name: 'login' }); 
      }, 1450); 
    }
    function navigate(linkName) {
      router.push({ name: linkName }).then(() => {
        nextTick(() => {
          activeLink.value = linkName
        })
      })
    }
    onMounted(() => {
 
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      userStore.setUser(storedUser, token);
    }
    });



    return { logout, isLoggedIn, userStore, activeLink, navigate, user,loading,handleNavigation}
  },
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }

      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 40) {
        return
      }

      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  }
}

</script>
<style >
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #25b09b;
  animation: l15 1s infinite linear;
}
.loader::before,
.loader::after {    
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
}
@keyframes l15{ 
  100%{transform: rotate(1turn)}
}
</style>