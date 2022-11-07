<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const appRouter = useRouter();

const email = ref('')
const password = ref('')

let showPassword = ref(false);
const toggleShow = () => {
    showPassword.value = !showPassword.value;
};

const goBack = () => {
    appRouter.go(-1)
}

const emailIsEmpty = ref(false)
const validationEmail = () => {
    emailIsEmpty.value = email.value == null || email.value == ''
}

const passwordIsEmpty = ref(false)
const validationPassword = () => {
    passwordIsEmpty.value = password.value == null || password.value == ''
}

defineEmits('Login')
const LoginUser = () => {
    if(!(validationEmail() && validationPassword())){
        return {email : email.value , password : password.value}
    }
}
</script>
 
<template>
<div id="loginPage">
        <div class="ml-10 mr-10 bg-white shadow lg:mr-20 lg:ml-20 md:mr-20 sm:mr-20 md:ml-20 sm:ml-20 rounded-3xl">
            <div class="float-right mr-3">
                <img src="https://cdn-icons-png.flaticon.com/512/992/992660.png" alt="" width="33" @click="goBack"
                    class="mt-4" />
            </div>
            <div class="flex">
                <div class="ml-5 -mt-24 basis-6/12">
                    <img src="../../assets/login1.png" class=" lg:mt-10 lg:h-auto md:h-95 md:mt-28 sm:mt-32">
                </div>

                <div class="p-10 mt-12 basis-6/12 input-login">
                    <div class="text-2xl font-semibold text-center ">Login to <span class="text-yellow-600">OASIP!</span></div>
                    <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                        <div class="flex flex-col">
                            <label class="leading-loose ">Email :</label>
                            <input type="text"
                                class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                placeholder="Enter your email" v-model="email" @keyup="validationEmail"
                                :class="{ 'empty-field': emailIsEmpty }" maxlength="50" />
                        </div>

                        <!-- Password input -->
                        <div class="flex flex-col">
                            <label class="leading-loose">Password :</label>
                            <div class="flex">
                                <input v-if="!showPassword" type="password"
                                    class="w-11/12 px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                    placeholder="Enter your password" v-model="password" @keyup="validationPassword"
                                    :class="{ 'empty-field': passwordIsEmpty }" />

                                <input v-if="showPassword" type="text"
                                    class="w-11/12 px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                    placeholder="Enter your password" v-model="password" @keyup="validationPassword"
                                    :class="{ 'empty-field': passwordIsEmpty }" />

                                <button
                                    class="flex-1 px-2 py-2 ml-1 text-gray-600 border border-gray-300 rounded-md w-9 focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                    @click="toggleShow">
                                    <span class="icon is-small is-right">
                                        <i class="fas" :class="{
                                            'fa-eye-slash': !showPassword,
                                            'fa-eye': showPassword,
                                        }"></i>
                                    </span>
                                </button>
                            </div>

                        </div>
                        <div class="flex pt-3">
                            <button @click="$emit('Login' , LoginUser())"
                                class="flex items-center justify-center w-32 px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none">
                                Login
                            </button>
                        </div>

                        <p class="pt-3 text-xs text-gray-400"> Don't have an account?
                            <router-link :to="{ name: 'SignUp' }">
                                <span class="text-blue-500">Sign Up</span>
                            </router-link>
                        </p>
                    </div>

                </div>

            </div>
        </div> 
    </div>  
</template>
 
<style scoped>
.input-login {
    width: 50%;
}

.empty-field {
    border: red 2px solid;
}
</style>