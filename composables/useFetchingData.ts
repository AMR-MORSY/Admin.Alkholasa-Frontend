
import { useLoadingPageStore } from '@/stores/loadingPageStore';

export const useFetchingData = () => {
    const basUrl = import.meta.env.VITE_BASE_URL;

    const axios= useNuxtApp().$axios
    let Api = axios.create({
        headers:{
            "Content-Type":"aplication/json",
            'Access-Control-Allow-Origin':'*',

        }
    });
    Api.defaults.withCredentials = true;
    Api.defaults.baseURL = basUrl;
    Api.interceptors.request.use(function(config){

       

        const store=useLoadingPageStore();

        store.changeLoadingState()
        
        return config;

    })
    Api.interceptors.response.use(function(config){

        const store=useLoadingPageStore();

        store.changeLoadingState()
        return config;

    })


    let uploadApi = axios.create();

    uploadApi.defaults.withCredentials = true;
    uploadApi.defaults.baseURL = basUrl;

    uploadApi.interceptors.request.use(function (config) {
        // config.headers.Authorization = `Bearer`;
        config.headers["Content-Type"]="multipart/form-data";
        const loadingIndicator=useLoadingIndicator();
        loadingIndicator.start()
     
        return config;
    });

    return {
        uploadApi,
        Api,
    }

}