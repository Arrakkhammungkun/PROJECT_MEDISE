<template>
  <AdminBar >
    <div
      class="min-h-[110dvh] mt-[5rem]  flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('./img/product.jpeg')]"
    >
      <div class="absolute inset-0 bg-black mt-[5rem] min-h-[110dvh] opacity-50"></div>
      <div
        class="bg-[#AAA8A8] bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-xl   z-10"
      >
        <h2 class="text-white text-3xl font-bold mb-6 text-center z-20">
          แก้ไขสินค้า
        </h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4 ">
            <label
              class="block text-white text-md font-bold mb-2"
              for="productName"
            >
              ชื่อสินค้า
            </label>
            <input
              type="text"
              v-model="productName"
              id="productName"
              class="shadow  appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>

          <div class="mb-4 ">
            <label class="block text-white text-sm font-bold mb-2" for="price">
              ราคา
            </label>
            <input
              type="text"
              v-model="price"
              id="price"
              class="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="description"
            >
              รายละเอียด
            </label>
            <textarea
              v-model="description"
              id="description"
              class="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="image">
              ลิงก์รูปภาพ
            </label>
            <input
              type="text"
              v-model="image"
              id="image"
              class="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
            />
          </div>

          <div class="text-center ">
            <button
              type="submit"
              class="bg-[#34A853] hover:bg-[#25823e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style="float: right"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>

  </AdminBar>
</template>

<script>
import AdminBar from "@/layout/AdminBar.vue";
import axios from "axios";
import { onMounted } from "vue";
import Swal from "sweetalert2";
export default {
    props: ['id'],
  components: {
    AdminBar,
  },
  data() {
    return {
      ProductId:this.$route.params.id,
      productName: "",
      price: "",
      description: "",
      image: "",
    };
  },
  methods: {
    async fetchProduct(){
   
      try{
        const response = await axios.get(`http://localhost:3000/api/product/${this.ProductId}`);
        const Product =response.data;

        
        this.productName=Product.name
        this.price=Product.price
        this.description=Product.description
        this.image=Product.img
      }catch(error){
        console.log('Error fetching product:', error)
      }
    },
    async submitForm(){
      try{
        await axios.put(`http://localhost:3000/api/product/${this.ProductId}`,{
          name:this.productName,
          price:this.price,
          description:this.description,
          img:this.image
        });
        await Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          text: "ข้อมูลสินค้าของคุณถูกบันทึกเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        this.$router.push("/editproduct");
        this.name = "";
        this.description = "";
        this.price = "";
        this.image = "";
        

        

      }catch(error){
        console.error('Error updating product:', error);
      }
    }
    

  },
  mounted() {
      console.log("mounted called");
    console.log(this.$route.params);
    this.fetchProduct();
  },
};
</script>

<style scoped></style>
