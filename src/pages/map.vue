<!-- <template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="13">
    <CustomControl position="BOTTOM_CENTER">
      <button class="custom-btn" @click="sayHi">👋</button>
    </CustomControl>
  </GoogleMap>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { GoogleMap, CustomControl } from "vue3-google-map";



    const center = { lat: 35, lng: -95 };
    const sayHi = () => alert("Hi!");


</script>

<style scoped>
.custom-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}
</style> -->

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { db } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { onMounted, ref, computed } from 'vue'

import { PuntoXy } from '@/typings'

const puntosxy = ref<PuntoXy[]>([]);
const puntosF = ref<PuntoXy[]>([]);
const locations = ref<{ lat: number; lng: number }[]>([]); // Mover la declaración aquí

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

  let indices = ref<number[]>([]);
  while (indices.value.length < 4) {
    let indicesA = Math.floor(Math.random() * (puntosxy.value.length - 1 - 0 + 1)) + 0;
    if (!indices.value.includes(indicesA)) {
      indices.value.push(indicesA);
    }
  }

  indices.value.forEach((element) => console.log(element))

  for (let i = 0; i < 4; i++) {
    puntosF.value.push(puntosxy.value[indices.value[i]])
  }


  // Actualizar locations después de que puntosF.value se haya llenado
  locations.value = [
  { lat: parseFloat(puntosF.value[0].latitud), lng: parseFloat(puntosF.value[0].longitud) },
  { lat: parseFloat(puntosF.value[1].latitud), lng: parseFloat(puntosF.value[1].longitud) },
  { lat: parseFloat(puntosF.value[2].latitud), lng: parseFloat(puntosF.value[2].longitud) },
  { lat: parseFloat(puntosF.value[3].latitud), lng: parseFloat(puntosF.value[3].longitud) },
];

  console.log('so' + locations.value);
}

onMounted(() => {
  getPuntos()
})
const center = computed(() => {
  return { lat: 4.1488976313196835, lng: -73.62845863205662 };
});
</script>

<template>
  <body 
    class="fixed top-0 left-0 w-full h-full bg-cover bg-center"
    style="background-image: url('/src/assets/images/bg.jpg')">
    <section class="h-1/5 flex">
      <router-link class="bg-black rounded-lg h-1/3 w-20 my-10 mx-5" :to="{ name: 'index' }">
        <i class="pi pi-chevron-left mt-4" style="color: aliceblue"></i>
      </router-link>
    </section>
    <GoogleMap
      api-key="tuapikey"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="7.4"
    >
      <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
    </GoogleMap>
  </body>
</template>



