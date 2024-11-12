<template>
    <Nevbar class="bg-[#BFD9F0]  " >
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9000]">
        <div class="loader"></div> 
      </div>
      <div class="relative w-[1340px]   mx-auto overflow-hidden m-4 shadow-md">
        <div class="flex transition-transform duration-500 ease-in-out mt-[6rem] rounded-md shadow-md" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="min-w-full h-[400px] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md shadow-md">
                <img src="/src/img/advertgif1.gif" alt="Promotion 1" class="object-cover h-full w-full rounded-md shadow-md " />
            </div>
            <div class="min-w-full h-[400px] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md shadow-md">
                <img src="/src/img/advertgif2.gif" alt="Promotion 2" class="object-cover h-full w-full rounded-md shadow-md" />
            </div>
            <div class="min-w-full h-[400px] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md shadow-md">
                <img src="/src/img/advertgif3.gif" alt="Promotion 3" class="object-cover h-full w-full rounded-md shadow-md" />
            </div>
        </div>

        
        <button @click="prevSlide" class="absolute left-0 top-1/2 mt-[3rem] transform -translate-y-1/2 bg-gray-800 text-white p-2">
            &#10094;
        </button>

      
        <button @click="nextSlide" class="absolute right-0 top-1/2 transform mt-[3rem] -translate-y-1/2 bg-gray-800 text-white p-2">
            &#10095;
        </button>

        <!-- Dots Navigation -->
        <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            <span v-for="n in totalSlides" :key="n"
                @click="goToSlide(n - 1)"
                :class="{ 'bg-black': currentIndex === n - 1, 'bg-gray-500': currentIndex !== n - 1 }"
                class="w-3 h-3 rounded-full cursor-pointer"></span>
        </div>
      </div>
        <div class="flex  justify-center my-8 mx-[6rem]">
            
          <div  class="bg-[#E1F5FE] p-4 rounded-2xl shadow-lg w-[100%]">
            <div v-for="doctor in doctors" :key="doctor._id">

              <button @click="openModal(doctor)" class="bg-white px-6 pb-2 pt-6 rounded-lg w-full mb-4 transition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300">
                <div class="w-3/5 flex">
                  <img :src="doctor.photo" alt="Doctor Photo" class="w-[10vw] h-[11vw] mr-4 drop-shadow-xl object-cover object-top rounded-2xl" />
                  <div class="flex-auto ">
                    <div class="text-xl font-bold  items-center text-left mb-5">{{ doctor.prefix }} {{ doctor.firstName }} {{ doctor.lastName }}</div>

                    <div class="flex mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="w-[1.1vw] h-[1.1vw]  mr-2" fill="#16B37F">
                        <path d="M192 48c0-26.5 21.5-48 48-48L400 0c26.5 0 48 21.5 48 48l0 464-80 0 0-80c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 80-80 0 0-464zM48 96l112 0 0 416L48 512c-26.5 0-48-21.5-48-48L0 320l80 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L0 288l0-64 80 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L0 192l0-48c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 48-80 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l80 0 0 64-80 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l80 0 0 144c0 26.5-21.5 48-48 48l-112 0 0-416 112 0zM312 64c-8.8 0-16 7.2-16 16l0 24-24 0c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l24 0 0 24c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-24 24 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-24 0 0-24c0-8.8-7.2-16-16-16l-16 0z"/>
                      </svg>{{ doctor.hospital }}</div>
                    <div class="flex mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[1.1vw] h-[1.1vw]  mr-2">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                        <path fill="#9575CD" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/>
                      </svg>
                      {{ doctor.specialization }}
                    </div>
                    <div class="flex mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-[1.1vw] h-[1.1vw]  mr-2">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                        <path fill="#F9A825" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                      </svg>
                      4.95 (267 รีวิว)
                    </div>
                    <div class="flex mb-4">
                      <div class="mr-4 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[1.1vw] h-[1.1vw]  mr-2">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                          <path fill="#d1c4e9" d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                        </svg>
                        ฿ 400
                      </div>
   
                    </div>
                  
                  </div>
                </div>
              </button>
            </div>




          </div>
        </div>

        <div v-if="isModalOpen"  class="Detail-modal  ">
          <div class="modal-bg mt-4"></div>
          
          <div class="flex justify-center relative  ">
            <button class="btn-close absolute z-[200] right-[30dvw] top-5" @click="closeModal">
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[2.2vw] h-[2.2vw] min-w-[2vw] min-h-[2vw] " fill="#adadad">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>

              </button>
              <div class="flex justify-center flex-col bg-[#E1F5FE] w-full max-w-[40dvw] h-[80dvh] m-[10px]  relative rounded-2xl p-6 shadow-lg">
              <div class=" mb-4 text-center ">
                  <span class="font-bold text-xl">{{ selecteddoctor.prefix}} {{ selecteddoctor.firstName }} {{ selecteddoctor.lastName }}</span>
              </div>
              
              <div class="flex flex-col  flex-wrap gap-4 justify-center md:justify-start">
                  <div class="h-[25dvh] mx-auto w-[11dvw]">
                               <img :src="selecteddoctor.photo"
                      alt="Doctor Image"
                      class="w-full h-full  object-cover object-center rounded-lg">       
                  </div>

                  
                  <div class="flex flex-col flex-grow ml-3">
                  <div class="flex items-center mb-2">
                      <span class="font-bold mr-2">รพ.ที่สังกัด :</span>
                      <span>{{selecteddoctor.hospital}}</span>
                  </div>
                  <div class="flex items-center mb-2">
                      <span class="font-bold mr-2">คะแนนรีวิว :</span>
                      <span>4.95 (267 รีวิว)</span>
                  </div>
                  <div class="flex items-center mb-1">
                      <span class="font-bold mr-2">ประเภทการรักษา :</span>
                      <span>{{ selecteddoctor.specialization}}</span>
                  </div>
                  <div class="flex flex-col mt-3">
                      <span class="font-bold text-lg">ความชำนาญ</span>
                      <ul class="list-disc list-inside">
                      <li>{{ selecteddoctor.specialization}}</li>
                      <!-- Add more specialties here if needed -->
                      </ul>
                  </div>
          
                  <!-- คุณวุฒิทางการศึกษา Section Moved Here -->
                  <div class="flex flex-col mt-3">
                      <span class="font-bold text-lg mb-2">คุณวุฒิทางการศึกษา</span>
                      <ul class="list-disc list-inside">
                      <li>{{ selecteddoctor.education}}    </li>

                      <!-- Add more qualifications here if needed -->
                      </ul>
                  </div>
          
                  <div class="flex flex-col mt-3">
                      <span class="font-bold text-lg mb-2">ค่าบริการ</span>
                      <ul class="list-disc list-inside">
                   
                      <li>แชท: ฿500 (สุงสุด 20 นาทีต่อครั้ง)</li>
                      
                      <!-- Add more qualifications here if needed -->
                      </ul>
                  </div>
                  </div>
              </div>
              </div>
          </div>
          <div class="flex justify-center items-center  w-full max-w-[40dvw]  mb-[10rem] mt-2 gap-4 mx-auto">

          <button @click="bookAppointment(selecteddoctor)" class="bg-green-500 text-white flex items-center justify-center px-5 py-[0.8rem] rounded-2xl text-xl w-1/2" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 mr-2" fill="currentColor ">
              <path d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1 96 192c0 53 43 96 96 96s96-43 96-96l0-120.9-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1L352 192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112l0-70.7c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 70.7c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192L32 71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
          </svg>
          พบแพทย์ทันที
          </button>
          <button @click="goToDoctorDetail(selecteddoctor._id)" class="bg-white border border-green-500 text-green-500 flex items-center justify-center px-5 py-[0.8rem] rounded-2xl text-xl w-1/2 " >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512 " fill="currentColor" class="w-6 h-6 mr-2">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.<path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
          นัดแพทย์ล่วงหน้า
          </button>
          </div>        
        </div>

        <div class="my-[10rem]">
        </div>
    </Nevbar>
  </template>
  
