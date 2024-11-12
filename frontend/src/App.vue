<script setup>
import { loadStripe } from '@stripe/stripe-js';
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
import { RouterView } from 'vue-router';

const socket = io('http://localhost:3000'); // ประกาศ socket
const messages = ref([]); // สร้าง reactive reference สำหรับ messages

onMounted(() => {
  // รับข้อความจาก socket เมื่อมีการเชื่อมต่อ
  socket.on('private message', (data) => {
    messages.value.push(data); // เพิ่มข้อความที่ได้รับลงใน messages
    console.log('Received message:', data); // แสดง log ข้อความที่รับมา
  });
});

onUnmounted(() => {
  // ตัดการเชื่อมต่อเมื่อคอมโพเนนต์ถูกทำลาย
  socket.disconnect();
});

const stripePromise = loadStripe('your-publishable-key-here');
</script>

<template>
  <RouterView />
</template>
