<script setup lang="ts">
import { ref } from 'vue'

const formData = ref<{
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
    <section class="h-1/5 flex">
      <router-link class="bg-black rounded-lg h-1/3 w-20 my-10 mx-5" :to="{ name: 'index' }"
        ><i class="pi pi-chevron-left mt-4" style="color: aliceblue"></i
      ></router-link>
    </section>
    <section>
      <form class="space-y-6 flex flex-col" @submit.prevent>
        <div class="bg-red-200">
          <div class="">
            <label for="correo" class="">Usuario</label>
            <InputText class="p-inputtext-lg" v-model="formData.email" type="text" />
          </div>
          <div class="">
            <div class="">
              <label for="password" class="">Contraseña</label>
            </div>
            <div class="">
              <Password class="p-inputtext-lg" v-model="formData.password" toggleMask :feedback="false" required />
            </div>
          </div>
        </div>
        <div class="bg-blue-200">
            <button class="bg-[#ccba8d]">jugar</button>
        </div>
      </form>
    </section>
  </body>
</template>
