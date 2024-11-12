<template>
  <nevbar class="bg-[#f8fdff]  min-h-screen">
  <div class="relative w-full max-w-[1340px] mx-auto overflow-hidden rounded-md">
    <div
      class="flex transition-transform duration-500 ease-in-out mt-[7rem] mb-[3rem] rounded-md shadow-md"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        class="min-w-full h-[400px] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md shadow-md "
      >
        <img src="../img/Promotion_1.jpeg" alt="Promotion 1" class="object-cover h-full w-full rounded-md shadow-md" />
      </div>
      <div
        class="min-w-full h-[400px] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md shadow-md" 
      >
        <img src="../img/Pomotion_3.jpeg" alt="Promotion 2" class="object-cover h-full w-full rounded-md shadow-md " />
      </div>
      <div
        class="min-w-full h-[400px] bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-md shadow-md"
      >
        <img src="../img/Promotion_2.jpeg" alt="Promotion 3" class="object-cover h-full w-full rounded-md shadow-md" />
      </div>
    </div>
    <button
      @click="prevSlide"
      class="absolute left-0 top-1/2 mt-[2rem] transform -translate-y-1/2 bg-gray-800 text-white p-2"
    >
      &#10094;
    </button>
    <button
      @click="nextSlide"
      class="absolute right-0 top-1/2 mt-[2rem] transform -translate-y-1/2 bg-gray-800 text-white p-2"
    >
      &#10095;
    </button>
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      <span
        v-for="n in totalSlides"
        :key="n"
        @click="goToSlide(n - 1)"
        :class="{
          'bg-orange-500': currentIndex === n - 1,
          'bg-gray-500': currentIndex !== n - 1,
        }"
        class="w-3 h-3 rounded-full cursor-pointer"
      ></span>
    </div>
  </div>
    <div class="flex container w-[90vw]  mx-auto">
        <div class="sidebar bg-[#DDD5F3] h-[25vw] drop-shadow-xl">
            <div class="relative mx-10">
              <input
                v-model="searchValue"
                @input="searchmedicine"
                id="txt_search"
                type="text"
                class="w-full p-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search blocks..."
              />
              <span class="absolute right-3 top-3">
                
              </span>
            </div>
            <!-- <div class="mt-4 mx-4" v-if="categories.length >0">
              <button v-for="category in categories" 
                    :key="category._id" 
                    @click="selectCategory(category._id)" 
                    class="block w-full text-left px-4 py-2 mt-2 text-sm font-semibold text-gray-700 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline">
                    {{ category.name }}
              </button>
            </div> -->
            <h2 class="text-[1.2vw] font-semibold mb-4 my-2 pl-5">รายการสินค้า</h2>
            
            <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mx-4 gap-4 text-[0.9vw]">
              <a   @click="selectCategory(null)" class="bg-[#C3EEFA] text-black flex flex-col justify-center items-center p-4 rounded-md h-[vw] hover:bg-[#3E296A] hover:text-white duration-300  ">
                <!-- Icon for สินค้าทั้งหมด -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" class="w-[2.2vw] h-[2.2vw]">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <span class="mt-2 ">ทั้งหมด</span>
              </a>
              <a @click="selectCategory('66cdf1be1a0f02fa15af69da')"  class="bg-[#C3EEFA] text-black flex flex-col justify-center items-center p-4 rounded-md h-[vw] hover:bg-[#3E296A] hover:text-white duration-300 ">
                <!-- Icon for สกินแคร์ -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" class="w-[2.2vw] h-[2.2vw]">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                  <path d="M224 24l0 56-56 0c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l56 0 0 56c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-56 56 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-56 0 0-56c0-13.3-10.7-24-24-24L248 0c-13.3 0-24 10.7-24 24zM559.7 392.2c17.8-13.1 21.6-38.1 8.5-55.9s-38.1-21.6-55.9-8.5L392.6 416 272 416c-8.8 0-16-7.2-16-16s7.2-16 16-16l16 0 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0-16 0-78.3 0c-29.1 0-57.3 9.9-80 28L68.8 384 32 384c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l160 0 160.5 0c29 0 57.3-9.3 80.7-26.5l126.6-93.3zm-367-8.2l.9 0c0 0 0 0 0 0c-.3 0-.6 0-.9 0z"/></svg>
                <span class="mt-2">สกินแคร์</span>
              </a>
              <a  @click="selectCategory('66cdf1ee1a0f02fa15af69dd')" class="bg-[#C3EEFA] text-black flex flex-col justify-center items-center p-4 rounded-md h-[vw] hover:bg-[#3E296A] hover:text-white duration-300 ">
                <!-- Icon for ยาสามัญ -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-[2.2vw] h-[2.2vw]">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                  <path d="M504.3 11.1C493.3-1.6 474.5-3.7 461 6.2L252.3 160l144.9 0L502.6 54.6c11.8-11.8 12.6-30.8 1.6-43.5zM32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32c0 82.5 43.4 147.7 123.9 176.2c-11.1 13.9-19.4 30.3-23.9 48.1C127.6 497.4 142.3 512 160 512l192 0c17.7 0 32.4-14.6 28.1-31.7c-4.5-17.8-12.8-34.1-23.9-48.1C436.6 403.7 480 338.5 480 256c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 192z"/></svg>
                
                <span class="mt-2">ยาสามัญ</span>
              </a>
              <a  @click="selectCategory('66d4b51fd449df83d421c7e5')" class="bg-[#C3EEFA] text-black flex flex-col justify-center items-center p-4 rounded-md h-[7vw] hover:bg-[#3E296A] hover:text-white duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" class="w-[2.2vw] h-[2.2vw]">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                  <path d="M320 64c-27.2 0-53.8 8-76.4 23.1l-37.1 24.8c-15.8 10.5-34.3 16.1-53.3 16.1l-9.2 0-16 0-72 0c-30.9 0-56 25.1-56 56l0 85c0 55.1 37.5 103.1 90.9 116.4l108 27C233.8 435 275.4 448 320 448s86.2-13 121.1-35.5l108-27C602.5 372.1 640 324.1 640 269l0-85c0-30.9-25.1-56-56-56l-72 0-16 0-9.2 0c-19 0-37.5-5.6-53.3-16.1L396.4 87.1C373.8 72 347.2 64 320 64zM132.3 346.3l-29.8-7.4C70.5 330.9 48 302.1 48 269l0-85c0-4.4 3.6-8 8-8l40 0 0 48c0 45.1 13.4 87.2 36.3 122.3zm405.1-7.4l-29.8 7.4c23-35.2 36.3-77.2 36.3-122.3l0-48 40 0c4.4 0 8 3.6 8 8l0 85c0 33-22.5 61.8-54.5 69.9zM192 208c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16zm16 48l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 80c0-8.8 7.2-16 16-16l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16z"/></svg>
                
                <span class="mt-2">รักษาโรค</span>
              </a>
              <a  @click="selectCategory('66cdf2721a0f02fa15af69e1')" class="bg-[#C3EEFA] text-black flex flex-col justify-center items-center p-4 rounded-md h-[7vw] hover:bg-[#3E296A] hover:text-white duration-300">
                <!-- Icon for อาหารเสริม -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" class="w-[2.2vw] h-[2.2vw]">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                  <path d="M0 32C0 14.3 14.3 0 32 0L352 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64L0 32zm32 96l320 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zM160 240l0 48-48 0c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-48 0 0-48c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
                
                <span class="mt-2">อาหารเสริม</span>
              </a>
              <a  @click="selectCategory('66cdf3101a0f02fa15af69e4')" class="bg-[#C3EEFA] text-black flex flex-col justify-center items-center p-4 rounded-md h-[7vw] hover:bg-[#3E296A] hover:text-white duration-300">
                <!-- Icon for วิตามิน -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" class="w-[2.2vw] h-[2.2vw]">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                  <path d="M64 144c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112-96 0 0-112zM0 144L0 368c0 61.9 50.1 112 112 112s112-50.1 112-112l0-178.4c1.8 19.1 8.2 38 19.8 54.8L372.3 431.7c35.5 51.7 105.3 64.3 156 28.1s63-107.5 27.5-159.2L427.3 113.3C391.8 61.5 321.9 49 271.3 85.2c-28 20-44.3 50.8-47.3 83l0-24.2c0-61.9-50.1-112-112-112S0 82.1 0 144zm296.6 64.2c-16-23.3-10-55.3 11.9-71c21.2-15.1 50.5-10.3 66 12.2l67 97.6L361.6 303l-65-94.8zM491 407.7c-.8 .6-1.6 1.1-2.4 1.6l4-2.8c-.5 .4-1 .8-1.6 1.2z"/></svg>
                
                <span class="mt-2 ">วิตามิน</span>
              </a>
            </div>
            <div class="my-[2rem]">

            </div>
        </div> 
    

        <div class="w-[70%] px-[10px] ">
            <div
            v-if="filteredProducts.length > 0"
            id="productlist"
            class="justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 gap-[20px] w-full"
            >
            <div
                v-for="product in filteredProducts"
                :key="product._id"
                :class="['product-items my-3', product.type]"
                >   
              
                <img
                
                class="product-img object-scale-down"
                :src="product.img"
                :alt="product.name"
                @click="openModal(product)"
                />
                <p class="text-[1.2vw]  truncate">{{ product.name }}</p>
                
                <div class="flex justify-end">
                    <p class="text-[1vw]">{{ numberWithCommas(product.price) }} บาท</p>
                </div>
                
                <div class=" btns-control ">
                  <form @submit.prevent="addToCart(product._id)" class="form-group">
                    <input type="hidden" name="product_id" :value="product._id">
                      <button type="submit" class="btn btn-buy px-[1.95rem] py-3">
                      เพิ่มลงตะกร้า
                    </button>
                  </form>
                  
                </div>
                
            </div>
            </div>
            <!-- <div v-else class="text-center text-red-500 font-semibold">ขออภัยไม่พบสินค้า</div> -->
        </div>
        <div>
          
          <div v-if="isModalOpen" class="Detail-modal">
          <div class="modal-bg"></div>
          <div class="modal-page">
            <div class="btn-control">
                  <button class="btn-close" @click="closeModal">
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[2.2vw] h-[2.2vw] min-w-[2vw] min-h-[2vw] " fill="#adadad">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>

                  </button>
                </div>

                <br>
                <div class="modaldesc-content" >
                  <img :src="selectedProduct.img" alt="รูปสินค้า" class="modaldesc-img" />
                  <div class="modaldesc-detail">
                    <p class=" text-[1.9vw]">{{selectedProduct.name}}</p>
                    <p class="text-[1.5vw] ml-[0.5rem] text-red-400">({{ numberWithCommas(selectedProduct.price) }} บาท)</p>
                    <br>
                    <p class="text-[#adadad]">{{ selectedProduct.description }}</p>
                  </div>
                </div>
                <div class="btn-control">
                  <form @submit.prevent="addToCart(selectedProduct._id)" class="form-group">
                    <input type="hidden" name="product_id" :value="selectedProduct._id">
                      <button type="submit" class="btn btn-buy px-[1.95rem] py-3">
                      เพิ่มลงตะกร้า
                    </button>
                  </form>
                </div>
              </div>
            </div>
        </div>
        
    </div>
    <div class="mb-[15rem]">

    </div>
  </nevbar>  
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import Nevbar from "@/layout/Nevbar.vue";
import { useRouter } from 'vue-router';
import Toast from 'sweetalert2';

