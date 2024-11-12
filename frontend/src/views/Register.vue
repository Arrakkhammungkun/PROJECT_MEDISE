<template>
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="loader"></div> 
      </div>
  <div
    class="bg-gray-100 h-screen flex items-center justify-center bg-[url('./img/backgroundlogIn.jpg')] bg-cover"
  >
    <div class="absolute inset-0 bg-black opacity-30"></div>
    <div
      class="bg-white shadow-lg z-20 rounded-l-[30px] min-h-[30rem] border-black rounded-2xl flex w-full max-w-4xl"
    >
      <!-- Right side (Description) -->
      <div
        class="w-1/2 p-8 bg-[#10DBAC] text-white flex items-start border-[2px] border-black justify-center rounded-2xl"
      >
        <div class="text-center flex flex-col  justify-center mt-[2rem]">
          <div class="flex justify-center flex-col">
            <h2 class="text-[2.7rem] w-[16rem] mt-[5rem] font-bold text-black">
              มีบัญชีแล้ว
            </h2>
            <h1 class="text-[2rem] w-full ml-1 font-bold mb-2 text-black">
              ใช่หรือไม่ ?
            </h1>
          </div>
          <div>
            <p class="text-[1.5rem] text-black">เข้าสู่ระบบเลยตอนนี้</p>
          </div>

          <div class="mt-4">
            <RouterLink :to="{ name: 'login' }">
              <button
                class="bg-white h-[3.3rem] w-[17dvw] text-black text-[1.5rem] rounded-[50rem] hover:bg-[#656565] transition-all duration-300"
              >
                เข้าสู่ระบบ
              </button>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Left side (Sign Up) -->
      <div class="w-1/2 p-8 flex flex-col items-center mt-[-1rem]">
        <h1 class="text-[1.8rem] font-bold mb-4">สมัครสมาชิก</h1>
        <form @submit.prevent="handleSignUp" class="space-y-[12px]">
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              type="text"
              id="firstname"
              v-model="student.firstname"
              class="grow"
              placeholder="Firstname"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              type="text"
              id="lastname"
              v-model="student.lastname"
              class="grow"
              placeholder="Lastname"
            />
          </label>
          <div>
            <label class="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                />
              </svg>
              <input
                type="email"
                id="email"
                v-model="student.email"
                class="grow"
                placeholder="Email"
              />
            </label>
          </div>


          <div>
            <label
              class="input input-bordered flex items-center gap-2 w-[22rem]"
            >
              <font-awesome-icon :icon="['fas', 'cake-candles']" />
              <input
              
                v-model="student.birthdate"
                type="date"
                placeholder="เลือกวันเกิด"
                class="grow text-gray-500"
              />
            </label>
          </div>
          <div>
            <label
              class="input input-bordered flex items-center gap-2 w-[22rem]"
            >
              <font-awesome-icon :icon="['fas', 'venus']" />
              <select
                v-model="student.gender"
                name=""
                id=""
                class="select-input w-[30rem] text-gray-500 ml-[-0.5rem] h-[52px] p-[10px] rounded-[10px] border-solid border-2 "
              >
              
                <option class="text-gray-500" value="">เพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </label>
          </div>


          
          <div>
            <label
              class="input input-bordered flex items-center gap-2 w-[22rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                type="password"
                v-model="student.password"
                class="grow"
                placeholder="Password"
              />
            </label>
          </div>
          <div>
            <label
              class="input input-bordered flex items-center gap-2 w-[22rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm Password"
                class="grow"
              />
            </label>
          </div>


          <div class="flex justify-center">
            <button
              type="submit"
              class="text-[1.5rem] mt-1 text-black bg-gradient-to-b from-[#00d6a8] to-[#00af89] h-[3rem] w-[15dvw] rounded-[50rem] hover:bg-gradient-to-b hover:from-[#00af89] hover:via-[#008c73] hover:to-[#006e5c] transition-all duration-300"
            >
              สมัครสมาชิก
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      result: {},
      student: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        birthdate:"",
        gender:"",
      },
      confirmPassword: "",
    };
  },
  setup(){
    const loading =ref(false)



    return{
      loading
    }
  },
  mounted() {
    console.log("mounted() called....");
  },
  methods: {
    
    handleSignUp() {
      this.loading = true; 

      if (
        this.student.firstname &&
        this.student.lastname &&
        this.student.email &&
        this.student.password &&
        this.student.password === this.confirmPassword
      ) {
        this.saveData();
        
      } else {
              setTimeout(() => {
              this.loading = false; 

              
              Swal.fire({
                icon: "error",
                title: "สมัครการใช้ไม่สำเร็จ",
                text: "กรุณาตรวจสอบข้อมูลท่านอีกครั้ง",
                confirmButtonText: 'ตกลง' 
              })
            }, 1500);
          }
    },
    saveData() {
      
      axios
        .post("http://localhost:3000/student/create", this.student)
        .then(({ data }) => {
          setTimeout(() => {
              this.loading = false; 

              
              Swal.fire({
                icon: "success",
                title: "สมัครการใช้งานสำเร็จ",
                confirmButtonText: 'ตกลง' 
              }).then((result) => {
               
                if (result.isConfirmed) {
                  this.$router.push("/login");
                }
              });
            }, 1500);
          
        })
        .catch((error) => {
          console.error(error);
          alert("Error saving data");
        });
    },
  },
};
</script>
<style scoped>
.select-input {
  border: none; /* ลบกรอบ */
  outline: none; /* ลบเส้นขอบเมื่อเลือก */
  padding: 0.5rem; /* เพิ่ม padding ตามต้องการ */
  background: transparent; /* ลบพื้นหลัง */
  flex: 1; /* ทำให้ขนาดของ select เต็มที่ */
  font-size: 1rem; /* ขนาดฟอนต์ */
  height: 100%; /* ทำให้ขนาดของ select สูงเต็มที่ */
  box-sizing: border-box; /* คำนวณขนาดรวม padding */
}

.input {
  display: flex;
  align-items: center;
}
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
