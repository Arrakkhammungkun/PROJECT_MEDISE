// import { ref } from 'vue'
// import { defineStore } from 'pinia'


// export const useUserStore = defineStore('user', () => {
//   const user = ref(null)
//   const token = ref(localStorage.getItem('token'))


//   function setUser(userData ,userToken) {
//     user.value = userData
//     token.value = userToken
    
//     localStorage.setItem('token',userToken)
//     console.log(user.value); 
//   }

//   function clearUser() {
//     user.value = null
//     token.value = null
//     localStorage.removeItem('token') 
//   }

//   return { user, setUser, clearUser,token }
// })
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  // const user = ref(null);
  const token = ref(localStorage.getItem('token') || null)
  const adminToken = ref(localStorage.getItem('adminToken') || null)

  





  function setUser(userData, userToken) {
    
    user.value = userData
    token.value = userToken
    
    if (userToken) {
      try {
        localStorage.setItem('token', userToken);
      } catch (e) {
        console.error('Error saving token to localStorage:', e);
      }
    }
  
    if (userData) {
      try {
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (e) {
        console.error('Error saving user data to localStorage:', e);
      }
    }
  
    
  }
  








  function clearUser() {
    
    user.value = null
    token.value = null
    adminToken.value=null
     try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminToken');
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }

    console.log('User cleared from store:', user.value);
  }

  function isAuthenticated() {
    return !!token.value;
  }
  function isAdmin() {
    return !!adminToken.value;
  }

  return { user, token, setUser, clearUser, isAuthenticated,isAdmin }
})
