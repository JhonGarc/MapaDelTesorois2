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
    class="fixed top-0 left-0 w-full h-full bg-cover bg-center"
    style="background-image: url('/src/assets/images/bg.jpg')"
  >
    <section class="flex bg-blue-100">
      <router-link class="bg-black rounded-lg h-1/3 w-20 my-10 mx-5" :to="{ name: 'index' }"
        ><i class="pi pi-chevron-left mt-4" style="color: aliceblue"></i
      ></router-link>
    </section>
    <section >
      <div >
        <form  @submit.prevent>
        <div class="h-auto">
          <div class="bg-red-200 flex flex-col justify-center -------------">
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
        </div>
        <div class="bg-blue-200 ">
          <button class="bg-[#ccba8d]">jugar</button>
        </div>
        </div>
       
      </form>
      </div>
      
    </section>
  </body>
</template>