<script setup>
import Nevbar from '@/layout/Nevbar.vue';
import { ref, onMounted, onUnmounted, computed, watch} from 'vue';
import axios from 'axios';  
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const doctorId = '';
const isModalOpen = ref(false);
const router = useRouter()
const currentIndex = ref(0);
const totalSlides = ref(3); 
let intervalId = null;

const selecteddoctor=ref(null)
const loading =ref(false)
const doctors = ref([]);



const bookAppointment = async (selecteddoctor) => {
  const userStore = useUserStore();
  const userData = userStore.user; 
  console.log(selecteddoctor._id);
  console.log(userData._id);

  if (!userData._id) {
    console.error("User ID is undefined");
    return; 
  }

  const appointmentData = {
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    birthdate: userData.birthdate,
    gender: userData.gender,
    profileImage: userData.profileImage,
    userId: userData._id, 
    doctorId: selecteddoctor._id, 
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-[0.7rem]",
      cancelButton: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-[0.7rem]",
    },
    buttonsStyling: false,
  });

  
  const result = await swalWithBootstrapButtons.fire({
    title: "ปรึกษากับแพทย์ท่านนี้ ใช่หรือไม่?",
    text: "คุณต้องการปรึกษาแพทย์แพทย์ท่านนี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ปรึกษาทันที!",
    cancelButtonText: "ไม่ ยกเลิก",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    try {
      
      const response = await axios.post('http://localhost:3000/api/appointments', appointmentData);
      console.log('Appointment created:', response.data);

     



      loading.value = true; 
      setTimeout(() => {
        loading.value = false; 
        document.body.style.overflow = ''; 
        router.push({ name: 'userchat', params: { doctorId: selecteddoctor._id } });
      }, 1000);



    } catch (error) {
      console.error('Error creating appointment:', error.response.data);

      
      swalWithBootstrapButtons.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถปรึกษาแพทย์ได้",
        icon: "error",
      });
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    
    swalWithBootstrapButtons.fire({
      title: "ยกเลิกการปรีกษาแพทย์",
      text: "การเข้าปรึกษาถูกยกเลิก",
      icon: "error",
    });
  }
};



    const openModal = (doctor) => {
      selecteddoctor.value = doctor;
      isModalOpen.value = true;
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      selecteddoctor.value = null;
      isModalOpen.value = false;
      document.body.style.overflow = '';
    };


    const goToDoctorDetail = (doctorId) => {
    loading.value = true;

  setTimeout(() => {
    try {
      router.push({ name: 'appointment', params: { id: doctorId } }); 
      document.body.style.overflow = ''; 
    } catch (error) {
      console.error('Error navigating:', error);
    } finally {
      loading.value = false; 
    }
  }, 1000); 
};


