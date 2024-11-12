<template>
  <div class="min-h-screen bg-[#F0F8FF] flex flex-col items-center">
    
    <section class="relative p-6 bg-[#c8eefa] shadow-md rounded-lg w-10/12 border  top-[6rem]">
      
      <div class="flex items-start relative">
        <div class="absolute top-0 left-32 transform -translate-x-1/2 -translate-y-1/2">
          <img src="https://static.vecteezy.com/system/resources/previews/038/512/906/original/illustration-women-portrait-free-vector.jpg" alt="Profile" class="w-48 h-48 rounded-full border-4 border-white shadow-lg">
        </div>
        
        <div class="flex-grow  ml-60"> 
          <h2 class="text-xl font-bold">แพทย์หญิง อุรานีย์ อินชนะ</h2>
          <div class="flex items-center space-x-2 mt-2">
            <span class="text-gray-500">Status:</span>
            <span class="text-green-500 font-medium">Online</span>
          </div>
          
        </div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-9 h-9 bg-white rounded-lg p-1">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
            <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/>
          </svg>
        </button>
        
      </div>

      <div class="flex justify-between items-center mt-6 border-[4px] bg-white relative top-8 border-[#0296c7] p-4">
        <h3 class="text-lg font-semibold">Queue Room (1)</h3>
        <button class="text-black hover:underline flex items-center ml-4">
          ดูทั้งหมด
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div class="space-y-4 mt-16 mb-[1.5rem]  border-black border-[2px] p-4 bg-[#d9f0fa] shadow-xl drop-shadow-lg  rounded-lg mx-8 overflow-auto max-h-[23vw] min-h-[23vw]">

        <button class="flex items-stretch justify-between p-2  bg-[#fff]  rounded-lg h-full w-full shadow-md ransition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300">
          <div class="flex items-start text-start">
            <img src="https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png" alt="Patient Avatar" class="w-20 h-20 border rounded-lg">
            <div class="ml-4 w-48">
              <p class="font-semibold">นางสาว อนุรักษา คำมุกดา</p>
              <p class="text-sm text-gray-500">อายุ: 32 ปี</p>
              <p class="text-sm text-gray-500">เพศ ชาย</p>
             
            </div>
          </div>
          <div class="flex flex-col items-center space-y-2 h-full  ml-auto relative right-7 top-2 ">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-5 h-5 mr-2">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM96 75l0-11 192 0 0 11c0 25.5-10.1 49.9-28.1 67.9L192 210.7l-67.9-67.9C106.1 124.9 96 100.4 96 75z"/>
              </svg>
              <span class="text-gray-500">Waiting...</span>
            </div>
            
            <i class="fas fa-hourglass-half text-gray-500"></i>
            <span class="text-red-500 font-semibold">00:20:00</span>
          </div>
        </button>
        <button class="flex items-stretch justify-between p-2  bg-[#fff]  rounded-lg h-full w-full shadow-md ransition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300">
          <div class="flex items-start text-start">
            <img src="https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png" alt="Patient Avatar" class="w-20 h-20 border rounded-lg">
            <div class="ml-4 w-48">
              <p class="font-semibold">นางสาว อนุรักษา คำมุกดา</p>
              <p class="text-sm text-gray-500">อายุ: 32 ปี</p>
              <p class="text-sm text-gray-500">เพศ ชาย</p>
             
            </div>
          </div>
          <div class="flex flex-col items-center space-y-2 h-full  ml-auto relative right-7 top-2 ">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-5 h-5 mr-2">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
                <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM96 75l0-11 192 0 0 11c0 25.5-10.1 49.9-28.1 67.9L192 210.7l-67.9-67.9C106.1 124.9 96 100.4 96 75z"/>
              </svg>
              <span class="text-gray-500">Waiting...</span>
            </div>
            
            <i class="fas fa-hourglass-half text-gray-500"></i>
            <span class="text-red-500 font-semibold">00:20:00</span>
          </div>
        </button>





        

        

      </div>

    </section>


    
    

    <section class="mt-[8rem] p-8 bg-[#E1F5FE] shadow-md rounded-lg w-10/12 border border-black">
      <div class="flex justify-between items-center ">
        <h3 class="text-lg font-semibold">นัดหมาย</h3>
      </div>

      <div class="border-t border-black my-2 mx-4"></div>

      <h3 class="text-lg font-semibold">Today's upcoming</h3>

      <div class="flex grid-cols-1 md:grid-cols-4 gap-8 mt-4 overflow-x-auto whitespace-nowrap ">
        
        <button class="bg-[#BAECFD] pt-2 px-1 pb-1 rounded-lg transition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300 inline-block min-w-[18.8vw]">
          <div class="flex flex-wrap items-center justify-center">
            <a class="mr-2 ">เวลานัดหมาย :</a>
            <p class="text-gray-500 bg-white py-1 px-4 rounded-lg border-2">20.00 น.</p>
          </div>

          <div class="flex items-center bg-white p-2 rounded-lg mt-2 drop-shadow-xl ">
            <img src="/src/img/User1.png" alt="Upcoming Avatar" class="w-20 h-20 border rounded-lg">
            <div class="ml-3 text-start relative bottom-3">
              <span class="font-semibold block truncate max-w-[160px]">นางสาว กัลยารัต ยิ้มยอ</span>
              <p class="text-sm text-gray-500">อายุ: 27 ปี</p>
              <p class="text-sm text-gray-500">น้ำหนัก: 60 กิโลกรัม</p>
              
            </div>
          </div>
        </button>
        <button class="bg-[#BAECFD] pt-2 px-1 pb-1 rounded-lg transition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300 inline-block min-w-[18.8vw]">
          <div class="flex flex-wrap items-center justify-center">
            <a class="mr-2 ">เวลานัดหมาย :</a>
            <p class="text-gray-500 bg-white py-1 px-4 rounded-lg border-2">20.00 น.</p>
          </div>

          <div class="flex items-center bg-white p-2 rounded-lg mt-2 drop-shadow-xl ">
            <img src="/src/img/User1.png" alt="Upcoming Avatar" class="w-20 h-20 border rounded-lg">
            <div class="ml-3 text-start relative bottom-3">
              <span class="font-semibold block truncate max-w-[160px]">นางสาว กัลยารัต ยิ้มยอ</span>
              <p class="text-sm text-gray-500">อายุ: 27 ปี</p>
              <p class="text-sm text-gray-500">น้ำหนัก: 60 กิโลกรัม</p>
              
            </div>
          </div>
        </button>
        <button class="bg-[#BAECFD] pt-2 px-1 pb-1 rounded-lg transition ease-out delay-150 hover:-translate-y-2 hover:scale-100 duration-300 inline-block min-w-[18.8vw]">
          <div class="flex flex-wrap items-center justify-center">
            <a class="mr-2 ">เวลานัดหมาย :</a>
            <p class="text-gray-500 bg-white py-1 px-4 rounded-lg border-2">20.00 น.</p>
          </div>

          <div class="flex items-center bg-white p-2 rounded-lg mt-2 drop-shadow-xl ">
            <img src="/src/img/User1.png" alt="Upcoming Avatar" class="w-20 h-20 border rounded-lg">
            <div class="ml-3 text-start relative bottom-3">
              <span class="font-semibold block truncate max-w-[160px]">นางสาว กัลยารัต ยิ้มยอ</span>
              <p class="text-sm text-gray-500">อายุ: 27 ปี</p>
              <p class="text-sm text-gray-500">น้ำหนัก: 60 กิโลกรัม</p>
              
            </div>
          </div>
        </button>





        

        
        

        

        

        

        

      </div>
    </section>

  </div>
  <div class="my-[10rem] bg-[#F0F8FF]">
   
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
</style>