<template>
  <div class="flex flex-col items-center bg-[#F0F8FF] h-screen p-2">
    <div class="w-full max-w-3xl bg-white rounded-t-lg shadow">
      <div class="w-full p-3 flex items-center justify-between relative">
        <div class="flex items-center space-x-3">
          <div v-if="userData">
            <img
              :src="userData.profileImage"
              alt="Profile"
              class="w-12 h-12 rounded-full"
            />
          </div>
          <div v-if="userData">
            <p class="font-bold text-lg">{{ userData.firstname }} {{ userData.lastname }}</p>
          </div>
        </div>

        <!-- กล่องเวลา -->
        <div class="flex flex-col w-[10rem] items-center justify-center text-center absolute inset-x-1/2 transform -translate-x-1/2">
          <p class="text-gray-500 text-sm font-semibold">เวลาที่ปรึกษาเหลือ</p>
          <p class="text-red-500 text-lg font-bold">{{ formattedTime }} นาที</p>
        </div>

        <div class="flex items-center space-x-3">
          <font-awesome-icon :icon="['fas', 'phone']" size="lg" />
          <font-awesome-icon :icon="['fas', 'video']" size="lg" />
          <font-awesome-icon :icon="['fas', 'circle-info']" size="lg" />
        </div>
      </div>
    </div>


    <div class="border-t border-gray-300"></div>
    <!-- ส่วนการแสดงข้อความ -->
    
    <div class="message w-full max-w-3xl bg-white flex-1 p-4 space-y-4 overflow-y-auto" ref="messagesContainer">
      <div>
        <div v-if="userData" class="flex flex-col items-center mt-[4rem] pb-[12rem]">
              <img :src="userData.profileImage" alt="Profile" class="w-24 h-24 rounded-full mb-2">
              <p class="font-semibold">{{userData.firstname}} {{ userData.lastname }}</p>
              <p class="text-xs text-gray-500">{{userData.firstname}} {{ userData.lastname }}</p>
          </div>
      </div>
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="w-full flex"
        :class="msg.senderId === doctorId ? 'justify-end' : 'justify-start'"
      >
        <!-- ข้อความจากผู้ใช้คนอื่น -->
        <div
          v-if="msg.senderId !== doctorId"
          class="flex items-start space-x-2"
        >
          <img
            :src="userData.profileImage"
            alt="Profile"
            class="w-8 h-8 rounded-full"
          />
          <div class="bg-gray-200 text-black p-2 rounded-lg max-w-xs">
            {{ msg.message }}
          </div>
        </div>
        <!-- ข้อความจากผู้ใช้เอง -->
        <div
          v-if="msg.senderId === doctorId"
          class="flex items-end space-x-2"
        >
          <div class="bg-blue-500 text-black p-2 rounded-lg max-w-lg ">
            {{ msg.message }}
          </div>
          <img
            src="https://storage.googleapis.com/fastwork-static/3da37aab-7ccc-4c54-bdff-16c8603e52a9.jpg"
            alt="Profile"
            class="w-8 h-8 rounded-full hidden"
          />
        </div>
      </div>
    </div>

    <!-- ส่วนส่งข้อความ -->
    <div class="w-full max-w-3xl bg-white rounded-b-lg p-2 flex items-center space-x-2">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="ส่งข้อความ..."
        class="flex-1 p-2 rounded-full border border-black focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>

    <button @click="handleDelete()" class="mt-4 bg-red-500 text-black font-bold py-2 px-6 rounded-full shadow-md">
      สิ้นสุดการปรึกษา
    </button>
  </div>

</template>
  
<script>
import { io } from 'socket.io-client';
import axios from 'axios';
import { ref,onMounted ,} from 'vue';
import { useRoute } from 'vue-router'; // ใช้เพื่อเข้าถึง route parameters
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
    profilePicture: 'https://static.vecteezy.com/system/resources/previews/028/569/170/original/single-man-icon-people-icon-user-profile-symbol-person-symbol-businessman-stock-vector.jpg', 
    countdown: 60*20,
    isCountdownStarted: false,
  };
},
props: ['doctorId', 'userId'],
setup(props) {
    const doctorId=props.doctorId
    const userId= ref(props.userId);

    const route = useRoute(); // เข้าถึง route เพื่อดึงพารามิเตอร์
    const recipientId = ref(route.params.doctorId);
    const userData =ref([])
    console.log("ID", doctorId);
    console.log("ส่งไปยัง", userId.value);
    console.log('Recipient ID from route:', recipientId.value);


    const fetchDoctors = async () => {
        try {
      
          const response = await axios.get(`http://localhost:3000/student/${userId.value}`);
          userData.value = response.data.data;
          console.log('Doctors fetched value:', userData.value.profileImage); 
          console.log('Doctors fetched:', response.data); 

        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };
      onMounted(() => {
    
          fetchDoctors();

        });
    return {
    userId,
    doctorId,
    recipientId,
    userData
    
  };
},
created() {
    this.socket = io('http://localhost:3000');

    this.socket.on('private message', (data) => {
    this.messages.push(data);
    console.log('Received message:', data);
    this.scrollToBottom();
    });

    this.socket.on('connect', () => {
    console.log('Socket connected:', this.socket.id);
    this.registerUser(); 
    });
},
methods: {

  registerUser() {
  if (this.doctorId) {
      this.socket.emit('register', this.doctorId); // ลงทะเบียนด้วย user ID
      console.log(`Registered user: ${this.doctorId}`);
  }
  },
  sendMessage() {
      
      if (this.newMessage.trim()) {
      console.log('Sending message:', this.newMessage); 
      console.log('User ID:', this.userId);
      console.log('Recipient ID:', this.recipientId)

      const messageData = {
      recipientId: this.userId , // ใช้ recipientId ที่กำหนดจากพารามิเตอร์
      message: this.newMessage,
      profilePicture: this.profilePicture,
      senderId: this.userId,
      

      };
      console.log('Recipient ID:', this.userId);
      this.socket.emit('private message', messageData);
      
      this.messages.push({ senderId: this.recipientId, message: this.newMessage, profilePicture: this.profilePicture });
      console.log('Sent message:', messageData);

      this.newMessage = '';
      this.scrollToBottom();
      if (!this.isCountdownStarted) {
        this.startCountdown(); 
        this.isCountdownStarted = true; 
      }
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
  const result = await swalWithBootstrapButtons.fire({
      title: "หยุดให้คำปรึกษาใช่หรือไม่",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่ หยุดให้การปรึกษา!",
      cancelButtonText: "ไม่ ยกเลิก!",
      reverseButtons: true,
  });
  if (result.isConfirmed) {
      await swalWithBootstrapButtons.fire({
          title: "หยุดให้คำปรึกษาสำเร็จ!",
          text: "ขอบคุณที่ใช้บริการ",
          icon: "success",
      }); 
      this.$router.push('/mangedocter'); 
  } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      await swalWithBootstrapButtons.fire({
          title: "ยกเลิก",
          text: "สามารถให้คำปรึกษาต่อได้ :)",
          icon: "error",
      });
  }
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
    this.goToOtherPage(); 
  },
  goToOtherPage() {
    
    this.$router.push('/mangedocter'); 
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
  overflow-wrap: break-word; 
}
</style>