const fetchDoctors = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/doctors');
    doctors.value = response.data;
    console.log('Doctors fetched:', response.data); 
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

const  selectDoctor=(doctor) =>{
      
    router.push({ name: 'chatdoctor', params: { doctorId: doctor._id } });
};



const goToSlide = (index) => {
  currentIndex.value = index;
  resetAutoScroll();
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
  resetAutoScroll();
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
  resetAutoScroll();
};

const startAutoScroll = () => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 10000); // Auto-scroll every 10 seconds
};

const stopAutoScroll = () => {
  clearInterval(intervalId);
};

const resetAutoScroll = () => {
  stopAutoScroll();
  startAutoScroll();
};

onMounted(() => {
  startAutoScroll();
  fetchDoctors();
  document.body.style.overflow = '';
});

onUnmounted(() => {
  stopAutoScroll();
  
});

const navigateTo = async (page) => {
  loading.value = true;

  setTimeout(async () => {
    try {
      await router.push(page); // ใช้ router.push เพื่อเปลี่ยนหน้า
    } catch (error) {
      console.error('Error navigating:', error);
    } finally {
      loading.value = false; // ปิดการโหลดเมื่อทำเสร็จ
    }
  }, 700); // หน่วงเวลา 700ms ก่อนที่จะเปลี่ยนหน้า
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
  .Detail-modal{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 100;

  
}
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
    margin-right: 0.5rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .mt-6 {
    margin-top: 1.5rem;
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
  .btn-close {
    cursor: pointer;
    transition: 0.3s;
    width: auto;
height: auto;
  }
</style>

  