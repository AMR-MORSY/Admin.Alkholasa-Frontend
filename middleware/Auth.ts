import { useMyAuthenticationStore } from "@/stores/authentication";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware((to, from) => {
    const AuthStore=useMyAuthenticationStore();
    const {isLogin}=storeToRefs(AuthStore);
    if(isLogin.value && to.path!=="/")
    {
       return 
    }
    return abortNavigation()

})
