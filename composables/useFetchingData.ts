




// export const useFetchingData = (formData: object | null, url: string, requestMethod: any, requestKey: string, header: string) => {
// const basUrl = import.meta.env.VITE_BASE_URL;


// const makePostRequest = async () => {
//     let dataResponse = null;
//     const data = await $fetch(url, {
//         method: requestMethod,
//         baseURL: basUrl,
//         credentials: "include",


//         headers: {
//             Authorization: `Bearer 6|g0jALqmhHAxIVN9FJ3uD96KzDlB9l21eBvDKeScS3eb00101`,

//             'Content-Type': "application/json",




//         },
//         body: formData,
//         watch: false,
//         key: requestKey,

//         onResponse({ request, response, options }) {
//             dataResponse=response
//         },


//     })

//     return dataResponse;










// }


// return {
//     makePostRequest
// }


// }



export const useFetchingData = () => {
    const basUrl = import.meta.env.VITE_BASE_URL;

    const axios = useNuxtApp().$axios;
    let Api = axios.create({
        headers:{
            "Content-Type":"aplication/json",
            'Access-Control-Allow-Origin':'*',

        }
    });
    Api.defaults.withCredentials = true;
    Api.defaults.baseURL = basUrl;


    let uploadApi = axios.create();

    uploadApi.defaults.withCredentials = true;
    uploadApi.defaults.baseURL = basUrl;

    uploadApi.interceptors.request.use(function (config) {
        // config.headers.Authorization = `Bearer`;
        config.headers["Content-Type"]="multipart/form-data";
      
     
        return config;
    });

    return {
        uploadApi,
        Api,
    }

}