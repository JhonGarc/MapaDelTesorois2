<script setup lang="ts">
import { db } from '@/services/firebase'
import { collection, getDocs, query } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

import puntos from '@/components/Puntos.vue'

import { PuntoXy } from '@/typings'

const puntosxy = ref<PuntoXy[]>([]);

async function getPuntos() {
  const colRef = collection(db, 'puntos');
  const querySnap = await getDocs(colRef);

  querySnap.forEach((doc) => {
  puntosxy.value.push(doc.data() as PuntoXy)
  });
  
}


onMounted(() => {
  getPuntos()
})


</script>


<template>
  <body class="fixed top-0 left-0 w-full h-full bg-cover bg-center" style="background-image: url('/src/assets/images/bg.jpg');">
    <section class="h-1/5 flex">
      <router-link class="bg-black rounded-lg h-1/3 w-20 my-10 mx-5" :to="{ name: 'index' }"><i class="pi pi-chevron-left mt-4" style="color: aliceblue;"></i></router-link>
    </section>
    <div>
      <puntos v-if="puntosxy?.length > 0" :elements="puntosxy"></puntos>
      <span v-else>No points</span>
    </div>
  </body>
</template>
