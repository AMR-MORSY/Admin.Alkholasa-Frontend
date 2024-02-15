
import { useLoadingPageStore } from '@/stores/loadingPageStore';
import { useMyAuthenticationStore } from '@/stores/authentication';
import { usePrimevueToastService } from './usePrimevueToastService';

import { storeToRefs } from 'pinia';



export const useFetchingData = () => {
    const basUrl = import.meta.env.VITE_BASE_URL;
    const toastService = usePrimevueToastService();
    const store = useLoadingPageStore();
    
    const AuthStore = useMyAuthenticationStore();
    
    const { token } = storeToRefs(AuthStore);



    function unauthorizedUnauthintecatedErrorResponse(error: any) {
        if (error.response.status == 419 || error.response.status == 403 || error.response.status == 401) {
         
             toastService.add({
                severity: "error",
                group: "SFB",
                summary: error.response.data.message,
                life: 3000
            })

        } else if (error.response.status == 404) {
            navigateTo( { path: "/notFound" })
           
        }
    }

    const axios = useNuxtApp().$axios
    let Api = axios.create({
        headers: {
            "Content-Type": "aplication/json",
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${token.value}`

        }
    });
    Api.defaults.withCredentials = true;
    Api.defaults.baseURL = basUrl;
    Api.interceptors.request.use(function (config) {



      
        store.changeLoadingState()



        return config;

    })
    Api.interceptors.response.use(function (response) {


        store.changeLoadingState()

        return response;



    },
        function (error) {

            store.changeLoadingState()
            if (!error.response) {
                console.log(error)
                toastService.add({ severity: "error", summary: "Network Error", life: 3000, group: "SFB" })

            }
            else {
                unauthorizedUnauthintecatedErrorResponse(error)

            }


        });


    let uploadApi = axios.create();

    uploadApi.defaults.withCredentials = true;
    uploadApi.defaults.baseURL = basUrl;

    uploadApi.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token.value}`;
        config.headers["Content-Type"] = "multipart/form-data";
     

        return config;
    });

    return {
        uploadApi,
        Api,
    }

}



