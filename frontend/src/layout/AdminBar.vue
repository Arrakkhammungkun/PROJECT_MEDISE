<template>
<div>
    <!-- Navbar -->
    <header
    class="navbar z-50 fixed top-0 left-0 w-screen h-24 bg-[#046588] shadow-md transition-transform duration-100 ease-out p-6 pr-8  flex justify-between items-center"
    :class="{ 'navbar--hidden translate-y-[-100%] shadow-none': !showNavbar }"
    >
    
    <div class="flex items-center">
        <RouterLink :to="{ name: 'home' }" class="ml-24">
        <img class="w-[4rem] h-[4rem]" src="../img/iconLogo.png" alt="icon" />
        </RouterLink>
        <div class="text-2xl font-bold text-white ml-4">จัดการระบบหลังบ้าน</div>
    </div>

    <ul class=" flex list-none p-0 m-0 mr-[2rem]">
        
        <div>
        <div class="dropdown dropdown-end">

        <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
            <font-awesome-icon :icon="['fas', 'bars']" size="2xl" />
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow flex ">
            <li><RouterLink :to="{name:'mangedocter'}">
                <font-awesome-icon :icon="['fas', 'user-doctor']" />
                จัดการแพทย์
            </RouterLink></li>

            <li><RouterLink :to="{name:'editproduct'}">
                <font-awesome-icon :icon="['fas', 'shop']" />
                จัดการสินค้า
            </RouterLink></li>
            <li><RouterLink :to="{name:'home'}">
                <font-awesome-icon :icon="['fas', 'house']" />
                จัดการหน้าบ้าน
            </RouterLink></li>
        </ul>
      </div>
        </div>
    </ul>
    </header>

    <!-- Main Content (Slot for dynamic content) -->
    <slot></slot>

    <!-- Footer -->
    <footer class="footer min-w-min bg-[#046588] text-base-content p-10">
        
    </footer>
</div>
</template>



<script>


export default {
data() {
    return {
    showNavbar: true,
    lastScrollPosition: 0,
    isDropdownOpen: false,
    hover: false,
    isActive: false
    };
},
mounted() {
    window.addEventListener('scroll', this.onScroll);
    document.addEventListener('click', this.handleClickOutside);
},
beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('click', this.handleClickOutside);
},
methods: {
    onScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < 0) {
        return;
    }

    if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 40) {
        return;
    }

    this.showNavbar = currentScrollPosition < this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition;
    },
    showDropdown() {
    this.dropdownOpen = true;
    },
    hideDropdown() {
    this.dropdownOpen = false;
    },
    handleClickOutside(event) {
    const dropdown = this.$el.querySelector('.relative > div');
    if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false;
    }
    },
    toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isActive = !this.isActive;
    }
},
};
</script>



<style scoped>
.navbar--hidden {
transform: translateY(-100%);
}

.relative {
position: relative;
}

.relative > div {
position: absolute;
}


</style>


