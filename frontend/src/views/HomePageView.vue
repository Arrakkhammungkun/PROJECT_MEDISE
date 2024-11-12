<template>
  <div>
    <h1>Create Zoom Meeting</h1>
    <form @submit.prevent="createMeeting">
      <input v-model="topic" placeholder="Enter Meeting Topic" />
      <input v-model="startTime" type="datetime-local" />
      <input v-model="duration" placeholder="Duration (minutes)" />
      <button type="submit">Create Meeting</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      topic: '',
      startTime: '',
      duration: '',
    };
  },
  methods: {
    async createMeeting() {
      try {
        const response = await axios.post('http://localhost:3000/create-meeting', {
          topic: this.topic,
          startTime: this.startTime,
          duration: this.duration,
        },{
          withCredentials: true,
        }
        
        );
        console.log('Meeting Created:', response.data);
        alert('Meeting created! Join URL: ' + response.data.join_url);
      } catch (error) {
        console.error('Error creating meeting:', error);
        alert('Error creating meeting');
      }
    },
  },
};
</script>
