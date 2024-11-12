<template>
  <Nevbar class="body bg-[#f8fdff]">
    <!-- Header Section -->
    <div class="flex justify-center mb-[2rem]">
      <h1 class="text-3xl font-bold mx-32 mb-4 mt-32 flex p-2">
        <div class="flex-auto w-1/2">ตะกร้าสินค้า</div>
      </h1>
    </div>

    <!-- Cart Items Section -->
    <div class="mx-52">
      <div class="flex border-y-2 p-2">
        <div class="flex-auto w-10/12 font-bold">รายละเอียดสินค้า</div>
        <div class="flex-auto w-1/6 text-center font-bold">จำนวน</div>
        <div class="flex-auto w-1/6 text-center font-bold">ราคา</div>
        <div class="flex-auto w-1/6 text-center font-bold">ทั้งหมด</div>
      </div>

      <div v-if="cart && cart.items && cart.items.length > 0">
        <div v-for="item in cart.items" :key="item.item">
          <div class="flex items-center border-b-2 p-2">
            <img :src="item.img" alt="Product Image" class="w-36 h-36 mr-4 object-scale-down bg-white" />
            <div class="flex-auto w-5/12">
              <div>{{ item.title }}</div>
              <div class="text-sm text-gray-500">Details</div>
              <button
                @click="removeItem(item.item)"
                class="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
            <div
              class="flex-auto w-16 text-center flex items-center justify-center"
            >
              <button @click="decrement(item)" class="border px-2">-</button>
              <input
                type="text"
                :value="item.qty"
                class="border w-8 text-center mx-1"
              />
              <button @click="increment(item)" class="border px-2">+</button>
            </div>
            <div class="flex-auto w-16 text-center">{{ numberWithCommas(item.price) }}</div>
            <div class="flex-auto w-16 text-center">
              {{ numberWithCommas(item.price * item.qty) }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-red-500  justify-center items-center flex text h-[30dvh]">
        <p class="w-[10rem] h-[5rem]" >Your cart is empty.</p>
      </div>

      <div class="flex mt-4">
        <div class="flex-auto ml-[1.7rem] font-bold">ราคาทั้งหมด</div>
        <div class="flex-auto mr-[2.4rem] font-bold text-end">
          {{ numberWithCommas(cart.total) }} บาท
        </div>
      </div>

      <div
        class="w-full flex flex-col justify-center items-center mt-10 h-auto py-4 rounded-lg"
      >
        <button
          @click="openModal"
          class="btn btn-active btn-neutral text-white w-full rounded-xl h-[3.5vw] text-2xl"
        >
          ชำระเงิน ({{ numberWithCommas(cart.total) }}) บาท
        </button>
      </div>
      <div class="h-[15rem]"></div>

      <div>
        <div v-show="isModalOpen" class="Detail-modal mx-auto">
          <div class="modal-bg"></div>
          <div class="modal-page bg-slate-500 rounded-md" >
            <div class="btn-control flex bg-[#E7E9EB] rounded-md justify-end">
              <button class="btn-close" @click="closeModal()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-[2vw] h-[2vw] min-w-[2vw] min-h-[2vw]"
                  fill="#adadad"
                >
                  !Font Awesome Free 6.6.0 by @fontawesome -
                  https://fontawesome.com License -
                  https://fontawesome.com/license/free Copyright 2024 Fonticons,
                  Inc.
                  <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                  />
                </svg>
              </button>
            </div>

            <br />
            <div
              class="modaldesc-content flex flex-col mt-[-1.5rem] justify-center"
            >
              <div
                class="flex-col justify-center h-[5.5rem] mb-[1.2rem] drop-shadow-lg bg-[#E7E9EB]"
              >
                <div class="flex justify-center">
                  <h1 class="text-[3vh] font-bold">MediSEE</h1>
                </div>
                <div>
                  <h1 class="text-[2vh] text-center text-[#A3A3A3]">
                    Medisee shop and Consult a doctor
                  </h1>
                </div>
              </div>
              
              <div class="w-[20rem] mx-auto">
                <form @submit.prevent="handleSubmit" class="">
                  <div v-if="user">
                    <label for="name">ชื่อผู้ชำระเงิน</label>
                    <input
                      v-model="name"
                      id="name"
                      class="w-full drop-shadow-md border pl-2  mb-[1.2rem] rounded-md   h-[2.3rem]"
                      type="text"
                      required
                    />
                  </div>

                  <div v-if="user">
                    <label for="email">อีเมลผู้ชำระเงิน</label>
                    <input
                      v-model="email"
                      
                      id="email"
                      class="w-full drop-shadow-md border pl-2 mb-[1.2rem] rounded-md h-[2.3rem]"
                      type="email"
                      required
                    />
                  </div>

                  <div>
                    <label for="card">กรอกเลขบัตร (VISA)</label>
                    <div class="mb-[1.2rem] rounded-md " id="card-element"></div>
                  </div>
                  <div class="mb-[4rem] flex items-center h-[2.3rem] rounded-md border  drop-shadow-md ">
                    <label class="ml-3" >
                      <input type="checkbox" id="agree" name="agree" />
                      Remember Me
                    </label>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-active bg-blue-600  btn-neutral text-white w-full rounded-md  h-[3.5vw] text-2xl"
                  >
                    Pay ({{ cart.total }}) บาท
                  </button>
                  <div class="text-red-600" v-if="errorMessage">{{ errorMessage }}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div>
        <div class="mt-10 bg-gray-100 flex justify-center"></div>
      </div>
    </div>
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="loader "></div> 
      </div>
  </Nevbar>
</template>

<script setup>
import Nevbar from "@/layout/Nevbar.vue";
import axios from "axios";
import Toast from 'sweetalert2';
import { ref, onMounted,nextTick,computed } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useUserStore } from '@/stores/counter.js'

