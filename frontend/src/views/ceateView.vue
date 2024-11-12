<template>
    <div>
      <h2>Create or Join Room</h2>
      <button @click="createRoom">Create Room</button>
      
      <form @submit.prevent="joinRoom">
        <label for="roomId">Room ID:</label>
        <input v-model="roomId" type="text" id="roomId" placeholder="Enter Room ID">
        <button type="submit">Join Room</button>
      </form>
      
      <div v-if="createdRoomId">
        <p>Room Created! Share this ID: <strong>{{ createdRoomId }}</strong></p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        roomId: '',
        createdRoomId: '',
        socket: null,
      };
    },
    methods: {
      async createRoom() {
        try {
          const response = await axios.get('http://localhost:3000/create-room');
          this.createdRoomId = response.data.roomId; // รับ roomId ที่สร้างจาก backend
          this.roomId = this.createdRoomId; // กำหนด roomId เพื่อให้เข้าร่วมห้องที่สร้าง
        } catch (error) {
          console.error('Error creating room:', error);
        }
      },
      joinRoom() {
        if (this.roomId) {
          this.socket = io('http://localhost:3000');
          this.socket.emit('joinRoom', this.roomId);
          console.log(`Joined room: ${this.roomId}`);
        }
      }
    }
  };
  </script>
  
  <style scoped>
    /* ปรับแต่ง CSS */
  </style>
  