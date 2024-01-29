<template>
    <div>
<!-- 
        <form @submit.prevent="submitPostForm" enctype="multipart/form-data">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload
                        file</label>
                    <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help" id="file_input" type="file" @change="onChangeFile">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX.
                        800x400px).</p>

                    <div v-show="fileErrors.length">
                        <p style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in fileErrors" :key="error">{{ error }}</p>
                    </div>
                    <div v-show="v$.image.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.image.$errors">
                            {{ error.$message }}</div>
                    </div>



                </div>
                <ClientOnly>
                    <div>
                        <label for="categories"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="categories" v-model="formData.postCategory">
                            <option :value=null></option>

                            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name
                            }}
                            </option>


                        </select>
                        <div v-show="v$.postCategory.$errors">
                            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                                v-for="error in v$.postCategory.$errors">
                                {{ error.$message }}</div>
                        </div>

                    </div>
                </ClientOnly>
                <div>
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title" v-model="formData.postTitle">
                    <div v-show="v$.postTitle.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.postTitle.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>
                <div>
                    <label for="metatitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Meta Title</label>
                    <input type="text" id="metatitle"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="meta Title" v-model="formData.metaTitle">
                    <div v-show="v$.metaTitle.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.metaTitle.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
                    <input type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="summary..." v-model="formData.summary"
                        :class="{ 'is-invalid': v$.summary.$errors.length }">
                    <div v-if="v$.summary.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.summary.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>

            </div>
            <ClientOnly>
                <div style=" display: flex; align-items: center; justify-content: center;">
                    <ckEditor v-model="formData.content" />
                    <div v-if="v$.content.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.content.$errors">
                            {{ error.$message }}</div>
                    </div>

                </div>


            </ClientOnly>


            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form> -->

        <PostForm :post="null" :formType="formType"></PostForm>


    </div>
</template>

<script setup>

const formType="Submit"
// import { useVuelidate } from '@vuelidate/core'
// import { required, helpers } from '@vuelidate/validators'






// const fileErrors = ref([])
// const categories = ref([]);


// const formData = reactive({
//     postCategory: null,
//     postTitle: '',
//     metaTitle: '',
//     summary: '',
//     content: '',
//     image: ''

// })
// const rules = {

//     postTitle: {
//         required: helpers.withMessage('Title is required', required)

//     },
//     metaTitle: { required: helpers.withMessage('Meta Title is required', required) }, // Matches state.lastName
//     summary: { required: helpers.withMessage('summary is required', required) },
//     postCategory: { required: helpers.withMessage('category is required', required) },
//     content: { required: helpers.withMessage('content is required', required) },
//     image: { required: helpers.withMessage('Photo is required', required) }



// }




// const v$ = useVuelidate(rules, formData);
// const onChangeFile = (event) => {
//     fileErrors.value = [];

//     const [_file] = event.target.files
//     formData.image = _file;

//     function findFileType(name) {
//         const nameArray = name.split(".");

//         if (nameArray[1] == "jpg" || nameArray[1] == "JPG" || nameArray[1] == "PNG" || nameArray[1] == "png"|| nameArray[1] == "svg"|| nameArray[1] == "SVG") {
//             return true
//         }
//         return false

//     }

//     if(formData.image !=null)
//     {
        

//     if (!findFileType(formData.image.name)) {
//         function checkTypeError(error) {
//             return error == "photo type is not supported";
//         }
//         let type = fileErrors.value.find(checkTypeError);


//         if (!type) {
//             fileErrors.value.push("photo type is not supported")

//         }


//     }
//     else {

//         function checkSizeError(error) {
//             return error == "Photo size Should be less than 1MB";
//         }

//         fileErrors.value = fileErrors.value.filter((el) => {

//             return el != "photo type is not supported";

//         });
//         if (formData.image.size > 1024 * 1024) {


//             let size = fileErrors.value.find(checkSizeError);


//             if (!size) {
//                 fileErrors.value.push("Photo size Should be less than 1MB")

//             }


//         }




//     }

//     }

// }



// const getPostCategories = async () => {
//     const url = "/categories";
//     // const { makePostRequest } = useFetchingData(null, url, "get", "categories","application/json");
//     const { Api } = useFetchingData();
//     // const response = await makePostRequest();
//     Api.get(url).then((response)=>{
//         categories.value = response.data.data;


//     }).catch((error)=>{
        
//     })
//     // if (response.status == 200) {

//     //     categories.value = response._data.data;

//     // }

    
  

// }

// onMounted(() => {

//     getPostCategories();


// })

// const submitPostForm = async () => {
//     const isFormCorrect = await v$.value.$validate()

//     if (!isFormCorrect || fileErrors.length > 0) return


//     const body = {
//         "title": formData.postTitle,
//          "image": formData.image,
//         "summary": formData.summary,
//         "category_id": formData.postCategory,
//         "user_id": 2,
//         "metaTitle": formData.metaTitle,
//         "content": formData.content
//     }

//     console.log(body)

//     const url = "/posts";
//     // const { makePostRequest } = useFetchingData(body, url, "put", "post", "multipart/form-data");
//     const { uploadApi } = useFetchingData();
//     // const response = await makePostRequest();

//     uploadApi.post(url,body).then((response)=>{
//         console.log(response)

//     }).catch((error)=>{

//         console.log(error)

//     })
 
 





// }










</script>

<style lang="scss" scoped></style>