<template>
  <form @submit.prevent="submitPostForm" enctype="multipart/form-data">
    <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload
            file</label>

          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help" id="file_input" type="file" @change="onFileChange">
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX.
            800x400px).</p>

          <div v-if="fileErrors">
            <p style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;" v-for="error in fileErrors"
              :key="error">{{ error }}</p>
          </div>
          <div v-show="v$.image.$errors">
            <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
              v-for="error in v$.image.$errors">
              {{ error.$message }}</div>
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
</template>


<script  setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, requiredIf, maxLength } from '@vuelidate/validators'



const props = defineProps({
  post: Object | null,
  formType: String
});

var fileErrors=ref();

var formValues = ref(
  {
     content: '',
  }
);

const rules = computed(() => (

  {
   
    content: {
      minLength: helpers.withMessage('content is required', minLength(30)),
      required: helpers.withMessage('content is required', required),
    
    },
    image: { requiredIf: helpers.withMessage('Photos is required', requiredIf(props.formType == "Submit")) }

  }

))



</script>

<style></style>