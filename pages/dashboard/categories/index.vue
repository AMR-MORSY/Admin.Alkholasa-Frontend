<template>
    <div v-if="categories.length" class=" grid xl:grid-cols-3 sm:grid-cols-1">

        <div class="sm:col-start-1 lg:col-start-2">
            <DataTable :value="categories" stripedRows showGridlines>
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name"></Column>
                <Column header="Edit">
                    <template #body="slotProps">
                        <Button label="Delete" rounded outlined severity="info"
                            @click="deleteCategory(slotProps.data.id)" />
                    </template>

                </Column>

            </DataTable>

        </div>


    </div>
    <form @submit.prevent="submitNewCategory">
        <div class=" grid xl:grid-cols-3 sm:grid-cols-1">

            <div class="sm:col-start-1 lg:col-start-2 ">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category Name:</label>
                <input type="text" id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name" v-model="formValues.name">
                <div v-show="v$.name.$errors">
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                        v-for="error in v$.name.$errors">
                        {{ error.$message }}</div>
                </div>
            </div>

            <div class="sm:col-start-1 lg:col-start-2">
                <Button label="Submit" type="submit" rounded outlined severity="secondary" class=" mt-4" />
               
            </div>




        </div>
    </form>
    <Button @click="showTemplate" label="View" />
   
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, alpha, maxLength } from '@vuelidate/validators'
import { useToast } from "primevue/usetoast";



const toast = useToast()



const showTemplate = () => {
   
   
 
        toast.add({ severity: 'success', summary: 'Can you send me the report?', group: 'bc' });
      
    
};

const categories = ref([]);
const formValues = ref({
    name: ''
})

const rules = computed(() => (

    {
        name: {
            required: helpers.withMessage('Name is required', required),
            alpha: helpers.withMessage('Name must be alphaNum', alpha),
            maxLength: helpers.withMessage('Name is not more than 50 char', maxLength(50))

        },

    }

))




const v$ = useVuelidate(rules, formValues)


const getCategories = async () => {

    const url = "/categories";

    const { Api } = useFetchingData();

    Api.get(url).then((response) => {
        categories.value = response.data.data;
        console.log(categories.value)


    }).catch((error) => {

    })




}

const deleteCategory = (id) => {

    const url = `/categories/${id}`;

    const { Api } = useFetchingData();

    Api.delete(url).then((response) => {

        if (response.data.success == true) {
            getCategories()
            toast.add({severity: 'success', summary: 'Category Deleted Successfuly', group: 'SFB',life:"3000"})
        }


    }).catch((error) => {

    })

}

const submitNewCategory = async () => {

    const isFormCorrect = await v$.value.$validate()

    if (!isFormCorrect) {
        return alert("Some fields are incorrect ")

    }

    const url = "/categories";

    const { Api } = useFetchingData();
    console.log(formValues.value)

    Api.post(url, formValues.value).then((response) => {

        if (response.data.success == true) {
           
            getCategories()
            toast.add({severity: 'success', summary: 'Category inserted Successfuly', group: 'SFB',life:"3000"})
        }


    }).catch((error) => {

    })



}

onMounted(() => {
    getCategories()



})


</script>

<style lang="scss" scoped></style>