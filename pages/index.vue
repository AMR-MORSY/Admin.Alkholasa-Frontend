<template>
    <div class="container">

        <div class="form-container">




            <p class=" text-center" style="color:  #673EE6 ; font-size: 1.5rem; font-weight: 700;">
                Sign in
            </p>

            <form @submit.prevent="submitLoginForm" novalidate>

                <div class="my-3">

                    <div class="input-group ">
                        <span class="input-group-text" id="email">

                            Email

                        </span>

                        <input class="form-control " :class="{ 'is-invalid': v$.email.$errors.length }" type="text"
                            v-model.trim="state.email" aria-describedby="email" />



                    </div>
                    <div v-if="v$.email.$errors">
                        <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                            v-for="error in v$.email.$errors">
                            {{ error.$message }}</div>
                    </div>
                </div>



                <div class="input-group ">
                    <span class="input-group-text" id="pass">

                        Password

                    </span>
                    <input class="form-control " :class="{ 'is-invalid': v$.password.$errors.length }" type="password"
                        v-model.trim="state.password" aria-describedby="pass" />

                </div>
                <div v-if="v$.password.$errors">
                    <div style="color: red; font-size: 0.7rem; padding-left: 3px; padding-top: 3px;"
                        v-for="error in v$.password.$errors">
                        {{ error.$message }}</div>
                </div>





                <button class="btn  w-100 mt-3" type="submit">Sign in</button>


            </form>











        </div>


    </div>
</template>

<script >
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { reactive } from 'vue';



export default {
    name: "Login",
    setup() {
        const state = reactive({
            email: '',
            password: ''
        })
        const rules = {
            email: {
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage('please enter a valid email address', email)
            },
            password: { required: helpers.withMessage('Password is required', required) }, // Matches state.lastName

        }

        const v$ = useVuelidate(rules, state);
        const url = "/login";
        const { makePostRequest } = useFetchingData(state, url,  "post", "login","application/json");

        async function submitLoginForm() {
            const isFormCorrect = await v$.value.$validate()
            if (!isFormCorrect) return

            console.log(state)




            const response = await makePostRequest();

           
            
                console.log(response._data)
            




        }

        return {
            state, v$, submitLoginForm,url
        }


    }
}


</script>

<style lang="scss" scoped>
.container {
    height: 100vh !important;

    .form-container {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px !important;
        max-width: 300px;

        button {
            background-color: #673EE6;
            border: unset;
            color: white;
        }

        .links {
            font-size: clamp(13px, 2vw, 15px);
        }

    }

}
</style>