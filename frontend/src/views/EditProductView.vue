<template>
    <AdminBar class="bg-[#E1F5FE] min-h-screen rounded-b-lg shadow-md">
      
    
    <div class="">
          
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="loader"></div> 
      </div>
      <div class=" px-36 py-24   ">
        <h3 class="text-[2.7vw] font-medium italic mt-5">จัดการสินค้า</h3>
        <p class="mb-4 mt-1 italic text-[1.3vw] ">สามารถเพิ่มแก้ไขข้อมูลสินค้าหรือลบได้</p>
  
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-[#10DBAC]">

                <th class="border border-gray-400 p-2">#</th>
                <th class="border border-gray-400 p-2">ชื่อสินค้า</th>
                <th class="border border-gray-400 p-2">ราคา</th>
                <th class="border border-gray-400 p-2">รายละเอียด</th>
                <th class="border border-gray-400 p-2 w-3">ลบ</th>
                <th class="border border-gray-400 p-2 w-2">แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item,index in items" :key="item._id">

                <td class="border bg-white border-gray-400 p-2 w-1 text-center ">{{ index +1 }}</td>
                <td class="border bg-white border-gray-400 p-2 w-40 ">{{ truncate(item.name, 15) }}</td>
                <td class="border bg-white border-gray-400 p-2 w-20 text-center">{{ numberWithCommas(item.price) }}</td>
                <td class="border bg-white border-gray-400 p-3">{{ truncate(item.description,170) }}</td>
                <td class="border bg-white border-gray-400 p-2  ">
                  <button
                    @click="handleDelete(item._id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    ลบ
                  </button>
                </td>
                <td class="border bg-white border-gray-400 p-2">
                  <button
                    @click="handleEdit(item._id)"
                    class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    แก้ไข
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="mt-4 mx" style="float: right">
          <button
            @click="navigateTo('/addproduct')"
            class="bg-black text-white px-11 py-2 rounded hover:bg-[#10DBAC]"
          >
            เพิ่มสินค้า
          </button>
        </div>
      </div>
    </div>
    <div class="my-[10rem]">

    </div>
  </AdminBar>
  </template>
  
  <script>
  import AdminBar from '@/layout/AdminBar.vue';
  import axios from 'axios';
  import { RouterLink } from 'vue-router';
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import { useRouter } from 'vue-router';

  export default {
    components:{
      AdminBar
    },
    data() {
      return {
        items: [] ,
        loading: false,
      };
    },
    setup(){
      const router = useRouter()

      return{
        router
      }
    },
    async mounted() {
      try {
        
        const response = await axios.get('http://localhost:3000/api/product');
        this.items = response.data;
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    },
    methods: {
      async handleDelete(id) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-[0.7rem]",
            cancelButton: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-[0.7rem]"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons
          .fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณจะไม่สามารถย้อนกลับได้!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่ ลบออก!",
            cancelButtonText: "ไม่ ยกเลิก!",
            reverseButtons: true
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              try {
                await axios.delete(`http://localhost:3000/api/product/${id}`);
                this.items = this.items.filter(item => item._id !== id);
                swalWithBootstrapButtons.fire({
                  title: "ลบสำเร็จ!",
                  text: "สินค้าของคุณถูกลบออกแล้ว.",
                  icon: "success"
                });
              } catch (error) {
                console.error('Failed to delete product', error);
                swalWithBootstrapButtons.fire({
                  title: "เกิดข้อผิดพลาด",
                  text: "ไม่สามารถลบสินค้าได้",
                  icon: "error"
                });
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: "ยกเลิก",
                text: "สินค้าของคุณยังปลอดภัย :)",
                icon: "error"
              });
            }
          });
      },
      handleEdit(id) {
        this.$router.push(`/productedit/${id}`);

      },

      handleAdd() {
        this.$router.push('/addproduct');
      },
      truncate(text, length = 50) {
      if (text.length <= length) return text;
      return text.slice(0, length) + '...';
     },

      numberWithCommas  (x)  {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async navigateTo(page) {
      this.loading = true; 

      setTimeout(async () => {
        try {
          await this.$router.push(page); 
        } finally {
          this.loading = false; 
        }
      }, 700); 
    }
      
    
  
  }
    
    
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
  