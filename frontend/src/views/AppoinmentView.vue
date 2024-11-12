<template>
    <Nevbar class="bg-[#ADD8E6] ">
  <div>
    <div class="grow flex justify-center ">
      
      <div
        class="left grid grid-cols-1 divide-y divide-black "
        style="background-color: antiquewhite"
      >
        <ul class="menu-list grid grid-cols-1 divide-y divide-black">
          <li v-for="(item, index) in filteredMenu" :key="index">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </div>

     
      <div v-if="doctors " class="mt-[15dvh]">
        <div 
          class="bg-[#E1F5FE] w-full max-w-[800px] min-w-[50dvw] h-auto mb-10 inline-block relative rounded-2xl p-6 shadow-lg"
        >
          <div  class="mb-4 text-left">
            <span class="font-bold text-xl">{{ doctors.prefix }} {{doctors.firstName}} {{doctors.lastName}}</span>
          </div>

          <div class="flex flex-wrap  gap-4 justify-center md:justify-start">
            <img
              :src="doctors.photo"
              alt="Doctor Image"
              class="w-full max-w-[15rem] h-[40dvh] object-cover object-center rounded-lg"
            />

            <div class="flex flex-col flex-grow mt-1  ml-5">
              <div class="flex items-center mb-[0.7rem]">
                <span class="font-bold mr-2"> รพ.ที่สังกัด : </span>
                <span> {{doctors.hospital}}</span>
              </div>
              <div class="flex items-center mb-[0.7rem]">
                <span class="font-bold mr-2">คะแนนรีวิว : </span>
                <span> 4.95 (267 รีวิว)</span>
              </div>
              <div class="flex items-center mb-[0.7rem]">
                <span class="font-bold mr-2">ประเภทการรักษา : </span>
                <span> {{doctors.specialization}}</span>
              </div>
              <div class="flex flex-col mt-4 mb-[0.7rem]">
                <span class="font-bold text-lg">ความชำนาญ</span>
                <ul class="list-disc list-inside">
                  <li>{{doctors.specialization}}</li>
                  <!-- Add more specialties here if needed -->
                </ul>
              </div>

              <div class="flex flex-col mt-6">
                <span class="font-bold text-lg mb-2">ค่าบริการ</span>
                <ul class="list-disc list-inside">
                  <li>วิดิโอคอล: ฿500 </li>

                  <!-- Add more qualifications here if needed -->
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h2 class="font-bold text-2xl">เลือกวันนัดหมาย</h2>
        <div
          class="p-8 max-w-4xl mx-auto bg-[#E1F5FE] rounded-xl shadow-lg space-y-6 mb-10"
        >
          <!-- Month and Year Selectors -->
          <div class="flex justify-between items-center mb-4">
            <select
              v-model="currentMonth"
              @change="updateCalendar"
              class="text-xl bg-white border-2 p-3 rounded-lg"
            >
              <option
                v-for="(month, index) in monthNames"
                :key="index"
                :value="index"
              >
                {{ month }}
              </option>
            </select>
            <select
              v-model="currentYear"
              @change="updateCalendar"
              class="text-xl bg-white border-2 p-3 rounded-lg"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <!-- Days of the Week -->
          <div class="grid grid-cols-7 text-center font-semibold text-lg mb-2">
            <div v-for="day in weekDays" :key="day" class="py-2">{{ day }}</div>
          </div>

          <!-- Days in the Month -->
          <div class="grid grid-cols-7 text-center gap-2">
            <!-- Blank spaces for the days before the start of the month -->
            <div
              v-for="blank in firstDayOfMonth"
              :key="blank"
              class="py-4"
            ></div>

            <!-- Days of the current month -->
            <div
              v-for="day in daysInMonth"
              :key="day"
              :class="{
                'bg-green-500 text-white rounded-full': isSelectedDate(day),
                'text-gray-500 cursor-not-allowed': isPastDate(day),
                'cursor-pointer hover:bg-blue-100':
                  !isSelectedDate(day) && !isPastDate(day),
              }"
              @click="selectDate(day)"
              class="py-4 px-2 text-lg"
            >
              {{ day }}
            </div>
          </div>

          <!-- Display Selected Appointment Date -->
          <div
            v-if="selectedDate"
            class="mt-4 text-center text-xl font-semibold"
          >
            คุณเลือกวันที่: {{ formattedSelectedDate }}
          </div>
        </div>
        <h class="font-bold text-2xl mb-4">เลือกเวลานัดหมาย</h>
        <div class="p-4 rounded-lg shadow-lg mb-10 bg-[#E1F5FE]">
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="(time, index) in times"
              :key="index"
              :class="{
                'p-2   border-2  rounded-lg text-center hover:bg-green-300': true,
                'bg-green-500 text-white': selectedTime === time,
                'text-gray-400 cursor-not-allowed': isPastTime(time),
              }"
              @click="selectTime(time)"
              :disabled="isPastTime(time)"
            >
              {{ time }}
            </button>
          </div>
          <div
            v-if="selectedTime"
            class="mt-4 text-lg font-semibold text-center"
          >
            คุณได้เลือกเวลา: {{ selectedTime }}
          </div>
        </div>
        <div class="flex justify-center items-center w-full mt-4 gap-4 mb-5">
          <button
          @click="close()"
            class="bg-red-700 text-white flex items-center justify-center px-6 py-4 rounded-2xl text-xl w-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              class="w-6 h-6 mr-3"
            >
              !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2024
              Fonticons, Inc.
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
              />
            </svg>
            ยกเลิกการนัดหมาย
          </button>
          <button
            class="bg-green-500 border border-green-500 text-white flex items-center justify-center px-6 py-4 rounded-2xl text-xl w-1/2"
            @click="confirmAppointment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512 "
              fill="currentColor"
              class="w-6 h-6 mr-3"
            >
              !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license/free Copyright 2024
              Fonticons, Inc.
              <path
                d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"
              />
            </svg>
            ยืนยันการนัดหมาย
          </button>
        </div>
        <div
          v-if="showConfirmation"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="bg-white p-10 rounded-xl shadow-lg text-center">
            <h2 class="text-2xl font-bold mb-4">ยืนยันการเลือก</h2>
            <p class="text-lg">
              คุณได้เลือกวันที่: {{ formattedSelectedDate }}
            </p>
            <p class="text-lg">เวลา: {{ selectedTime }}</p>
            <button
              @click="closeModal"
              class="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg mr-5"
            >
              ยกเลิก
            </button>
            <button
              @click="bookAppointment(doctors[selectedDoctorIndex])"
              class="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg"
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="my-[15rem]" ></div>
</Nevbar>
</template>