export default {
  components: { Nevbar },
  setup() {
    const products = ref([]);
    const filteredProducts = ref([]);
    const noProductsFound = ref(false);
    const isModalOpen = ref(false);
    const selectedProduct = ref(null);
    const categories = ref([]);
    const selectedCategory = ref(null);

    const fetchProducts = (categoryId = '') => {
      axios
        .get("http://localhost:3000/api/product/show", {
          params: { category: categoryId },
        })
        .then((response) => {
          products.value = response.data.products;
          filteredProducts.value = products.value;
          noProductsFound.value = filteredProducts.value.length === 0;
        })
        .catch((error) => {
          console.error(error);
          noProductsFound.value = true;
        });
    };
    const fetchCategories = () => {
      axios
        .get("http://localhost:3000/api/categories/add")
        .then((response) => {
     
          categories.value = response.data;

       
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId;
      fetchProducts(categoryId);
    };
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const shortenDescription = (description) => {
      const maxLength = 45;
      return description.length > maxLength
        ? description.slice(0, maxLength) + '...'
        : description;
    };

    const currentIndex = ref(0);
    const totalSlides = ref(3); 
    let intervalId = null;

    const goToSlide = (index) => {
      currentIndex.value = index;
    };

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
    };

    const prevSlide = () => {
      currentIndex.value =
        (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
    };

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000); 
    };

    const stopAutoScroll = () => {
      clearInterval(intervalId);
    };
    const loadCategories =()=>{
      axios.get('http://localhost:3000/api/categories/add')
        .then(response => {
          console.log(response.data.categories);
          categories.value = response.data.categories; 
        })
        .catch(error => {
          console.error('Error loading categories:', error);
        });
    }
    onMounted(() => {

      fetchProducts();
      startAutoScroll();
      fetchCategories();

    });

    onUnmounted(() => {
      stopAutoScroll();
    });
    const openModal = (product) => {
      selectedProduct.value = product;
      isModalOpen.value = true;
    };
    const closeModal = () => {
      selectedProduct.value = null;
      isModalOpen.value = false;
    };
    const router = useRouter();

    const addToCart = async (productId) => {
      try {
        const response = await axios.post('http://localhost:3000/api/product/cart/', { product_id: productId },{ withCredentials: true });
        
        console.log('Cart response:', response.data.cart);


        const cart = response.data.cart;
    if (cart[productId]) {
      console.log(`Product ${productId} is in the cart with quantity: ${cart[productId].qty}`);
    } else {
      console.error(`Product ${productId} is not in the cart`);
    }

        await Toast.fire({
        icon: "success",
        title: "เพิ่มลงตะกร้าสำเร็จ"
        });
        closeModal();
      }catch (error) {
        console.error('Error adding product to cart:', error);
      }
    };

    return {
      products,
      filteredProducts,
      noProductsFound,
      numberWithCommas,
      shortenDescription,
      currentIndex,
      goToSlide,
      nextSlide,
      prevSlide,
      isModalOpen,
       selectedProduct,
      openModal,
      closeModal,
      fetchCategories,  
      selectCategory,
      categories, 
      addToCart,
      loadCategories
      
    };
  },
};
</script>

