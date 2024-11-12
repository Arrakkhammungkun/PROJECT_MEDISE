<template>
  <div :class="messageClass">
    <strong>{{ isSender ? 'You' : message.senderId }}:</strong> {{ message.message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true, // ตรวจสอบว่า message ถูกส่งเข้ามา
    },
    senderId: {
      type: String,
      required: true, // ตรวจสอบว่า senderId ถูกส่งเข้ามา
    },
  },
  computed: {
    isSender() {
      return this.message.senderId === this.senderId; // ตรวจสอบว่าเป็นข้อความของผู้ส่งเองหรือไม่
    },
    messageClass() {
      return this.isSender ? 'message sender' : 'message receiver'; // กำหนดคลาสตามผู้ส่งหรือผู้รับ
    },
  },
};
</script>

<style>
.message {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  max-width: 60%;
}

.sender {
  background-color: #d1e7dd;
  text-align: right;
  margin-left: auto; /* ข้อความของผู้ส่งอยู่ทางขวา */
}

.receiver {
  background-color: #f8d7da;
  text-align: left;
  margin-right: auto; /* ข้อความของผู้รับอยู่ทางซ้าย */
}
</style>
