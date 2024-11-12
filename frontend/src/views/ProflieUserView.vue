<template>
  <Nevbar class="body bg-[#E1F5FE] min-h-screen">

    <div v-if="loading"  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
        <div class="loader"></div> 
    </div>
    <div class="pt-32 bg-[#E1F5FE] mb-10">
      <h1
        class="text-3xl font-bold mx-32 mb-4 border-2 flex p-2 border-[#4285F4] w-[70%] bg-white"
      >
        ข้อมูลส่วนตัว
      </h1>

      <div class="flex mx-44 mb-4 h-[32vw]">
        <div class="flex w-[25%]">
          <div class="row mb-5">
            <div class="flex mb-5">
              <div v-if="user">
                <!-- Image preview -->
                <img
                  :src="profile.profileImage || 'src/img/user.png'"
                  alt=""
                  class="w-[5vw] h-[5vw] object-cover rounded-full flex mr-4 bg-white"
                />
              </div>
              <div v-if="user">


                <div
                  :class="{
                    'text-black': isEditing,
                    'text-[#4285F4]': !isEditing,
                  }"
                  class="link link-hover font-bold text-[#4285F4]"
                  @click="cancelEditing"
                >
                  {{ user.firstname }} {{ user.lastname }}
                </div>
                <div
                  class="link link-hover font-normal text-base text-[#7F7F7F]"
                  @click="startEditing"
                >
                  แก้ไขข้อมูลส่วนตัว
                </div>
              </div>
              <!-- Hidden file input -->
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                class="hidden"
              />
            </div>

            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="w-[2vw] h-[2vw] object-cover flex mx-4"
              >
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
              <div>
                <div class="link link-hover font-bold text-black">
                  บัญชีของฉัน
                </div>
                <div class="ml-2">
                  <div
                    :class="{
                      'text-[#7F7F7F]': !isEditing,
                      'text-[#4285F4]': isEditing,
                    }"
                    class="link link-hover font-normal text-base"
                    @click="startEditing"
                  >
                    ข้อมูลส่วนตัว
                  </div>
                  <div
                    class="link link-hover font-normal text-base text-[#7F7F7F]"
                  >
                    บัญชีธนาคาร&บัตร
                  </div>
                  <div
                    class="link link-hover font-normal text-base text-[#7F7F7F]"
                  >
                    การตั้งค่าความเป็นส่วนตัว
                  </div>
                  <div
                    class="link link-hover font-normal text-base text-[#7F7F7F]"
                  >
                    เปลี่ยนรหัสผ่าน
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Information Display -->
        <div v-if="!isEditing" class="flex w-[75%]">
          <div
            class="w-[40%] h-full bg-white p-8 rounded shadow-md flex flex-col items-center justify-center"
          >
            <div v-if="user" class="mb-4">
              <img
                :src="profile.profileImage || 'src/img/user.png'"
                alt=""
                class="w-[13vw] h-[13vw] object-cover rounded-full"
              />
            </div>
            <div v-if="user" class="text-center font-bold">
              <h1>{{ user.firstname }} {{ user.lastname }}</h1>
            </div>
          </div>

          <div v-if="user" class="ml-2 w-[60%] bg-white p-20 rounded shadow-md">
            <div class="font-bold text-black">
              ชื่อจริง
              <p class="font-normal text-[#7F7F7F] ml-4 my-2">
                {{ user.firstname }}
              </p>
            </div>
            <div class="font-bold text-black">
              นามสกุล
              <p class="font-normal text-[#7F7F7F] ml-4 my-2">
                {{ user.lastname }}
              </p>
            </div>
            <div class="font-bold text-black">
              อายุ
              <p class="font-normal text-[#7F7F7F] ml-4 my-2">
                {{ calculateAge(user.birthdate) }} ปี
              </p>
            </div>
            <div class="font-bold text-black">
              เพศ
              <p class="font-normal text-[#7F7F7F] ml-4 my-2">
                {{ user.gender }}
              </p>
            </div>
            <div class="font-bold text-black">
              อีเมล์
              <p class="font-normal text-[#7F7F7F] ml-4 my-2">
                {{ user.email }}
              </p>
            </div>
          </div>
        </div>

        <!-- Profile Edit Mode -->
        <div v-if="isEditing" class="flex w-[75%]">
          <div
            class="w-[40%] h-full bg-white px-8 pt-8  pb-3 rounded shadow-md flex flex-col items-center justify-center"
          >
            <div v-if="user" class="mb-4">
              <img
                v-if="imagePreviewUrl"
                :src="imagePreviewUrl"
                alt="Image Preview"
                class="w-[13vw] h-[13vw] object-cover rounded-full bg-white"
              />

              <img
                v-else
                :src="user.profileImage || 'src/img/user.png'"
                alt=""
                class="w-[13vw] h-[13vw] object-cover rounded-full bg-white"
              />
            </div>
            <div class=" ">
              <button @click="triggerFileInput" class="text-black border-2 px-2 mx-1 py-[0.3rem] rounded-md">
                เลือกรูป
              </button>
              <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                style="display: none"
              />
              <button @click="uploadImage" class="text-black border-2 px-2  mt-2 mx-1 rounded-md py-[0.3rem]">
                อัปโหลด
              </button>
            </div>
          </div>

          <div
            class="ml-2 w-[60%] bg-white px-20 rounded pt-10 pb-[15.4rem] shadow-md h-fit min-h-[33rem]"
          >
            <form action="" @submit.prevent="submitname">
              <div class="text-[#7F7F7F]">
                ชื่อจริง
                <input
                  v-model="Nameprofile.firstname"
                  required
                  type="text"
                  class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
                />
              </div>
              <div class="text-[#7F7F7F]">
                นามสกุล
                <input
                  v-model="Nameprofile.lastname"
                  required
                  type="text"
                  class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
                />
              </div>

              <button
                type="submit"
                class="flex h-[2.5rem] ml-[14dvw] text-white text-xl font-bold items-center mt-3 justify-center bg-[#4285F4] rounded-md p-2 w-[8rem]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="w-[1.5vw] h-[1.5vw] mr-2"
                >
                  !Font Awesome Free 6.6.0 by @fontawesome -
                  https://fontawesome.com License -
                  https://fontawesome.com/license/free Copyright 2024 Fonticons,
                  Inc.
                  <path
                    fill="#ffffff"
                    d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </svg>
                บันทึก
              </button>
            </form>
            <!-- Add input fields for editing -->
          </div>
        </div>
      </div>

      <div v-if="!isEditing" class="flex mx-44 justify-end">
        <div class="w-[75%] h-[32vw] bg-white p-8 rounded shadow-md">
          <h2 class="text-xl font-bold mb-4 border-b-2 pb-2 border-[#4285F4]">
            ที่อยู่ของฉัน
          </h2>

          <div v-if="user" class="w-fit">
            <div
              v-if="user.address"
              class="max-w-[15rem] w-fit break-words p-2 border-custom border-2"
            >
              {{ user.address }}
            </div>
            <div v-else>ไม่มีที่อยู่...</div>
          </div>
        </div>
      </div>

      <div v-if="isEditing" class="flex mx-44 justify-end">
        <!-- Edit address form -->
        <div class="w-[75%] h-[32vw] bg-white p-8 rounded shadow-md">
          <h2
            class="flex text-xl font-bold mb-4 border-b-2 pb-2 border-[#4285F4] justify-between"
          >
            <div class="font-bold p-2">ที่อยู่ของฉัน</div>
            <div>
              <button
                @click="openModal"
                class="flex text-white text-xl font-bold bg-[#4285F4] rounded-lg p-2 w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="w-[1.1vw] h-[1.1vw] mr-2"
                >
                  <path
                    fill="#ffffff"
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                  />
                </svg>
                เพิ่มที่อยู่
              </button>
            </div>
          </h2>

          <div v-if="user" class="w-fit">
            <div
              v-if="user.address"
              class="max-w-[15rem] w-fit break-words p-2 border-custom border-2"
            >
              {{ user.address }}
            </div>
            <div v-else>ไม่มีที่อยู่...</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="isModalOpen" class="Detail-modal">
        <div class="modal-bgm"></div>
        <div class="modal-page">
          <h2 class="text-3xl font-bold pb-2 mb-5 ml-4">ที่อยู่ใหม่</h2>
          <form @submit.prevent="submitAddress">
            <!-- Add input fields for new address -->
            <div class="font-semibold text-black ml-4">
              ชื่อจริง
              <input
                required
                v-model="address.firstname"
                type="text"
                class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
              />
            </div>
            <div class="font-semibold text-black ml-4">
              นามสกุล
              <input
                required
                v-model="address.lastname"
                type="text"
                class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
              />
            </div>
            <div class="font-semibold text-black ml-4">
              จังหวัด
              <input
                required
                v-model="address.province"
                type="text"
                class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
              />
            </div>
            <div class="font-semibold text-black ml-4">
              อำเภอ
              <input
                required
                v-model="address.district"
                type="text"
                class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
              />
            </div>
            <div class="font-semibold text-black ml-4">
              ตำบล
              <input
                required
                v-model="address.subdistrict"
                type="text"
                class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
              />
            </div>
            <div class="font-semibold text-black ml-4">
              บ้านเลขที่ ซอย,หมู่,ถนน แขวง/ตำบล
              <input
                required
                v-model="address.fullAddress"
                type="text"
                class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
              />
            </div>
            <div class="font-semibold text-black ml-4">
              รหัสไปรษณีย์
              <input
                v-model="address.postalCode"
                type="number"
                pattern="\d{5}"
                title="กรุณาใส่รหัสไปรษณีย์ 5 หลัก"
                class="block font-normal pl-1 text-[#000000] my-2 rounded-md border-2 h-[2rem] w-[100%]"
                required
              />
            </div>

            <div class="flex justify-end mt-10">
              <button
                @click="closeModal"
                class="btn-close flex text-black text-xl font-bold hover:bg-[#C4C4C4] rounded-lg p-2 w-auto mr-4"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                class="flex text-white text-xl font-bold bg-[#4285F4] hover:bg-[#337cf1] rounded-lg p-2 w-auto"
              >
                ยืนยัน
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="imagePreviewUrl" class="mt-4">
      <img
        :src="imagePreviewUrl"
        alt="Image Preview"
        class="w-48 h-48 object-cover"
      />
    </div>
    <div class="mb-[10rem]"></div>
  </Nevbar>
