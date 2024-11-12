<template>
  <div class="flex flex-col items-center bg-[#F0F8FF] h-screen p-2">
    <div class="w-full max-w-3xl bg-white rounded-t-lg shadow">
      <div class="w-full  p-2 shadow flex items-center justify-between">
        <div class="flex items-center space-x-3 right-[-1rem]  bottom-0">
          <div v-if="doctors">
                <img
                  :src="doctors.photo || 'https://static.vecteezy.com/system/resources/previews/028/569/170/original/single-man-icon-people-icon-user-profile-symbol-person-symbol-businessman-stock-vector.jpg'"
                  alt="Profile"
                  class="w-12 h-12 rounded-full"
                />   
          </div>

          <div v-if="doctors">
            <p class="font-bold text-lg  ">{{ doctors.prefix }} {{ doctors.firstName }} {{ doctors.lastName }} </p>
          </div>
          <div class="flex flex-col items-center w-[10rem] justify-center text-center  absolute inset-x-1/2 transform -translate-x-1/2">
            <p class="text-gray-500 text-sm font-semibold ml-[-1rem]">เวลาที่ปรึกษาเหลือ</p>
            <p class="text-red-500 text-lg font-bold ml-[-1rem]">{{ formattedTime }} นาที</p>
          </div>
        </div>

        <div class="flex items-center space-x-3 relative left-[-2rem]">
          <font-awesome-icon :icon="['fas', 'phone']" size="lg" />
          <font-awesome-icon :icon="['fas', 'video']" size="lg" />
          <font-awesome-icon :icon="['fas', 'circle-info']" size="lg" />
        </div>
      </div>
    </div>

    <!-- Chat messages -->
    <div class="border-t border-gray-300"></div>
    <div class="w-full max-w-3xl bg-white flex-1 p-4 space-y-4 overflow-y-auto flex flex-col" ref="messagesContainer">
      <div class="messages">
        <div v-if="doctors">
            <div class="flex flex-col items-center mt-[2rem] pb-[14rem]">
                <img :src="doctors.photo || 'https://static.vecteezy.com/system/resources/previews/028/569/170/original/single-man-icon-people-icon-user-profile-symbol-person-symbol-businessman-stock-vector.jpg'"
                alt="Profile" class="w-24 h-24 rounded-full mb-2 bg-cover bg-center">
                <p class="font-semibold">{{ doctors.prefix }} {{ doctors.firstName }} {{ doctors.lastName }}</p>
                <p class="text-xs text-gray-500">{{ doctors.firstName }} {{ doctors.lastName }}</p>
            </div>
        </div>
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="flex items-start my-2"
        >
          <img
            v-if="msg.senderId !== userData._id"
            :src="doctors.photo || 'https://static.vecteezy.com/system/resources/previews/028/569/170/original/single-man-icon-people-icon-user-profile-symbol-person-symbol-businessman-stock-vector.jpg'"
            alt="Profile"
            class="w-8 h-8 rounded-full mr-2 bg-cover bg-center"
          />
          <div
            :class="[
              'message max-w-xs p-2 rounded-lg',
              msg.senderId === userData._id ? 'bg-[#A8EAFF] text-black ml-auto' : 'bg-gray-200 text-black'
            ]"
          >
            {{ msg.message }}
          </div>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="w-full max-w-3xl bg-white rounded-b-lg p-2 flex items-center space-x-2">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="ส่งข้อความ..."
        class="flex-1 p-2 rounded-full border border-black focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>

    <!-- End consultation button -->
    <button @click="handleDelete()" class="mt-4 bg-red-500 text-black font-bold py-2 px-6 rounded-full shadow-md">
      สิ้นสุดการปรึกษา
    </button>
  </div>
</template>
    
