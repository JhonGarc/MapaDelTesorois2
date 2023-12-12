<script setup lang="ts">
</script>

<template>
<body class="fixed top-0 left-0 w-full h-full bg-cover bg-center" style="background-image: url('/src/assets/images/bg.jpg')">
    <div class="my-20">
        <p class="text-3xl">¡Felicidades, has encontrado el mapa del tesoro!</p>
    <Image src="/src/assets/images/chest.png" alt="Image" width="400" class="my-8" />
    </div>
    <router-link
          class="bg-[#ccba8d] rounded-3xl w-2/5 mx-auto text-3xl text-white flex justify-center items-center"
          :to="{ name: 'index' }"
          >{{ $t('Volver a jugar') }}</router-link
        >
</body>
</template>