</template>

<script>
import Nevbar from "@/layout/Nevbar.vue";
import { ref, onMounted, computed, reactive } from "vue";
import axios from "axios";
import { useUserStore } from '@/stores/counter';
import { faL } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  components: {
    Nevbar,
  },

  setup() {
    const user = ref(null);
    let isModalOpen = ref(false);
    const userStore = useUserStore();
    const profile =computed(() => userStore.user);
    const selectedFile = ref(null);

    const imagePreviewUrl = ref("");

    const fileInput = ref(null);
    const loading =ref(false)
    const triggerFileInput = () => {
      console.log("triggerFileInput called");
      if (fileInput.value) {
        fileInput.value.click(); 
      } else {
        console.error("File input not found");
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
        imagePreviewUrl.value = URL.createObjectURL(file);
        
      } else {
        console.error("No file selected");
      }
    };

    const uploadImage = async () => {
      
      if (!selectedFile.value) {
        console.error("No file selected");
        return;
      }
     
      const formData = new FormData();
      formData.append("image", selectedFile.value);

      
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:3000/student/profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );  
        const imageUrl = response.data.data.profileImage;
        const updatedUserData = { ...userStore.user, profileImage: imageUrl };
        userStore.setUser(updatedUserData, userStore.token);
        
      } catch (error) {
        console.error(
          "Upload failed:",
          error.response ? error.response.data : error.message
        );
      }finally{

        await performLoadingOperation()
        selectedFile.value = null;
        
      }
    };
    const simulateLoading = (duration) => {
      return new Promise((resolve) => setTimeout(resolve, duration));
    };
    const performLoadingOperation = async () => {
      loading.value = true;

      try {
      
        await simulateLoading(2000); 
        loading.value = false;
        const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ"
      });
      } catch (error) {
        console.error("An error occurred during loading:", error);
      }
    };

    const Nameprofile = ref({
      firstname: "",
      lastname: "",
    });

    const address = ref({
      firstname: "",
      lastname: "",
      province: "",
      district: "",
      subdistrict: "",
      fullAddress: "",
      postalCode: "",
    });

    const imageUrl = computed(() => {
      console.log(
        user.value?.profileImage
          ? `http://localhost:3000/uploads/${user.value.profileImage}`
          : ""
      );
      return user.value?.profileImage
        ? `http://localhost:3000/uploads/${user.value.profileImage}`
        : "";
    });

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:3000/student/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          user.value = response.data.data; 
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const refreshProfile = () => {
      fetchUserProfile(); 
    };

    onMounted(() => {
      fetchUserProfile();
    });
    const submitname = () => {
      const token = localStorage.getItem("token");
      const addfirstname = Nameprofile.value.firstname;
      const addlastname = Nameprofile.value.lastname;
      fetch("http://localhost:3000/student/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: addfirstname,
          lastname: addlastname,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          performLoadingOperation()
          fetchUserProfile()
          Nameprofile.value = {
            firstname: "",
            lastname: "",
          };
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    };
    const submitAddress = () => {
      
      const token = localStorage.getItem("token");
      const addressString = `${address.value.firstname} ${address.value.lastname} ${address.value.fullAddress} ต.${address.value.subdistrict} อ.${address.value.district} จ.${address.value.province} ${address.value.postalCode}`;

      fetch("http://localhost:3000/student/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: addressString }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          
          performLoadingOperation()
          fetchUserProfile()
          closeModal();
          address.value = {
            firstname: "",
            lastname: "",
            province: "",
            district: "",
            subdistrict: "",
            fullAddress: "",
            postalCode: "",
          };
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };
    const openModal = () => {
      isModalOpen.value = true;
    };


    return {
      user,
      imageUrl,
      address,
      submitAddress,
      isModalOpen,
      closeModal,
      openModal,
      submitname,
      Nameprofile,
      uploadImage,
      triggerFileInput,
      handleFileChange,
      selectedFile,
      imagePreviewUrl,
      fileInput,
      profile,
      refreshProfile,
      loading,
  
    };
  },
  data() {
    return {
      isEditing: false,

      imageSrc: null,
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      email: "",
    };
  },
  methods: {
    startEditing() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
    },

    // onImageChange(event) {
    //   const file = event.target.files[0];
    //   if (file && file.type.startsWith("image/")) {
    //     this.imageSrc = URL.createObjectURL(file);
    //   }
    // },

    calculateAge(birthdate) {
      const birthDate = new Date(birthdate);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    },
  },

  computed: {
    isFormValid() {
      return (
        this.firstName.trim() !== "" &&
        this.lastName.trim() !== "" &&
        this.age.trim() !== "" &&
        this.gender.trim() !== "" &&
        this.email.trim() !== ""
      );
    },
  },
};
</script>

<style scoped>
.border-custom {
  border-width: 2px;
  border-image: repeating-linear-gradient(
      45deg,
      #6fa6d6,
      #6fa6d6 33px,
      transparent 0,
      transparent 41px,
      #f18d9b 0,
      #f18d9b 74px,
      transparent 0,
      transparent 82px
    )
    1;
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
  min-width: 35vw;
  min-height: auto;
  max-width: 70vw;
  max-height: 55vw;
  z-index: 50;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
}

.btn-close {
  cursor: pointer;
  transition: 0.3s;
  width: auto;
  height: auto;
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
  z-index: 100;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
  z-index: 100;
}
@keyframes l15{ 
  100%{transform: rotate(1turn)}
}
</style>
