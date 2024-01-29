<template>
  <div>



    <form @submit.prevent="submitPostForm" enctype="multipart/form-data">

      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload
            file</label>

          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help" id="file_input" type="file" @change="onFileChange">
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX.
            800x400px).</p>

          <div v-if="fileErrors.length">
            <p style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;" v-for="error in fileErrors"
              :key="error">{{ error }}</p>
          </div>
          <div v-show="v$.image.$errors">
            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
              v-for="error in v$.image.$errors">
              {{ error.$message }}</div>
          </div>





        </div>

        <div>
          <label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
          <select
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="categories" v-model="formValues.postCategory">
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

        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title" v-model="formValues.postTitle">
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
            placeholder="meta Title" v-model="formValues.metaTitle">
          <div v-show="v$.metaTitle.$errors">
            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
              v-for="error in v$.metaTitle.$errors">
              {{ error.$message }}</div>
          </div>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
          <!-- <input type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="summary..." v-model="formValues.summary"> -->
          <textarea
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="summary..." v-model="formValues.summary" cols="10" rows="5"></textarea>
          <div v-if="v$.summary.$errors">
            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
              v-for="error in v$.summary.$errors">
              {{ error.$message }}</div>
          </div>
        </div>
        <div>
          <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publish:</label>
          <div class="flex items-center mb-4">

            <input type="radio" id="publish0" name="publish" value=0 v-model="formValues.published"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="publish0" class="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">No</label>
          </div>

          <div class="flex items-center mb-4">

            <input type="radio" id="publish1" name="publish" value=1 v-model="formValues.published"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="publish1" class="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Yes</label>
          </div>
        </div>

      </div>



      <div style=" display: flex; align-items: center; justify-content: center;">

        <ClientOnly>
          <ckEditor v-model="formValues.content" />
        </ClientOnly>





        <div v-if="v$.content.$errors">
          <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
            v-for="error in v$.content.$errors">
            {{ error.$message }}</div>
        </div>

      </div>












      <button type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{
          formType }}</button>



    </form>



  </div>
</template>

<script  setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, requiredIf } from '@vuelidate/validators'




const fileErrors = ref([])
const categories = ref([]);





const props = defineProps({
  post: Object | null,
  formType: String
});

var formValues = ref(
  {
    postCategory: null,
    postTitle: '',
    metaTitle: '',
    summary: '',
    content: '',
    image: '',
    published: 0

  }
);

const rules = computed(() => (

  {
    postTitle: {
      required: helpers.withMessage('Title is required', required)

    },
    metaTitle: { required: helpers.withMessage('Meta Title is required', required) }, // Matches state.lastName
    summary: { required: helpers.withMessage('summary is required', required) },
    postCategory: { required: helpers.withMessage('category is required', required) },
    content: {
      minLength: helpers.withMessage('content is required', minLength(30)),
      required: helpers.withMessage('content is required', required)
    },
    image: { requiredIf: helpers.withMessage('Photo is required', requiredIf(props.formType == "Submit")) }

  }

))




const v$ = useVuelidate(rules, formValues)


const onFileChange = (event) => {
  fileErrors.value = [];

  const [_file] = event.target.files
  formValues.value.image = _file;

  function findFileType(name) {
    const nameArray = name.split(".");

    if (nameArray[1] == "jpg" || nameArray[1] == "JPG" || nameArray[1] == "PNG" || nameArray[1] == "png" || nameArray[1] == "svg" || nameArray[1] == "SVG") {
      return true
    }
    return false

  }

  if (formValues.value.image != null) {


    if (!findFileType(formValues.value.image.name)) {
      function checkTypeError(error) {
        return error == "photo type is not supported";
      }
      let type = fileErrors.value.find(checkTypeError);


      if (!type) {
        fileErrors.value.push("photo type is not supported")

      }


    }
    else {

      function checkSizeError(error) {
        return error == "Photo size Should be less than 1MB";
      }

      fileErrors.value = fileErrors.value.filter((el) => {

        return el != "photo type is not supported";

      });
      if (formValues.value.image.size > 1024 * 1024) {


        let size = fileErrors.value.find(checkSizeError);


        if (!size) {
          fileErrors.value.push("Photo size Should be less than 1MB")

        }


      }




    }

  }

}



const getPostCategories = async () => {

  const url = "/categories";

  const { Api } = useFetchingData();

  Api.get(url).then((response) => {
    categories.value = response.data.data;


  }).catch((error) => {

  })




}

const submitPostForm = async () => {

  console.log(formValues.value)



  const isFormCorrect = await v$.value.$validate()

  if (!isFormCorrect || fileErrors.length > 0) {
    return alert("Some fields are incorrect  ")

  }




  const body = {
   
    "title": formValues.value.postTitle,
    "image": formValues.value.image,
    "summary": formValues.value.summary,
    "category_id": formValues.value.postCategory,
    "user_id": 2,
    "metaTitle": formValues.value.metaTitle,
    "content": formValues.value.content,
    "published": formValues.value.published
  }

  console.log(body)

  if (props.formType == "Submit") {

    const url = "/posts";

    const { uploadApi } = useFetchingData();


    uploadApi.post(url, body).then((response) => {
      console.log(response)

    }).catch((error) => {

      console.log(error)

    })

    return;


  }


  const url = `/posts/update/${props.post.id}`;
  const { uploadApi } = useFetchingData();
  
  uploadApi.post(url, body).then((response) => {
    console.log(response)

  }).catch((error) => {

    console.log(error)

  })










}

watch(() => props.post, () => {
  if (props.post != null) {

    formValues.value =
    {
      postCategory: props.post.category_id,
      postTitle: props.post.title,
      metaTitle: props.post.metaTitle,
      summary: props.post.summary,
      content: props.post.content,
      image: '',
      published: props.post.published

    }





  }



})


onMounted(() => {
  getPostCategories();


})

</script> 


<style></style>