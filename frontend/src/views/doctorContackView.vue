<template>



  <div  class="min-h-screen bg-[#F0F8FF] flex flex-col items-center">
    
    <section class="relative p-6 bg-[#c8eefa] shadow-md rounded-lg w-10/12 border  top-[6rem]">
      
      <div v-if="doctors" class="flex items-start relative">
        <div class="absolute top-0 left-32 transform -translate-x-1/2 -translate-y-1/2">
          <img :src="doctors.photo" class="h-[12rem] w-[12rem] rounded-full bg-center object-cover `">
        </div>
        
        <div class="flex-grow  ml-60"> 
          <h2 class="text-xl font-bold">{{doctors.prefix}} {{ doctors.firstName }} {{ doctors.lastName }}</h2>
          <div class="flex items-center space-x-2 mt-2">
            <span class="text-gray-500">Status:</span>
            <span class="text-green-500 font-medium">Online</span>
          </div>
          
        </div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-9 h-9 bg-white rounded-lg p-1">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
            <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/>
          </svg>
        </button>
        
      </div>

      <div class="flex justify-between items-center mt-6 border-[4px] bg-white relative top-8 border-[#0296c7] p-4">
        <div class="flex">
          <h3 class="text-lg font-semibold">Queue Room </h3>
          
          <span v-if="appointments.length" class="text-lg font-semibold px-2 text-red-500"> ({{appointments.length}})</span>
        </div>


        <button @click="fetchAppointments()" class="text-black hover:underline flex items-center ml-4">
          ดูทั้งหมด
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      <div v-if="appointments.length " class="space-y-4 mt-16 mb-[1.5rem]  border-black border-[2px] p-4 bg-[#d9f0fa] shadow-xl drop-shadow-lg  rounded-lg mx-8 overflow-auto max-h-[23vw] min-h-[23vw]">

     
        <div v-for="appointment,index in appointments" :key="appointment._id" class="">
          <div v-if="!appointment.appointmentTime">

          
            <button  @click="nextTo(appointment)" class="flex items-stretch justify-between p-2  bg-[#fff]  rounded-lg h-full w-full shadow-md ransition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300">
              <div class="flex items-start text-start">
                <img :src="appointment.profileImage" alt="Profile Image" class="w-20 h-20 border rounded-lg">
                <div class="ml-4 w-48">
                  <p class="font-semibold">{{ appointment.firstname }} {{ appointment.lastname }}</p>
                  <p class="text-sm text-gray-500">อายุ {{calculateAge(appointment.birthdate)}} ปี</p>
                  <p class="text-sm text-gray-500">เพศ {{ appointment.gender }}</p>
                
                </div>
              </div>
              <div class="flex flex-col items-center space-y-2 h-full  ml-auto relative right-7 top-2 ">
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-5 h-5 mr-2">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                    <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM96 75l0-11 192 0 0 11c0 25.5-10.1 49.9-28.1 67.9L192 210.7l-67.9-67.9C106.1 124.9 96 100.4 96 75z"/>
                  </svg>
                  <span class="text-gray-500 ">Waiting...</span>
                </div>
                
                <i class="fas fa-hourglass-half text-gray-500"></i>
                <span class="text-red-500 font-semibold ">{{ formattedTime(waitingTimes[index]) }} </span>
              </div>
            </button>
          </div>

        </div>
        
      </div>
      
      <div v-else class="flex justify-center space-y-4 mt-16 mb-[1.5rem]  border-black border-[2px] p-4 bg-[#d9f0fa] shadow-xl drop-shadow-lg  rounded-lg mx-8  max-h-[23vw] min-h-[23vw]">
        <div class="relative top-[8rem]">
           ไม่มีนัดหมาย
        </div>
       
      </div>
    </section>


    
    

    <section class="mt-[8rem] p-8 bg-[#E1F5FE] shadow-md rounded-lg w-10/12 border border-black">
      <div class="flex justify-between items-center ">
        <h3 class="text-lg font-semibold">นัดหมาย</h3>
      </div>

      <div class="border-t border-black my-2 mx-4"></div>

      <h3 class="text-lg font-semibold">Today's upcoming</h3>
      <div v-if="appointments.length">
        <div v-if="appointments[0].appointmentTime">

        
     
          <div  class="flex grid-cols-1 md:grid-cols-4 gap-8 mt-4 overflow-x-auto whitespace-nowrap ">
                <div v-for="appointment in appointments" :key="appointment._id">
                  <button @click="openModal(appointment)" v-if="appointment.appointmentTime" class="bg-[#BAECFD] pt-2 px-2 pb-3 rounded-lg transition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300 inline-block min-w-[18.8vw]">
                    <div class="flex flex-col flex-wrap items-center justify-center">
                      <div  class="flex items-center">
                        <a class="mr-2 ">เวลานัดหมาย :</a>
                        <p class="text-gray-500 bg-white py-1 px-4 rounded-lg border-2">{{ splitDateTime(appointment.appointmentTime).time }}</p>
                        
                      </div>
                      <p >วันที่ {{ formatDateToThai(splitDateTime(appointment.appointmentTime).date) }}</p>
                      
                    </div>

                    <div class="flex items-center bg-white p-2 rounded-lg mt-2 drop-shadow-xl ">
                      <img :src="appointment.profileImage" alt="Profile Image" class="w-20 h-20 border rounded-lg bg-cover bg-center">
                      <div class="ml-3 text-start relative bottom-3">
                        <span class="font-semibold block truncate max-w-[160px]"> {{appointment.firstname}} {{appointment.lastname}}</span>
                        <p class="text-sm text-gray-500">อายุ {{calculateAge(appointment.birthdate)}} ปี</p>
                        <p class="text-sm text-gray-500">เพศ {{ appointment.gender }}</p>
                        
                      </div>
                    </div>
                  </button>

                </div>




          </div>

      </div>


    </div>
      <div v-else class="my-[5rem] flex items-center justify-center">
        <div>
          ไม่มีนัดหมาย
        </div>
          
      </div>
    </section>

  </div>
  <div v-if="isModalOpen"  class="Detail-modal  ">
          <div class="modal-bg mt-4"></div>
          
          <div class="flex justify-center relative ">
             <button class="btn-close absolute z-[200] right-5 top-5" @click="closeModal">
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[2.2vw] h-[2.2vw] min-w-[2vw] min-h-[2vw] " fill="#adadad">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>

              </button>
              <div class="flex flex-col justify-center bg-[#E1F5FE] w-full max-w-[40dvw] h-[60dvh] m-[10px]  relative rounded-2xl p-6 shadow-lg">
                <div class=" mb-4 text-center ">
                  <span class="font-bold text-2xl relative bottom-[3.5rem]">ข้อมูลผู้นัดหมาย</span>
              </div>
              
              <div class="flex relative  bottom-[2.5rem] flex-wrap gap-4 justify-center md:justify-start">
                  <div class="h-[29dvh] mx-auto w-[11dvw]">
                               <img :src="selectUser?.profileImage"
                      alt="Doctor Image"
                      class="w-full h-full  object-cover object-center rounded-lg">       
                  </div>

                  
                  <div class="flex flex-col flex-grow ml-3">
                  <div class="flex items-center mb-2">
                      <span class=" mr-2">วันนัดหมาย</span>
                      <span class="font-bold text-gray-500 bg-white py-1 px-4 rounded-lg border-2">{{ formatDateToThai(splitDateTime(selectUser?.appointmentTime).date) }}</span>
                  </div>
                  <div class="flex items-center mb-2">
                      <span class=" mr-2">เวลานัดหมาย</span>
                      
                      <span class="font-bold text-gray-500 bg-white py-1 px-4 rounded-lg border-2">{{ splitDateTime(selectUser?.appointmentTime).time }} </span>
                      <span class=" ml-2">โมง</span>
                    </div>

                  <div class="flex items-center mb-2">
                      <span class=" mr-2">ชื่อ </span>
                      <span class="font-bold mr-2 text-gray-500 bg-white py-1 px-4 rounded-lg border-2">{{ selectUser?.firstname }} {{ selectUser?.lastname }}</span>
                     
                  </div>
                  <div class="flex items-center mb-2">
                      <span class=" mr-2">เพศ </span>
                      <span class="font-bold text-gray-500 bg-white py-1 px-4 rounded-lg border-2">{{ selectUser?.gender }}</span>
                  </div>
                  <div class="flex items-center ">
                      <span class="mr-2 ">อายุ </span>
                      <span class="font-bold text-gray-500 bg-white py-1 px-4 rounded-lg border-2"> {{calculateAge(selectUser?.birthdate)}}</span>
                      <span class=" ml-2">ปี</span>

                  </div>
          


                  </div>
              </div>
              </div>
          </div>
          <div class="flex justify-center items-center  w-full max-w-[40dvw]  mb-[3rem] mt-2 gap-4 mx-auto">

          <button @click="closeModal" class="bg-green-500 text-white flex items-center justify-center px-5 py-[0.8rem] rounded-2xl text-xl w-1/2" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 mr-2" fill="currentColor ">
              <path d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1 96 192c0 53 43 96 96 96s96-43 96-96l0-120.9-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1L352 192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112l0-70.7c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 70.7c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192L32 71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
          </svg>
          ตกลง
          </button>

          </div>        
        </div>
  <div class="h-[10rem] bg-[#F0F8FF]">
   
  </div>
  </template>
  
