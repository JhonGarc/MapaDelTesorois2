<script setup lang="ts"></script>

<template>
  <body
    class="fixed flex flex-col justify-center top-0 left-0 w-full h-[100vh] bg-cover bg-center overflow-hidden px-10 py-10"
    style="background-image: url('/src/assets/images/bg.jpg')"
  >
    <section class="flex absolute top-2 left-5 justify-center align-center">
      <router-link class="bg-black rounded-xl w-20 p-1" :to="{ name: 'index' }"
        ><i class="pi pi-chevron-left" style="color: aliceblue"></i
      ></router-link>
    </section>
    <p>Felicidades, has encontrado el cofre del tesoro</p>
    <Image src="/src/assets/images/chest.png" alt="Image" width="250" />
  </body>
</template>
