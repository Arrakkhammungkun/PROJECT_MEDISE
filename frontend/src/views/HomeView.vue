<script setup>
import Nevbar from '@/layout/Nevbar.vue';
import { useUserStore } from '../stores/counter'
import { RouterLink } from 'vue-router';
const userStore = useUserStore();
const user = userStore.user;

</script>

<template>
  <Nevbar>
    <div id="header " class="bg-white">
            <div  class="relative min-h-[105vh] bg-[url('./img/background.png')]  bg-cover  bg-no-repeat my-[5rem] drop-shadow-md bg-[50%_10%] ">
                <div>
                    <div class="absolute inset-0 bg-black opacity-30   "></div>
                    <div   div class="relative z-10"></div>

                </div>
                <div>


                    <div class="relative z-10 w-[60rem] justify-center flex flex-col      ">
                        <div class="justify-center my-[7rem] " >
                            <h1 class="text-[5vw] font-bold italic tracking-wider text-center text-[#E1F5FE]">ปรึกษาแพทย์ออนไลน์</h1>
                            <div class="flex justify-center">
                                <p class="text-[1.25vw] text-center font-normal tracking-wide  italic text-[#E1F5FE] w-[39rem] ">เว็ปสำหรับการพบหมอออนไลน์ตั้งแต่พบแพทย์เพื่อให้คำปรึกษา สั่งยา เก็บประวัติและติดตามผล ให้บริการหลากหลายในด้านผิวทุกส่วนต่าง ๆ อาทิ ปรึกษาเรื่องสิว ชนิดผิวพรรณแต่ละประเภท รวมไปถึงผมและหนังศีรษะ</p>
                            </div>
                        </div>
                            <div class="relative z-10 right-1 left-2" >
                                <RouterLink :to="{name:'doctor'}">
                                    <button 
                                    class="
                                    w-[30rem] text-[#E1F5FE] shadow-lg text-[2.25rem] ml-[15vw] font-bold italic h-[4.25rem] rounded-[1.7rem] bg-[#2F7CE1] hover:text-[#ffff] hover:bg-[#4498ed] transition duration-300" >
                                        ปรึกษาแพทย์ทันที
                                    </button>
                                </RouterLink>

                        </div>   
                    </div>

                </div>         

            </div>
        </div>
        <div class="mt-[9rem] ">
            <div class="">
                <div class=" justify-center flex">
                    <h1 class="text-[2.25vw] font-bold text-[#264D8E]">เกี่ยวกับเรา</h1>
                </div>
                <div class="flex justify-center ">
                    <p class="w-[38rem] my-2 text-center text-[#2553A8] opacity-[70%]">คือเว็ปสำหรับการพบหมอออนไลน์ที่ได้รวบรวมเหล่าทีมแพทย์ผิวหนังเฉพาะทางจากโรงพยาบาลและคลินิกชั้นนำมาให้คำปรึกษาปัญหาด้านผิวหนังออนไลน์</p>
                </div>
            </div>
            <div class="flex flex-wrap h-fit  justify-center my-[6rem] mb-[12rem] relative ">
                <div class="bg-[#E1F5FE] w-[70vw] h-[45dvh]  rounded-[2vw] border-black border-2   ">
                    <div class="flex   my-[0.5rem] items-center">
                        <img class="w-20 h-20 ml-[3rem] mr-[1rem]" src="../img/iconLogo.png" alt="">
                        <h1 class="text-[1.5vw] font-bold">เว็ปปรึกษาแพทย์ออนไลน์</h1>
                    </div>
                    <div class="flex">
                        
                        <p class="text-[1.25vw] ml-[9rem] text-lefe text-[#000000] w-[40vw]  ">คือเว็ปสำหรับการพบหมอออนไลน์ที่ได้รวบรวมเหล่าทีมแพทย์ผิวหนังเฉพาะทางจากโรงพยาบาลและคลินิกชั้นนำมาให้คำปรึกษาปัญหาด้านผิวหนังออนไลน์ แบบ End to End Dermatology Platform ตั้งแต่พบแพทย์เพื่อให้คำปรึกษา สั่งยา เก็บประวัติและติดตามผล ให้บริการหลากหลายในด้านผิวทุกส่วนต่าง ๆ อาทิ ปรึกษาเรื่องสิว ชนิดผิวพรรณแต่ละประเภท รวมไปถึงผมและหนังศีรษะ</p>
                        <img class="w-[35dvw] absolute h-[58dvh] mt-[-20.5dvh] ml-[48dvw]" src="../img/bike.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div id="4" >
            <div  class="relative min-h-[105vh] bg-[url('./img/call.jpeg')]  bg-cover bg-center my-[6rem] drop-shadow-md">
                <div>
                    <div class="absolute inset-0 bg-[#1A2D51] opacity-70  "></div>
                    <div   div class="relative z-10"></div>

                </div>
                <div class=" h-screen relative z-20 flex items-center flex-col sm:flex-row ">
                    <div class="w-[43dvw] mx-[6dvw] mt-[-25dvh]">
                        <h1 class="text-[3rem]   italic tracking-wider font-medium text-center text-[#ffff]">เว็ปปรึกษาแพทย์ออนไลน์สำหรับทุกวัย</h1>
                        <div class="flex justify-center mt-5">
                            <p class="text-[1rem] w-[36dvw] text-center tracking-wider  italic text-[#fff]  ">ติดต่อแพทย์ผู้เชี่ยวชาญในหลายสาขาได้ง่ายๆ จากที่บ้าน ไม่ว่าจะเป็นเด็ก ผู้ใหญ่ หรือผู้สูงอายุ โดยไม่ต้องเดินทางไปโรงพยาบาล เหมาะสำหรับการถามอาการเบื้องต้น รับคำแนะนำทางการแพทย์ หรือติดตามอาการหลังการรักษา สะดวก รวดเร็ว และเข้าถึงง่ายทุกช่วงวัย</p>
                        </div>
                    </div>
                    <div class=" ">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-[2rem] ">
                            <div class="bg-[#C2E2FB] rounded-lg h-[36dvh] w-[17.2dvw]">
                                <div class="flex justify-center p-2">
                                    <img class="w-[5rem] h-[5rem]" src="../img/icon1Home.png" alt="icon">
                                </div>
                                <div class="flex justify-center">
                                    <div >
                                        <p class="text-[1.2rem]">ปรึกษาทุกปัญหา</p>
                                    </div>
                                </div>
                                <div class=" flex justify-center ">
                                    <div class="w-[15dvw]">
                                        <p class=" text-[#8D8D8D] text-left">กับคุณหมอผู้เชี่ยวชาญด้านผิว
                                            หนัง ที่มีการรับรอง ด้านผิวหนังจากแพทยสภา สามารถนัดหมอเพื่อปรึกษาด้านผิวหนังออนไลน์ ได้ตามต้องการ
                                        </p>
                                    </div>
                                        
                                </div>

                            </div>
                            <div class="bg-[#C2E2FB] rounded-lg h-[36dvh] w-[17.2dvw]">
                                <div class="flex justify-center p-2">
                                    <img class="w-[5rem] h-[5rem]" src="../img/icon2Home.png" alt="icon">
                                </div>
                                <div class="flex justify-center">
                                    <div >
                                        <p class="text-[1.2rem]">อยู่ที่ใหนก็หาหมอได้</p>
                                    </div>
                                </div>
                                <div class=" flex justify-center ">
                                    <div class="w-[15dvw]">
                                        <p class=" text-[#8D8D8D] text-left">สามารถปรึกษาแพทย์ได้ตามเวลาที่สะดวก
                                        </p>
                                    </div>
                                        
                                </div>

                            </div>
                            <div class="bg-[#C2E2FB] rounded-lg h-[36dvh] w-[17.2dvw]">
                                <div class="flex justify-center p-2">
                                    <img class="w-[5rem] h-[5rem]" src="../img/icon3Home.png" alt="icon">
                                </div>
                                <div class="flex justify-center">
                                    <div >
                                        <p class="text-[1.2rem]">ปรึกษาแพทย์ได้ทุกเมื่อ</p>
                                    </div>
                                </div>
                                <div class=" flex justify-center ">
                                    <div class="w-[15dvw]">
                                        <p class=" text-[#8D8D8D] text-left">สะดวกสบายเคลียร์ค่าใช้จ่ายหลังเข้ารับการรักษาให้คุณ รู้ค่าบริการก่อนเริ่มหาหมอ
                                        </p>
                                    </div>
                                        
                                </div>

                            </div>
                            <div class="bg-[#C2E2FB] rounded-lg h-[36dvh] w-[17.2dvw]">
                                <div class="flex justify-center p-2">
                                    <img class="w-[5rem] h-[5rem]" src="../img/icon4Home.png" alt="icon">
                                </div>
                                <div class="flex justify-center">
                                    <div >
                                        <p class="text-[1.2rem]">เข้ารับการรักษาทันที</p>
                                    </div>
                                </div>
                                <div class=" flex justify-center ">
                                    <div class="w-[15dvw]">
                                        <p class=" text-[#8D8D8D] text-left">สามารถนัดติดตามอาการและทำการรักษาอย่างต่อเนื่อง เพื่อให้การรักษาเป็นไปอย่างมีประสิทธิภาพพร้อมให้คำ ปรึกษาด้าน
                                        </p>
                                    </div>
                                        
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>    
        </div>
        <div class="mb-[10rem]">
            <div class=" justify-center flex">
                <h1 class="text-[2vw] font-medium text-[#264D8E]">รีวิวประสบการณ์การเข้าพบแพทย์</h1>
            </div>
            <div class="flex justify-center ">
                <p class="w-[40rem] my-2 text-center text-[#1A2D51] opacity-[70%]">การเข้าพบแพทย์ออนไลน์เป็นประสบการณ์ที่สะดวกสบาย แพทย์ให้คำแนะนำอย่างละเอียดและเป็นมืออาชีพ สามารถถามคำถามได้ทันที รู้สึกมั่นใจและได้รับคำตอบที่ชัดเจนโดยไม่ต้องออกจากบ้าน</p>
                
            </div>
            <div class="flex justify-center">
                <hr class="border-t-2 border-red-400 w-[30rem] my-4">       
            </div>
            <div class="flex justify-center">
                <div class="mt-[4rem] flex space-x-[4rem] ">
                    <div>
                        <div class="bg-[#E1F5FE] h-[35dvh] w-[23dvw] rounded-lg border-[1px] border-black " >
                            <div class="flex w-[20rem] ml-2 mt-3">
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                            </div>
                            <div class="w-[18rem] flex justify-center">
                                <div>
                                    <p class="text-left ml-5 text-[1.2rem] font-extralight text-[#1A2D51] opacity-[90%] mt-2">“สะดวกสบายมากครับไม่จำเป็น ต้องไปเดินทางไปหาหมออีกต่อไป คิดว่าตอบโจทย์คนที่ไม่มีเวลาได้ ดีเลยครับแอปใช้งานง่ายและ รวดเร็วดีครับถ้ายาวเกิน...”</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-[23dvw] flex flex-col items-center justify-center">
                            <div class="mt-[1.5rem]">
                                <img class="w-[4.5rem] h-[4.5rem]" src="../img/boy.png" alt="">
                            </div>
                            <div >
                                <h1  class="text-[1.5rem] text-[#1A2D51] opacity-[90%]">Touch</h1>
                                <p class="text-[1.1rem] text-[#696969]">อายุ 20 ปี</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="bg-[#E1F5FE] h-[35dvh] w-[23dvw] rounded-lg border-[1px] border-black " >
                            <div class="flex w-[20rem] ml-2 mt-3">
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                            </div>
                            <div class="w-[18rem] flex justify-center">
                                <div>
                                    <p class="text-left ml-5 text-[1.2rem] font-extralight text-[#1A2D51] opacity-[90%] mt-2">“สะดวกสบายมากครับไม่จำเป็น ต้องไปเดินทางไปหาหมออีกต่อไป..”</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-[23dvw] flex flex-col items-center justify-center">
                            <div class="mt-[1.5rem]">
                                <img class="w-[4.5rem] h-[4.5rem]" src="../img/woman.png" alt="">
                            </div>
                            <div >
                                <h1  class="text-[1.5rem] text-[#1A2D51] opacity-[90%]">Touch</h1>
                                <p class="text-[1.1rem] text-[#696969]">อายุ 20 ปี</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="bg-[#E1F5FE] h-[35dvh] w-[23dvw] rounded-lg border-[1px] border-black " >
                            <div class="flex w-[20rem] ml-2 mt-3">
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                                <div>
                                    <img class="w-[2.5rem] h-[2.5rem]" src="../img/star.png" alt="">
                                </div>
                            </div>
                            <div class="w-[18rem] flex justify-center">
                                <div>
                                    <p class="text-left ml-5 text-[1.2rem] font-extralight text-[#1A2D51] opacity-[90%] mt-2">“สะดวกสบายมากๆ คุณหมอแนะนำดีมาก น่ารัก”</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-[23dvw] flex flex-col items-center justify-center">
                            <div class="mt-[1.5rem]">
                                <img class="w-[4.5rem] h-[4.5rem]" src="../img/man.png" alt="">
                            </div>
                            <div >
                                <h1  class="text-[1.5rem] text-[#1A2D51] opacity-[90%]">Touch</h1>
                                <p class="text-[1.1rem] text-[#696969]">อายุ 20 ปี</p>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
                    
                            
                    
        </div>
        <div >

        </div>
        <div id="footter " >
            <div  class="relative h-screen bg-[url('./img/backgroundFoot.jpg')]  bg-cover bg-center  drop-shadow-md">
                <div>
                    <div class="absolute inset-0 bg-[#1A2D51] opacity-60   "></div>
                    <div   div class="relative z-10"></div>

                </div>
                <div>


                    <div class="relative z-10 w-full  flex items-center  justify-center    ">
                        <div class="justify-center my-[2rem] " >
                            <h1 class="text-[2.5vw]   tracking-wider text-center font-extrabold text-[#E1F5FE]">ปรึกษาแพทย์ง่ายๆใน 4 ขั้นตอน</h1>
                            <div class="flex justify-center">
                                <p class="text-[1.1vw] mt-1 text-center  tracking-wide   text-[#E1F5FE] w-[53rem] ">เพื่อปรึกษาแพทย์ออนไลน์ เพียงลงทะเบียน เลือกแพทย์ จองเวลาที่สะดวก ชำระเงิน และเข้ารับคำปรึกษาผ่านวิดีโอคอลหรือแชท ทุกขั้นตอนง่ายและสะดวก ไม่ต้องเดินทาง</p>
                            </div>
                        </div>
                        
                    </div>

                </div>      
                <div class="flex justify-center">
                    <div class=" z-10 relative mt-2   flex-col sm:flex-row  gap-[3rem] grid grid-cols-1 sm:grid-cols-2  ">
                        <div>
                            <div class="bg-[#E1F5FE] w-[40dvw] h-[26dvh] relative rounded-lg border-[1px] border-black">
                                <div class="flex items-center mt-4 ml-4">
                                    <div>
                                        <img class="w-[3.5em] h-[3.5rem] mr-3" src="../img/number1.png" alt="">
                                    </div>
                                    <div >
                                        <h1 class="text-[1.5rem] tracking-wide ">เลือกแพทย์ที่ต้องการปรึกษา</h1>
                                    </div>
                                </div>
                                <div class="absolute right-[0.5rem] bottom-[-1rem]">
                                    <img class="w-[13dvw] h-[27dvh]" src="../img/foot1.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bg-[#E1F5FE] w-[40dvw] h-[26dvh] relative rounded-lg border-[1px] border-black">
                                <div class="flex items-center mt-4 ml-4">
                                    <div>
                                        <img class="w-[3.5rem] h-[3.5rem] mr-3" src="../img/number2.png" alt="">
                                    </div>
                                    <div class="mx-[1rem]">
                                        <h1 class="text-[1.5rem] tracking-wide ">รอแพทย์ตอบกลับการปรึกษา</h1>
                                    </div>
                                </div>
                                <div class="absolute right-[2rem] bottom-[0.75rem]">
                                    <img class="w-[9dvw] h-[17dvh]" src="../img/foot2.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bg-[#E1F5FE] w-[40dvw] h-[26dvh] relative rounded-lg border-[1px] border-black">
                                <div class="flex items-center mt-4 ml-4">
                                    <div>
                                        <img class="w-[3.5em] h-[3.5rem] mr-3" src="../img/number3.png" alt="">
                                    </div>
                                    <div >
                                        <h1 class="text-[1.5rem] tracking-wide ">พบแพทย์ผ่านระบบแชท</h1>
                                    </div>
                                </div>
                                <div class="absolute right-[0.5rem] bottom-[0.75rem]">
                                    <img class="w-[13dvw] h-[22dvh] rounded-lg" src="../img/foot3.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bg-[#E1F5FE] w-[40dvw] h-[26dvh] relative rounded-lg border-[1px] border-black">
                                <div class="flex items-center mt-4 ml-4">
                                    <div class="">
                                        <img class="w-[3.5em] h-[3.5rem] mr-3  " src="../img/number4.png" alt="">
                                    </div>
                                    <div class="mx-[1rem]">
                                        <h1 class="text-[1.5rem] tracking-wide -2 ">ชำระเงินพร้อมรับผลสรุปการรักษาและรับยาที่แพทย์แนะนำ (ถ้ามี)</h1>
                                    </div>
                                </div>
                                <div class="absolute right-[1.5rem] bottom-[-0.10rem]">
                                    <img class="w-[10dvw] h-[18dvh]" src="../img/foot4.png" alt="icon">
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
 

            </div>
        </div>

  </Nevbar>
</template>
