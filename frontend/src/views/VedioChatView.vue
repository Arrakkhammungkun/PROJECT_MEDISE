<template>
  <div ref="videoGrid">
    <video ref="myVideo" autoplay muted></video>
    <div v-for="(peer, index) in peers" :key="index">
      <video :srcObject="peer" autoplay></video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import axios from 'axios';

const videoGrid = ref(null);
const myVideo = ref(null);
const peers = ref([]);
let socket;
let myPeer;

onMounted(async () => {
  // Connect to backend and create room
  const response = await axios.get('http://localhost:3000/api/room');
  const ROOM_ID = response.data.roomId;

  // Initialize Socket.io client
  socket = io('http://localhost:3000');

  // Initialize PeerJS
  myPeer = new Peer(undefined, {
    host: '/',
    port: '3001',
  });

  // Get user media
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  
  // Set the local video stream
  myVideo.value.srcObject = stream;

  // Join room and handle new user connection
  myPeer.on('open', (id) => {
    socket.emit('join-room', ROOM_ID, id);
  });

  socket.on('user-connected', (userId) => {
    const call = myPeer.call(userId, stream);
    call.on('stream', (userVideoStream) => {
      peers.value.push(userVideoStream);
    });
  });

  socket.on('user-disconnected', (userId) => {
    const peerIndex = peers.value.findIndex(peer => peer.id === userId);
    if (peerIndex !== -1) peers.value.splice(peerIndex, 1);
  });

  // Handle incoming calls
  myPeer.on('call', (call) => {
    call.answer(stream);
    call.on('stream', (userVideoStream) => {
      peers.value.push(userVideoStream);
    });
  });
});
</script>

<style>
/* ใส่สไตล์ที่ต้องการที่นี่ */
</style>
