<script setup lang="ts">
import { ref } from 'vue'

const formDataRegister = ref<{
  email: string
  password: string
}>({
  email: '',
  password: '',
})
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


    <form class="px-10 h-3/4 bg-yellow-200 flex flex-col justify-evenly rounded-xl" @submit.prevent>
        <div class="flex flex-col">
          <label for="correo" class="">Usuario</label>
          <div>
            <InputText class="p-inputtext-lg w-1/2" v-model="formDataRegister.email" type="text" />
          </div>
        </div>
        <div class="flex flex-col">
          <label for="correo" class="">Correo</label>
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
        <div class="flex flex-col">
          <label for="password" class="">Verificar Contraseña</label>
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
      <div class="">
        <button class="bg-[#ccba8d] w-3/4 h-2/5 rounded-lg">jugar</button>
      </div>

    </form>
  
  </body>
</template>
