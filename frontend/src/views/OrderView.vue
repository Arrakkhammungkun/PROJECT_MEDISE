<template>
  <Nevbar>
    <!-- Header Section -->
    <div class="flex justify-center mb-[2rem]">
      <h1 class="text-3xl font-bold mx-32 mb-4 mt-32 flex p-2">
        <div class="flex-auto w-1/2">ตะกร้าสินค้า</div>
      </h1>
    </div>

    <!-- Cart Items Section -->
    <div class=" w-[55rem] mx-auto">
      <!-- <div class="flex border-y-2 p-2">
          <input type="checkbox" class="mr-4" />
          <div class="flex-auto w-10/12 font-bold">รายละเอียดสินค้า</div>
          <div class="flex-auto w-1/6 text-center font-bold">จำนวน</div>
          <div class="flex-auto w-1/6 text-center font-bold">ราคา</div>
          <div class="flex-auto w-1/6 text-center font-bold">ทั้งหมด</div>
        </div> -->
      <!-- <hr class="w-[71dvw] font-bold border-1 mx-auto"> -->
      <!-- Repeat this block for each item -->
      <div class="w-[55rem] mx-auto">
        <div class="flex items-start border-t-2 py-[1.5rem]">
          <div class="flex-shrink-0">
            <div
              class="cursor-pointer transition duration-300 w-[11vw] h-[12vw] bg-white rounded-lg shadow-lg"
            >
              <img
                src="https://www.fascino.co.th/fasue-img/600/744/resize/2/3/235547_1__1.png"
                alt="Product Image"
                class="w-full h-full rounded-[10px] object-cover bg-white shadow-lg"
              />
            </div>
          </div>
          <div class="flex flex-col ml-8 flex-grow">
            <div class="flex justify-between mt-[1rem] w-full">
              <div class="font-bold text-[1.2vw]">ชื่อสินค้า</div>
              
            </div>
            <div class="text-sm pt-1 text-gray-500 w-3/4 text-wrap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              blanditiis debitis nam illum vero neque odio, culpa explicabo.
              Mollitia eius maiores sequi iure rerum, quae blanditiis molestiae
              ducimus enim in.
            </div>
            <div class="text-sm pt-1 text-gray-500">Details</div>

          </div>
          <div class="w-[25dvw] flex-col justify-end items-end">
            <div class="flex justify-between">
              <div>
                ราคา
              </div>
              <div>
                <h1 class="font-bold text-end">฿ 130.00 </h1>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                จำนวน
              </div>
              <div>
                <h1 class="font-bold text-end">1 </h1>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                ราคารวม
              </div>
              <div>
                <h1 class="font-bold text-end">฿ 130.00 </h1>
              </div>
            </div>

            <div class="relative flex justify-end mt-auto">
              <button class="font-bold absolute bottom-0 translate-y-10 text-red-600">ลบสินค้า</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[55rem] mx-auto">
        <div class="flex items-start border-y-2 py-[1.5rem]">
          <div class="flex-shrink-0">
            <div
              class="cursor-pointer transition duration-300 w-[11vw] h-[12vw] bg-white rounded-lg shadow-lg"
            >
              <img
                src="https://www.fascino.co.th/fasue-img/600/744/resize/2/3/235547_1__1.png"
                alt="Product Image"
                class="w-full h-full rounded-[10px] object-cover bg-white shadow-lg"
              />
            </div>
          </div>
          <div class="flex flex-col ml-8 flex-grow">
            <div class="flex justify-between mt-[1rem] w-full">
              <div class="font-bold text-[1.2vw]">ชื่อสินค้า</div>
              <div class="font-bold">฿ 130.00</div>
            </div>
            <div class="text-sm pt-1 text-gray-500 w-3/4 text-wrap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              blanditiis debitis nam illum vero neque odio, culpa explicabo.
              Mollitia eius maiores sequi iure rerum, quae blanditiis molestiae
              ducimus enim in.
            </div>
            <div class="text-sm pt-1 text-gray-500">Details</div>
            <div class="relative flex justify-end mt-auto">
              <button class="font-bold absolute bottom-0 translate-y-10 text-red-600">ลบสินค้า</button>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="flex items-center border-b-2  p-2">
          
          <img src="https://down-th.img.susercontent.com/file/a5c3ba96b85a55fe2d23df122c54805e" alt="Product Image" class="w-36 h-36 mr-4" />
          <div class="flex-auto w-5/12">
            <div>Name</div>
            <div class="text-sm text-gray-500">Details</div>
            <button class="text-sm text-red-500">Remove</button>
          </div>
          <div class="flex-auto w-16 text-center flex items-center justify-center">
            <button class="border px-2">-</button>
            <input type="text" value="1" class="border w-8 text-center mx-1" />
            <button class="border px-2">+</button>
          </div>
          <div class="flex-auto w-16 text-center">฿ 130.00</div>
          <div class="flex-auto w-16 text-center">฿ 130.00</div>
        </div> -->

      <!--   -->
        <div class="flex justify-between mt-[1.5rem]">
          <div>
            <h1 class="text-[1.2vw] font-bold mb-4 ml-[-0.5rem] mt-4 flex p-2">
              ราคาทั้งหมด
            </h1>
          </div>
          <div>
            <h1 class="text-[1.2vw] font-bold mr-[-0.5rem] mb-4 mt-4 flex p-2">
              300.00 $
            </h1>
          </div>
        </div>

      
        <div class="w-full flex flex-col justify-center items-center mt-10  h-auto py-4 rounded-lg ">
          <button class="btn btn-active btn-neutral text-white w-full rounded-xl h-[3.5vw] text-2xl">
              ชำระเงิน (฿311.00)
          </button>
        </div> 
      <div class="mb-[20rem]"></div>
    </div>
  </Nevbar>
</template>

<script setup>
import Nevbar from "@/layout/Nevbar.vue";
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

.custom-shadow {
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.03))
    drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08));
}
.btns {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 0.9vw;
  transition: 0.3s;
}
.btn-buy {
  background: #fb3b38;
  color: black;
}
.btn-buy:hover {
  background: #e91c19;
}
.btn {
  padding: 5px 20px;
  cursor: pointer;
  border: 2 px black;
  border-radius: 5px;
  font-size: 1.2vw;
  transition: 0.3s;
}
</style>
