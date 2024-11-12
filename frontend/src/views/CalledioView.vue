<template>
    <div class="room-container">
      <h2>Join Video Call Room</h2>
      <form @submit.prevent="joinRoom">
        <label for="roomId">Room ID:</label>
        <input v-model="roomId" type="text" id="roomId" required placeholder="Enter Room ID">
        <button type="submit">Join Room</button>
      </form>
  
      <div v-if="isInRoom">
        <h3>Connected to Room: {{ roomId }}</h3>
        
        <video ref="localVideo" autoplay playsinline></video>
        <video ref="remoteVideo" autoplay playsinline></video>

        <div class="controls">
          <button @click="toggleCamera">{{ isCameraOn ? 'Turn Off Camera' : 'Turn On Camera' }}</button>
          <button @click="toggleMicrophone">{{ isMicrophoneOn ? 'Turn Off Microphone' : 'Turn On Microphone' }}</button>
          <button @click="toggleAudio">{{ isAudioOn ? 'Mute Audio' : 'Unmute Audio' }}</button>
          <button @click="hangUp">Hang Up</button>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  import io from "socket.io-client";
  
  export default {
    data() {
      return {
        socket: null,
        roomId: "",
        isInRoom: false,
        peerConnection: null,
        localStream: null,
        isCameraOn: true,
        isMicrophoneOn: true,
        isAudioOn: true,
      };
    },
    methods: {
      joinRoom() {
        // เชื่อมต่อกับ Socket.IO
        this.socket = io("http://localhost:5173");
  
        // เข้าร่วมห้อง
        this.socket.emit("joinRoom", this.roomId);
        this.isInRoom = true;
  
        // เริ่มการรับสัญญาณจากอีกฝั่ง
        this.socket.on("signal", (data) => {
          if (data.sdp) {
            this.handleRemoteSignal(data);
          }
        });
  
        // เตรียม PeerConnection สำหรับการวิดีโอคอล
        this.setupPeerConnection();
      },
      setupPeerConnection() {
        const configuration = {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            // คุณสามารถเพิ่ม TURN server หากต้องการ
          ],
        };
        this.peerConnection = new RTCPeerConnection(configuration);
  
        // เพิ่ม video stream ลงใน peer connection
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            this.localStream = stream;
            this.$refs.localVideo.srcObject = stream;
            stream.getTracks().forEach((track) => {
              this.peerConnection.addTrack(track, stream);
            });
          });
  
        // รับ remote stream
        this.peerConnection.ontrack = (event) => {
          this.$refs.remoteVideo.srcObject = event.streams[0];
        };
  
        // ส่ง ICE candidate ไปยังฝั่งตรงข้าม
        this.peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            this.socket.emit("signal", { candidate: event.candidate, roomId: this.roomId });
          }
        };
  
        // เริ่มการเชื่อมต่อเมื่อมี offer หรือ answer
        this.peerConnection.onnegotiationneeded = () => {
          this.peerConnection
            .createOffer()
            .then((offer) => this.peerConnection.setLocalDescription(offer))
            .then(() => {
              this.socket.emit("signal", { sdp: this.peerConnection.localDescription, roomId: this.roomId });
            });
        };
      },
      toggleCamera() {
          if (this.localStream) {
            const videoTrack = this.localStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled; // ปิด/เปิดกล้อง
            this.isCameraOn = videoTrack.enabled;
          } else {
            console.error("localStream is not initialized yet.");
          }
      },
      toggleMicrophone() {
          if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled; // ปิด/เปิดไมโครโฟน
            this.isMicrophoneOn = audioTrack.enabled;
          } else {
            console.error("localStream is not initialized yet.");
          }
      },
      toggleAudio() {
        this.$refs.remoteVideo.muted = !this.$refs.remoteVideo.muted;
        this.isAudioOn = !this.$refs.remoteVideo.muted;
      },
      hangUp() {
        if (this.peerConnection) {
          this.peerConnection.close();
          this.peerConnection = null;
          this.isInRoom = false;
        }
        this.socket.disconnect();
      },
      handleRemoteSignal(data) {
        if (data.sdp) {
          this.peerConnection
            .setRemoteDescription(new RTCSessionDescription(data.sdp))
            .then(() => {
              if (data.sdp.type === "offer") {
                this.peerConnection
                  .createAnswer()
                  .then((answer) => this.peerConnection.setLocalDescription(answer))
                  .then(() => {
                    this.socket.emit("signal", { sdp: this.peerConnection.localDescription, roomId: this.roomId });
                  });
              }
            });
        } else if (data.candidate) {
          this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .room-container {
    text-align: center;
    margin: 50px auto;
  }
  
  input {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  video {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    border: 2px solid #ddd;
  }
  .controls {
  margin-top: 20px;
}
  </style>
  