
import { defineStore } from 'pinia'
export const useLoadingPageStore = defineStore('loading-page',()=>{
  const loadPage=ref(false);

  function changeLoadingState(){
    return loadPage.value= !loadPage.value;
  }

  return {loadPage,changeLoadingState}

})