<style scoped>

.search-shop{
  padding: 5px;
  border-radius: 20px;
  width: 100%;
  outline: none;
}
.w-3 {
  width: 12px;
  height: 12px;
}
.sidebar {
  width: 30%;
  padding: 10px;
  height: 30%;
  border-radius: 20px;
  
}
.product-items {
  cursor: pointer;
  transition: 0.3s;
  width: 10vw;
  height: 17vw;
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}
.product-items:hover {
  transform: scale(1.03);
}
.product-img {
  width: 100%;
  height: 70%;
  border-radius: 10px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  background-color: white;
  
}

.Detail-modal{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-page{
  min-width: 70vw;
  min-height: 30vw;
  max-width: 70vw;
  max-height: 50vw;
  overflow: scroll;
  background-color: white;
  border-radius:15px ;
  padding: 20px;
  
}

.modaldesc-content{
  
  display: flex;
  width: 100%;
}
.modaldesc-detail{
  
  margin-left: 10px;
}

.modaldesc-img{
  width: 20vw;
  height: 20vw;
  object-fit: cover;
  border-radius: 10px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  
}
.btn-control{
  
  display: flex;
  justify-content: flex-end;
}
.btns-control{
  
  display: flex;
  justify-content: center;
}
.btn{
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 1.2vw;
  transition: 0.3s;

}

.btns{
  
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 0.9vw;
  transition: 0.3s;

}
.btn-buy{
  background:black;
  color: white;
  
}
.btn-buy:hover{
  background: #4285f4;
  
}
.btn-close {
    cursor: pointer;
    transition: 0.3s;
    width: auto;
height: auto;
  }

  .btn-close:hover svg {
    fill: #DB3434; 
  }

  .cartlist{
    background-color: hotpink;
  }

  .cartlist-items{
    background-color: #DB3434;
  }
  .cartlist-left{
    background-color: aquamarine;
  }

  .cartlist-right{
    background-color: darkgreen;
  }
</style>