const userStore = useUserStore()
const user = computed(() => userStore.user);
const loading =ref(false)

const cart = ref({
  items: [],
  total: 0,
});
const name = ref(""); 
const email = ref("");


const isModalOpen = ref(false);
let cardElement = null;

const getUser = () => {
  return user.value; 
};

const stripePromise = loadStripe(
  "pk_test_51PvixoRoShI4RoXMvnQbqVmFtSpGTMrWAB6iBjxeN6zQnn3NSAzbvfsNAIy9XLSmAX7QW3OiD3s5Y5IAjBhV7qHb00TqWehwbr"
); 


const errorMessage = ref("");
const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

const handleSubmit = async () => {
  loading.value=true
  try {
    if (!cart.value.items || cart.value.items.length === 0) {
      throw new Error("Cart is empty");
    }


    const { data } = await axios.post(
      "http://localhost:3000/create-payment-intent",
      {
        amount: cart.value.total*100,
        
      }
    );

    const stripe = await stripePromise;
      
    if (!cardElement) {
      throw new Error("Card element not found");
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name.value,
            email:  email.value,
          },
        },
      }
    );

    if (error) {
      errorMessage.value = error.message;
      loading.value=false
    } else if (paymentIntent.status === "succeeded") {
      await axios.post("http://localhost:3000/api/product/clear-cart");
      cart.value.items = [];
      cart.value.total = 0;
      loading.value=false
      await Toast.fire({
        icon: "success",
        title: "ชำระเงินเสร็จสิน!"
        });

      closeModal();
    }
  } catch (error) {
    errorMessage.value = error.message;
    loading.value=false
  }
};

const fetchCart = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/product/cart", {
      withCredentials: true,
      
    });
    cart.value = response.data.cart;
    console.log(response.data.cart)
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

onMounted(() => {
  fetchCart();

  stripePromise.then((stripe) => {
    if (!stripe) {
      console.error("Stripe.js failed to load");
      return;
    }
    const elements = stripe.elements();
    cardElement = elements.create("card");
    if (!cardElement) {
      console.error("Card element creation failed");
      return;
    }
    cardElement.mount("#card-element");
  });
});

const updateQuantity = async (item, qty) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/product/cart/update",
      {
        product_id: item.item,
        qty: qty,
      },
      { withCredentials: true } 
    );

    
    await fetchCart();
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};

const increment = (item) => {
  updateQuantity(item, item.qty + 1);
};

const decrement = (item) => {
  if (item.qty > 1) {
    updateQuantity(item, item.qty - 1);
  }
};
const removeItem = async (productId) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/product/cart/remove",
      {
        product_id: productId,
      },
      { withCredentials: true }
    );
    cart.value = response.data.cart;

    await fetchCart();
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};
const closeModal = () => {
  isModalOpen.value = false;
};
const openModal = async () => {
  isModalOpen.value = true; 

  await nextTick(); 

  setTimeout(async () => {
    const cardElementContainer = document.querySelector("#card-element");
    if (cardElementContainer) {
      const stripe = await stripePromise; 
      const elements = stripe.elements();
      if (!cardElement) {
        cardElement = elements.create("card");
      }
      cardElement.mount("#card-element"); 
    } else {
      console.error("Cannot find #card-element in the DOM");
    }
  }, 100); 

};

</script>

<style scoped>
.xBNaac {
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );

  height: 3px;
}

.body {
  font-family: "Prompt", sans-serif;
}
#card-element {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.Detail-modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal-page {
  min-width: 30vw;
  min-height: 40vw;
  max-width: 30vw;
  max-height: 50vw;

  background-color: white;
  
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #25b09b;
  animation: l15 1s infinite linear;
  z-index: 9999; 
}
.loader::before,
.loader::after {    
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
}
@keyframes l15{ 
  100%{transform: rotate(1turn)}
}
</style>
