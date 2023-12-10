<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth()

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
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      console.log(errorCode)
      alert('Credenciales incorrectas')
      // ..
    })
}
</script>
<template>
  <body
    class="fixed flex flex-col justify-center top-0 left-0 w-full h-[100vh] bg-cover bg-center overflow-hidden px-10 py-10"
    style="background-image: url('/src/assets/images/bg.jpg')"
  >
    <section class="flex absolute top-2 left-5 justify-center align-center">
      <router-link class="bg-black rounded-xl w-20 p-1" :to="{ name: 'index' }"
        ><i class="pi pi-chevron-left " style="color: aliceblue"></i
      ></router-link>
    </section>

    <Image src="/src/assets/images/estrella.png" alt="Image" width="250" />
    <form class="px-10 h-3/4 bg-yellow-200 flex flex-col justify-evenly rounded-xl" @submit.prevent>
        <div class="flex flex-col">
          <label for="correo" class="">Usuario</label>
          <div>
            <InputText class="p-inputtext-lg w-1/2" v-model="formDataRegister.email" type="text" />
          </div>
        </div>
        <div class="flex flex-col">
          <label for="password" class="">Contraseña</label>
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
          <router-link @click="login()" class=" bg-[#ccba8d] w-20 rounded-lg text-3xl text-white" :to="{ name: 'map' }" >{{ $t('Jugar') }}</router-link>
        </div>
        <p>holaa</p>
       

    </form>
  
  </body>
</template>

