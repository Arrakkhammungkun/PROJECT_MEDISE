<template>
    <AdminBar class="bg-[#E1F5FE] min-h-screen"> 

    
    <div class="min-h-screen p-4 ">
        <div class="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-[6rem]">
            <h2 class="text-3xl font-bold mb-4 text-blue-900">ข้อมูลแพทย์</h2>
            <p class="text-base font-medium text-gray-800 mb-6">
            สามารถเพิ่มแพทย์และการจัดการข้อมูลของแพทย์
            </p>
            <div v-for="doctor in doctors" :key="doctor._id">
                <biv @click="nextTo(doctor)" class="bg-[#E1F5FE] mb-5 p-4 rounded-lg shadow-md flex ">
                    <img
                    :src="doctor.photo"
                    alt="Doctor"
                    class="w-[10rem] h-[12rem] object-cover mr-4 rounded-lg"
                    />
                    <div class="flex flex-col mt-[0.25rem]">
                    <h2 class="text-lg font-semibold text-blue-950">
                    {{ doctor.firstName }} {{ doctor.lastName }}
                    </h2>

                    <p class="text-gray-950">โรงพยาบาลมหาวิทยาลัยพะเยา</p>
                    <p class="text-gray-950">แพทย์จักษุวิทยา</p>
                    </div>
                </biv>
            </div>


        <div class="mt-6">
            <button
            class="w-44 bg-black text-white ml-[43.2dvw] py-2 rounded-lg hover:bg-blue-400"
            >
            เพิ่มแพทย์
            </button>
        </div>
        </div>
    </div>
 
    </AdminBar>
</template>
<script>
import AdminBar from '@/layout/AdminBar.vue';
import router from '@/router';
import axios from 'axios';  
import { ref, onMounted, onUnmounted, } from 'vue';
import { useRouter } from 'vue-router';

export default{
    components:{
        AdminBar
    },
    setup(){
        const doctors = ref([]);
        const router=useRouter()
        const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/doctors');
            doctors.value = response.data;
            console.log('Doctors fetched:', response.data); 
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
        };  
        const nextTo = (doctor) => {
            const doctorId=doctor._id
            router.push({ name: 'doctorcontack', params: { doctorId } }); // ส่ง doctorId ไปยังหน้าต่อไป
         };
        onMounted(() => {
        
        fetchDoctors();
    
        });

        return{
            doctors ,
            nextTo,
        }
    },
    methods:{
      
    }
}
</script>

