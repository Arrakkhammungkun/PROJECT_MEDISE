<template>
  <AdminBar>
    <div id="header " class="min-h-[10dvh]">
      <div
        class="relative min-h-[140dvh] mt-[6rem] bg-[url('./img/product.jpeg')] bg-cover bg-center drop-shadow-md"
      >
        <div>
          <div class="absolute inset-0 bg-black opacity-50"></div>

          <div class="flex justify-center relative z-10">
            <form @submit.prevent="handleSubmit" class="z-10 w-[50rem]">
              <div class="relative w-auto justify-center flex">
                <div
                  class="absolute inset-0 bg-[#AAA8A8] opacity-50 z-0 mt-[4.5rem] h-[43rem] mx-8 rounded-xl"
                ></div>

                <div class="justify-center my-[8rem]">
                  <h1
                    class="text-[2vw] mt-[-2rem] relative mb-5 font-bold tracking-wider text-center text-[#ffffff]"
                  >
                    แบบฟอร์มบันทึกสินค้า
                  </h1>
                  <div
                    v-if="errors.length > 0"
                    class="alert alert-error"
                    role="alert"
                  >
                    <ul>
                      <li v-for="(error, index) in errors" :key="index">
                        {{ error.msg }}
                      </li>
                    </ul>
                  </div>
                  <div class="relative w-auto justify-self-start flex my-[5px]">
                    <div class="justify-center mb-1">
                      <label
                        for="name"
                        class="text-lg ml-[2px] font-bold text-white"
                        >ชื่อสินค้า</label
                      >
                      <br />
                      <input
                        type="text"
                        v-model="name"
                        id="name"
                        required
                        placeholder="ชื่อสินค้า"
                        class="w-[643px] h-[46px] p-[10px] rounded-md border-solid border-2 border-black"
                      />
                    </div>
                  </div>
                  <div class="relative w-auto justify-self-start flex">
                    <div class="justify-center mb-1">
                      <label
                        for="name"
                        class="text-[1.3vw] ml-[2px] font-bold text-white"
                        >ราคา</label
                      >
                      <br />
                      <input
                        type="number"
                        v-model="price"
                        id="price"
                        required
                        min="1"
                        placeholder="ราคา"
                        class="w-[643px] h-[46px] p-[10px] rounded-md border-solid border-2 border-black"
                      />
                    </div>
                  </div>
                  <div class="relative w-auto justify-self-start flex">
                    <div class="justify-center mb-1">
                      <label class="text-[1.3vw] ml-[2px] font-bold text-white"
                        >รายละเอียด</label
                      >
                      <br />
                      <textarea
                        v-model="description"
                        id="description"
                        class="w-[643px] h-[97px] p-[10px] rounded-md border-solid border-2 border-black"
                        placeholder="รายละเอียด"
                      ></textarea>
                    </div>
                  </div>
                  <div class="relative w-auto justify-self-start flex">
                    <div class="justify-center mb-2">
                      <label class="text-[1.3vw] ml-[2px] font-bold text-white"
                        >หมวดหมู่สินค้า</label
                      >
                      <br />
                      <select
                        v-model="category"
                        id="category"
                        class="w-[643px] h-[52px] p-[10px] rounded-md border-solid border-2 border-black"
                      >
                        <option disabled class="text-gray-400" value="">
                          เลือกหมวดหมู่สินค้า
                        </option>
                        <option
                          v-for="cat in categories"
                          :key="cat._id"
                          :value="cat._id"
                        >
                          {{ cat.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="relative w-auto justify-self-start flex">
                    <div class="justify-center mb-1">
                      <label class="text-[1.3vw] ml-[2px] font-bold text-white"
                        >ลิงก์รูปภาพ</label
                      >
                      <br />
                      <input
                        type="url"
                        v-model="img"
                        id="img"
                        placeholder="ป้อนลิ้งค์รูปภาพ"
                        class="w-[643px] h-[46px] p-[10px] rounded-md border-solid border-2 border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      class="text-white bg-[#34A853] relative w-[154px] h-[48px] p-[10px] rounded-[10px] border-solid my-[20px] ml-[490px] text-[1.3vw] hover:bg-[#25823e]"
                    >
                      บันทึกข้อมูล
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class=""></div>
  </AdminBar>
</template>

<script>
import axios from "axios";
import AdminBar from "@/layout/AdminBar.vue";
import Swal from "sweetalert2";

export default {
  components: {
    AdminBar,
  },
  data() {
    return {
      name: "",
      description: "",
      price: "",
      img: "",
      category: "",
      errors: [],
      categories: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/add"
      );
      this.categories = response.data;
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  },
  methods: {
    async handleSubmit() {
      this.errors = [];
      try {
        const response = await axios.post(
          "http://localhost:3000/api/product/add",
          {
            name: this.name,
            description: this.description,
            price: this.price,
            img: this.img,
            category: this.category,
          }
        );
        await Swal.fire({
          title: "บันทึกสินค้าสำเร็จ",
          text: "ข้อมูลสินค้าของคุณถูกบันทึกเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        this.$router.push("/editproduct");
        this.name = "";
        this.description = "";
        this.price = "";
        this.img = "";
        this.category = "";
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped></style>
