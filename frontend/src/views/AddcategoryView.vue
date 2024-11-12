<template>
  <div class="flex justify-start ml-[10rem] gap-[50px]">
    <div class="mt-[100px]">
      <ul class="menu bg-base-200 rounded-box w-56">
        <li v-for="category in categories" :key="category._id"><a>{{ category.name }}</a></li>
      </ul>
    </div>
    <div class="flex  bg-slate-100 mx-[15rem] mt-[5rem]">

      <div class="row">
        <div class="col-lg-9 my-4">
          <h2 align="center">แบบฟอร์มบันทึกหมวดหมู่สินค้า</h2>
          <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
            <ul>
              <li v-for="(error, index) in errors" :key="index">
                {{ error.msg }}
              </li>
            </ul>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label class="" for="name">ชื่อหมวดหมู่</label>
              <input
                type="text"
                v-model="name"
                id="name"
                class="form-control bg-slate-300"
                required
              />
            </div>
            <button type="submit" class="btn btn-success">บันทึกข้อมูล</button>
          </form>
        </div>
        <!-- /.col-lg-9 -->
      </div>
      <!-- /.row -->
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      errors: [],
      categories: []
    };
  },
  async mounted() {
    
    try {
      const response = await axios.get("http://localhost:3000/api/categories/add");
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
          "http://localhost:3000/api/categories/add",
          {
            name: this.name,
          }
        );
        alert("บันทึกสำเร็จ");
        this.name = "";
        
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

<style scoped>
/* Add any additional styles here */
</style>
