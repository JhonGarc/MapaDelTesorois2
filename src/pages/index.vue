<script setup lang="ts"></script>

<template>
  <body
    class="fixed top-0 left-0 w-full h-full bg-cover bg-center"
    style="background-image: url('/src/assets/images/bg.jpg')"
  >
    <div class="flex flex-col h-full">
      <section class="flex flex-col h-1/2">
        <p class="text-[40px] mx-auto my-[100px] h-1/6 md: lg: xl:text-[80px]">¡PIRATAS, ADELANTE!</p>
        <Image class="mx-auto mt-5" src="/src/assets/images/login.png" alt="Image" width="345" />
      </section>
      <section class="justify-center items-center flex-col space-y-4 h-1/3 mt-40">
        <router-link
          class="flex justify-center items-center bg-[#f0bf61] rounded-3xl w-3/4 h-2/5 mx-auto mt-6 text-3xl text-white"
          :to="{ name: 'login' }"
          >{{ $t('Iniciar') }}</router-link
        >

        <router-link
          class="bg-[#ccba8d] rounded-3xl w-3/4 h-2/5 mx-auto text-3xl text-white flex justify-center items-center"
          :to="{ name: 'register' }"
          >{{ $t('Registrarse') }}</router-link
        >
      </section>
    </div>
  </body>
</template>
