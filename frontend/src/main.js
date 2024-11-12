import './styles.css';
import App from './App.vue';
import router from './router';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { loadStripe } from '@stripe/stripe-js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // solid icons
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);

const stripePromise = loadStripe('pk_test_51PvixoRoShI4RoXMvnQbqVmFtSpGTMrWAB6iBjxeN6zQnn3NSAzbvfsNAIy9XLSmAX7QW3OiD3s5Y5IAjBhV7qHb00TqWehwbr');
const app = createApp(App);

app.provide('stripePromise', stripePromise);
app.component('font-awesome-icon', FontAwesomeIcon);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');
