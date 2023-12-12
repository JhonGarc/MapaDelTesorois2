<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()

const formDataRegister = ref<{
  email: string
  password: string
}>({
  email: '',
  password: '',
})

function login() {
  signInWithEmailAndPassword(auth, formDataRegister.value.email, formDataRegister.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log('acceso permitido', user)
      alert('bienvenido' + ' ' + user.email)
      
      // Redirige a la página "map"
      router.push({ name: 'map' });
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      console.log(errorCode)
      alert('Credenciales incorrectas')
    })
}
</script>

<template>
  <body
    class="fixed flex flex-col justify-center items-center top-0 left-0 w-full h-[100vh] bg-cover bg-center overflow-hidden px-5 md:px-10 py-10"
    style="background-image: url('/src/assets/images/bg.jpg')"
  >
    <section class="flex absolute top-2 left-5 justify-center align-center">
      <router-link class="bg-black rounded-xl w-20 p-1" :to="{ name: 'index' }">
        <i class="pi pi-chevron-left " style="color: aliceblue"></i>
      </router-link>
    </section>

    <Image src="/src/assets/images/estrella.png" alt="Image" width="150" />

    <form class="w-full max-w-screen-md mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 h-1/2 bg-white bg-opacity-10 border-4 border-black backdrop-blur-md flex flex-col justify-evenly rounded-xl" @submit.prevent>
      <div class="flex flex-col">
        <label for="correo">Correo</label>
        <div>
          <InputText class="p-inputtext-lg w-full sm:w-2/3 md:w-1/2" v-model="formDataRegister.email" type="text" />
        </div>
      </div>
      <div class="flex flex-col">
        <label for="password">Contraseña</label>
        <div>
          <Password
            class="p-inputtext-lg"
            v-model="formDataRegister.password"
            toggleMask
            :feedback="false"
            required
          />
        </div>
      </div>
      <div>
        <button @click="login" class="bg-[#ccba8d] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg text-3xl text-black">
          {{ $t('Jugar') }}
        </button>
      </div>
    </form>
  </body>
</template>