<script>
  import { io } from 'socket.io-client';
  import { useUserStore } from '@/stores/counter'; 
  import { ref,onMounted } from 'vue';
  import { useRoute } from 'vue-router'; 
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import Toast from 'sweetalert2';

  export default {
    data() {
      return {
        socket: null,
        messages: [],
        newMessage: '',
        recipientId: '',
        countdown: 60*20,
        isCountdownStarted: false,
      
      };
    },
    setup() {
      const userStore = useUserStore();
      const userData = userStore.user; 
      const route = useRoute(); 
      const doctors =ref([])
      const profilePicture= ref('https://static.vecteezy.com/system/resources/previews/028/569/170/original/single-man-icon-people-icon-user-profile-symbol-person-symbol-businessman-stock-vector.jpg');

      
      const recipientId = ref(route.params.doctorId);


      const fetchDoctors = async () => {
        try {
      
          const response = await axios.get(`http://localhost:3000/api/doctors/Appointment/${recipientId.value}`);
          doctors.value = response.data;
 

        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };
      

      onMounted(() => {
    
        fetchDoctors();
  
      });
      console.log('Recipient ID from route:', recipientId.value);
      return {
        userData,
        recipientId,
        doctors
      };
    },
    created() {
      this.socket = io('http://localhost:3000');
  
      this.socket.on('private message', (data) => {
        this.messages.push(data);
        console.log('Received message:', data);
        this.scrollToBottom();

        if (!this.isCountdownStarted) {
        this.startCountdown(); 
        this.isCountdownStarted = true; 
      }
      });
      
      

      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.id);
        this.registerUser(); 
      });
    },
    methods: {
      registerUser() {
        if (this.userData._id) {
          this.socket.emit('register', this.userData._id); 
          console.log(`Registered user: ${this.userData._id}`);
        }
      },
      sendMessage() {
        if (this.newMessage.trim()) {
          const messageData = {
            
            recipientId: this.recipientId, 
            message: this.newMessage,
            
          };
          console.log('Recipient ID:', this.recipientId);
          this.socket.emit('private message', messageData);
          
          this.messages.push({ senderId: this.userData._id, message: this.newMessage });
          console.log('Sent message:', messageData);
  
          this.newMessage = '';
          this.scrollToBottom();
          
        }
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          container.scrollTop = container.scrollHeight; 
        });
      },
      async handleDelete() {
        console.log("callhadleDelete");
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-[0.7rem]",
                cancelButton: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-[0.7rem]",
            },
            buttonsStyling: false,
        });

        console.log(this.userData._id);
        swalWithBootstrapButtons
            .fire({
                title: "หยุดการปรึกษาแพทย์ใช่หรือไม่",
                text: "คุณจะไม่สามารถย้อนกลับได้!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ใช่ หยุดปรึกษาแพทย์!",
                cancelButtonText: "ไม่ ยกเลิก!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        console.log("Sending userId:", this.userData._id);
                        await axios.delete(`http://localhost:3000/api/deleteByUserID`, {
                                data: {
                                    userId: this.userData._id,
                                },
                        });
                        await swalWithBootstrapButtons.fire({
                            title: "หยุดปรึกษาสำเร็จ!",
                            text: "ขอบคุณที่ใช้บริการ",
                            icon: "success",
                        });
                        this.$router.push('/doctor'); 
                    } catch (error) {
                        console.error('Failed to delete product', error);
                        swalWithBootstrapButtons.fire({
                            title: "เกิดข้อผิดพลาด",
                            text: "ไม่สามารถหยุดการปรึกษาได้",
                            icon: "error",
                      });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "ยกเลิก",
                        text: "สามารถปรึกษาแพทย์ต่อได้ :)",
                        icon: "error",
                    });
                }
          });
      },
      async startCountdown() {
        const countdownInterval = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--; 
          } else {
            clearInterval(countdownInterval);
          
            this.showToastAndNavigate();
          }
        }, 1000); 
      },
      async showToastAndNavigate() {
        await Toast.fire({
          icon: "error",
          title: "หมดเวลาการปรึกษา"
        });
          try {
              await axios.delete(`http://localhost:3000/api/deleteByUserID`, {
                      data: {
                          userId: this.userData._id,
                      },
              });this.goToOtherPage(); 
          } catch (error) {
              console.error('Failed to delete product', error);
              swalWithBootstrapButtons.fire({
                  title: "เกิดข้อผิดพลาด",
                  text: "ไม่สามารถหยุดการปรึกษาได้",
                  icon: "error",
            });
          }
        
      },
      goToOtherPage() {
        
        this.$router.push('/doctor'); 
      }



    },

      computed: {
        formattedTime() {
          const minutes = Math.floor(this.countdown / 60); 
          const seconds = this.countdown % 60; 
          const displayMinutes = minutes % 60; 
         
          
          return `${String(displayMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
      }
  };
</script>
  
  
  
<style scoped>
.message {
  overflow-wrap: break-word; /* เพื่อให้ข้อความยาวเกินไปตัดในกล่อง */
}

</style>