<script>
import { ref, onMounted,nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
props: ['doctorId'], // รับ doctorId จาก params

data(){
  return{
    hasShownElse: false,
   
  }
},
setup(props) {  

  const router = useRouter();
  const appointments = ref([]);
  const doctors=ref([])
  const isModalOpen = ref(false);
  const selectUser =ref(null)
  const waitingTimes = ref([]);

  const openModal = (doctor) => {
      console.log("before data",doctor)
      selectUser.value = doctor;
      isModalOpen.value = true;
      console.log("data",selectUser.value)
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      selectUser.value = null;
      isModalOpen.value = false;
      document.body.style.overflow = '';
    };















    const fetchAppointments = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/doctor/${props.doctorId}`);
        appointments.value = response.data;
        console.log( "response",response.data)
        console.log("appointments.value ",appointments.value)
        console.log("Time",appointments.value[0].appointmentTime)
        nextTick(() => {
          appointments.value.forEach((_, index) => {
            startTimer(index);
          });
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
    };
    const nextTo = (appointment) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-[0.7rem]",
      cancelButton: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-[0.7rem]",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "เริ่มให้คำปรึกษาใช่หรือไม่?",
      text: "หากคุณเริ่มการปรึกษาแล้ว คุณจะไม่สามารถย้อนกลับได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ให้คำปรึกษาแพทย์!",
      cancelButtonText: "ไม่ ยกเลิก",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        
        router.push({ 
          name: 'chatdoctor', 
          params: { 
            doctorId: props.doctorId, 
            userId: appointment.userId 
          } 
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // ถ้าผู้ใช้ยกเลิก
        swalWithBootstrapButtons.fire({
          title: "ยกเลิก",
          text: "ยังไม่ได้เริ่มการให้คำปรึกษา :)",
          icon: "error",
        });
      }
    });
};

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/doctors/Appointment/${props.doctorId}`);
        doctors.value = response.data;
        console.log('Doctors fetched:', response.data); 
        console.log(doctors.value.firstName)
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
  
    const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
    };
    const startTimer = (index) => {
      if (!waitingTimes.value[index]) {
        waitingTimes.value[index] = 0; 

        
        setInterval(() => {
          waitingTimes.value[index]++; 
        }, 1000); 
      }
    };

    const formattedTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };




    onMounted(() => {
    fetchAppointments();
    fetchDoctors() ;

    });

    return {
    appointments,
    formatDate,
    nextTo,
    doctors,
    openModal,
    isModalOpen,
    closeModal,
    selectUser,
    waitingTimes,
    startTimer,
    formattedTime,
    fetchAppointments,
    };  
},
methods:{
  calculateAge(birthdate) {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    },
    splitDateTime(dateTimeString) {
 
      const [date, timeWithSuffix] = dateTimeString.split(' ');

      
      const time = timeWithSuffix.replace('น.', '').trim();

      return { date, time };
    },
    formatDateToThai(dateString) {
      const monthsThai = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];

      
      const [year, month, day] = dateString.split('-');

     
      const monthThai = monthsThai[parseInt(month) - 1]; 
      
      return `${parseInt(day)} เดือน ${monthThai} ${year}`;
    },


},

};
</script>

<style scoped>
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
  display: flex;
  flex-direction: column;
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
