
<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { db } from '@/services/firebase'
import { collection, getDocs, query } from 'firebase/firestore'
import { onMounted, ref,computed } from 'vue'

import { PuntoXy } from '@/typings'

const puntosxy = ref<PuntoXy[]>([]);

const latitud = ref(0)
const longitud = ref(0)

async function getPuntos() {
  const colRef = collection(db, 'puntos');
  const querySnap = await getDocs(colRef);
  
  querySnap.forEach((doc) => {
  puntosxy.value.push(doc.data() as PuntoXy)
  });
  latitud.value = parseFloat(puntosxy.value[0].latitud)
  longitud.value = parseFloat(puntosxy.value[0].longitud)
  
}



onMounted(() => {
  getPuntos()
})
const center = computed(() => {
  return { lat: latitud.value, lng: longitud.value };
});
</script>

<template>
  <section class="h-1/5 flex">
    <router-link class="bg-black rounded-lg h-1/3 w-20 my-10 mx-5" :to="{ name: 'index' }"
      ><i class="pi pi-chevron-left mt-4" style="color: aliceblue"></i
    ></router-link>
  </section>
  <GoogleMap
    api-key="AIzaSyBhDknILN83Fc8eLama7Wr0ihN6nQUU-Aw"
    style="width: 100%; height: 850px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>