<script>
import Nevbar from "@/layout/Nevbar.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/counter';
import Toast from 'sweetalert2';

export default {
  components: {
    Nevbar,
  },
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDate: null,
      weekDays: [
        "อาทิตย์",
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัสบดี",
        "ศุกร์",
        "เสาร์",
      ],
      monthNames: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      years: Array.from(
        { length: 101 },
        (_, i) => new Date().getFullYear() - 50 + i
      ),

      times: [
        "09:00 น.",
        "19:40 น.",
        "20:00 น.",
        "20:20 น.",
        "20:40 น.",
        "21:00 น.",
        "21:20 น.",
        "22:40 น.",
      ],
      selectedTime: null,
      currentDateTime: new Date(),
      activeComp: "",
      showConfirmation: false, // เพิ่ม property นี้เพื่อใช้ในการแสดง Modal
    };
  },
  setup() {
    const doctors = ref(null);
    const selectedDate = ref(null);
    const selectedTime = ref(null);
    const showConfirmation = ref(false);
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const id = route.params.id; 

    const fetchDoctors = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/doctors/Appointment/${id}`);
        doctors.value = response.data;
        console.log('Doctors fetched:', response.data); 
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    const close = async ()=>{
      await Toast.fire({
        icon: "error",
        title: "ยกเลิกการนักหมาย"
        });
        router.push({ name: 'doctor'  });
    }
    const bookAppointment = async (selecteddoctor) => {
      const userData = userStore.user;

      if (!selectedDate.value || !selectedTime.value) {
        console.error("กรุณาเลือกวันและเวลา");
        return;
      }

      const appointmentTime = `${selectedDate.value.toISOString().split('T')[0]} ${selectedTime.value}`;

      const appointmentData = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        birthdate: userData.birthdate,
        gender: userData.gender,
        profileImage: userData.profileImage,
        userId: userData._id,
        doctorId: doctors.value._id,
        appointmentTime: appointmentTime,
      };
      console.log('Appointment data:', appointmentData);
      try {
        const response = await axios.post('http://localhost:3000/api/appointments', appointmentData);
        console.log('Appointment created:', response.data);
        await Toast.fire({
        icon: "success",
        title: "นัดหมายแพทย์สำเร็จ"
        });
        router.push({ name: 'doctor'  });
      } catch (error) {
        if (error.response) {
            console.error('Error creating appointment:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error creating appointment:', error.message);
          }
      }
    };

    onMounted(() => {
      if (id) {
        fetchDoctors(id);
      }
    });

    return {
      doctors,
      fetchDoctors,
      bookAppointment,
      selectedDate,
      selectedTime,
      showConfirmation,
      close
    };
  },
  computed: {
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    firstDayOfMonth() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    formattedSelectedDate() {
      if (!this.selectedDate) return "";
      const day = this.selectedDate.getDate();
      const month = this.monthNames[this.selectedDate.getMonth()];
      const year = this.selectedDate.getFullYear();
      return `${day} ${month} ${year}`;
    },
  },
  methods: {
    isToday(day) {
      const today = new Date();
      return (
        today.getDate() === day &&
        today.getMonth() === this.currentMonth &&
        today.getFullYear() === this.currentYear
      );
    },
    isSelectedDate(day) {
      return (
        this.selectedDate &&
        this.selectedDate.getDate() === day &&
        this.selectedDate.getMonth() === this.currentMonth &&
        this.selectedDate.getFullYear() === this.currentYear
      );
    },
    isPastDate(day) {
      const today = new Date();
      const date = new Date(this.currentYear, this.currentMonth, day);
      return date < today.setHours(0, 0, 0, 0); // Compare without time to only consider date
    },
    selectDate(day) {
      if (!this.isPastDate(day)) {
        this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      }
    },
    updateCalendar() {
      this.selectedDate = null; // Clear selected date when month/year changes
    },
    selectTime(time) {
      if (!this.isPastTime(time)) {
        this.selectedTime = time;
      }
    },
    isPastTime(time) {
      if (!this.selectedDate) return true; // ไม่ให้เลือกเวลาถ้ายังไม่ได้เลือกวันที่

      const [hours, minutes] = time.split(" ")[0].split(":").map(Number);
      const selectedDateTime = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        this.selectedDate.getDate(),
        hours,
        minutes
      );
      return selectedDateTime < new Date(); // ตรวจสอบว่าเวลาที่เลือกนั้นเป็นอดีตหรือไม่
    },
    confirmAppointment() {
      if (this.selectedDate && this.selectedTime) {
        this.showConfirmation = true; // แสดง Modal เมื่อกดยืนยันการนัดหมาย
      }
    },
    closeModal() {
      this.showConfirmation = false; // ปิด Modal เมื่อกดปุ่มตกลง
    },
  },
};
</script>


<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

/* Create a column layout with Flexbox */
.row {
  display: flex;
}

/* Left column (menu) */
.left {
  flex: none;
  padding: 0px 0;
}

.left h2 {
  padding-left: 8px;
}

/* Right column (page content) */
.right {
  flex: 65%;
  padding: 15px;
}

/* Style the search box */

/* Style the navigation menu inside the left column */
.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-list li a {
  padding: 12px;
  text-decoration: none;
  color: black;
  display: block;
}

.menu-list li a:hover {
  background: linear-gradient(90deg, #4285f4ff 0%, #264d8eff 100%);
}

/* Utility classes for spacing, text formatting, and layout */
.flex {
  display: flex;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-grow {
  flex-grow: 1;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-start {
  justify-content: flex-start;
}
.mr-2 {
  margin-right: 0rem;
}
.mb-2 {
  margin-bottom: 0rem;
}
.mb-4 {
  margin-bottom: 0rem;
}
.mt-4 {
  margin-top: 0rem;
}
.mt-6 {
  margin-top: 0rem;
}
.list-disc {
  list-style-type: disc;
}
.list-inside {
  list-style-position: inside;
}
.bg-white {
  background-color: #fff;
}
.p-6 {
  padding: 1.5rem;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-2xl {
  border-radius: 1rem;
}
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
/* Responsive Design */
@media (max-width: 768px) {
  .flex-wrap {
    flex-direction: column;
  }
  .justify-center {
    justify-content: center;
  }
}

.grid-cols-7 {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

/* Responsive styles for smaller screens */
@media (max-width: 640px) {
  .text-xl {
    font-size: 0.875rem; /* Adjusting the font size */
  }

  .text-lg {
    font-size: 0.75rem; /* Adjusting the font size */
  }

  /* Adjust padding and margins */
  .p-8 {
    padding: 1rem;
  }

  .py-4 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .px-2 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  .mb-4 {
    margin-bottom: 0.5rem;
  }

  /* Adjust grid gaps */
  .gap-2 {
    gap: 0.25rem;
  }

  /* Abbreviate day names */
  .grid-cols-7 > div {
    font-size: 0.75rem;
  }
}

/* Full screen styles */
@media (min-width: 641px) {
  .text-xl {
    font-size: 1.25rem; /* Original size */
  }

  .text-lg {
    font-size: 1rem; /* Original size */
  }

  /* Adjust padding and margins */
  .p-8 {
    padding: 2rem;
  }

  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  /* Adjust grid gaps */
  .gap-2 {
    gap: 0.5rem;
  }

  /* Full day names */
  .grid-cols-7 > div {
    font-size: 1rem;
  }
}
</style>
