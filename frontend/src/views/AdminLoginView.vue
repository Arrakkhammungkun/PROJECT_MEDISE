<template>
          <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="loader "></div> 
      </div>
    <div class="flex items-center justify-center  min-h-screen bg-cover bg-center bg-no-repeat bg-gray-100 bg-[url('./img/bg-img.jpeg')]">
    <div class="absolute inset-0 bg-black  min-h-[100dvh] opacity-50 "></div>
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-40">
        <h2 class="text-2xl font-bold text-center mb-6">Login Admin</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="username"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div class="text-sm text-gray-400 text-end mr-[0.7rem] mt-2">
            <RouterLink :to="{name : 'home'}" >

                Home
            </RouterLink>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { RouterLink } from 'vue-router';
  import Swal from 'sweetalert2';
  import { ref } from "vue";

  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    setup(){
      const loading =ref(false)

      return{
        loading
      }
    },
    methods: {
      async login() {
        this.loading = true;
        try {
          const response = await axios.post('http://localhost:3000/admin/login', {
            email: this.username,
            password: this.password,
          });
     


          localStorage.setItem('adminToken', response.data.token); 
            setTimeout(() => {
                this.loading = false; 

                
                Swal.fire({
                  icon: "success",
                  title: "เข้าสู่ระบบสำเร็จ",
                  confirmButtonText: 'ตกลง' 
                }).then((result) => {
                
                  if (result.isConfirmed) {
                    this.$router.push('/editproduct'); 
                  }
                });
              }, 1500);
          
        } catch (error) {
          console.error('Login error:', error);
          setTimeout(() => {
              this.loading = false; 

              
              Swal.fire({
                icon: "error",
                title: "เข้าสู่ระบบไม่สำเร็จ",
                text: "กรุณาตรวจสอบข้อมูลท่านอีกครั้ง",
                confirmButtonText: 'ตกลง' 
              })
            }, 1500);
        }
      },
    },
  };
  </script>

<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #25b09b;
  animation: l15 1s infinite linear;
  z-index: 9999;
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
  