import { defineStore } from 'pinia'
import { ref } from 'vue';


export const useMyAuthenticationStore = defineStore('myAuthenticationStore', () => {

  
    const user:any= ref(process.client?sessionStorage.getItem('user'):null);


const isLogin=computed(()=>{
  if(user.value)
  {
    return true;
  }
  return false;
})


  const token = computed(() => {
    


    if (user.value) {
     
      return JSON.parse(user.value).token;
    }
    return null;

  });


  function authenticate() {

    if(process.client)
    {
      user.value =sessionStorage.getItem("user")


    }

    






  }
  return {
    authenticate, user, token,isLogin
  }

})
