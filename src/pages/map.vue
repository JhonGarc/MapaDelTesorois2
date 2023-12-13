<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { db } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { onMounted, ref, computed } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { PuntoXy } from '@/typings'
import { useRouter } from 'vue-router'
const logoutDialogVisible = ref(false);

function showLogoutDialog() {
  logoutDialogVisible.value = true;
}

function hideLogoutDialog() {
  logoutDialogVisible.value = false;
}

function logout() {
  // Lógica para cerrar sesión
  hideLogoutDialog();
  router.push({ name: 'index' });
}

const router = useRouter()
const puntosxy = ref<PuntoXy[]>([])
const puntosF = ref<PuntoXy[]>([])
const locations = ref<{ lat: number; lng: number }[]>([]) // Mover la declaración aquí

const contador = ref(0)
const longitud = ref(0)
const position = ref('center')
const visible = ref(false)
const auth = getAuth()
const openPosition = (pos) => {
  position.value = pos
  visible.value = true
}



async function getPuntos() {
  const colRef = collection(db, 'puntos')
  const querySnap = await getDocs(colRef)

  querySnap.forEach((doc) => {
    puntosxy.value.push(doc.data() as PuntoXy)
  })

  let indices = ref<number[]>([])
  while (indices.value.length < 4) {
    let indicesA = Math.floor(Math.random() * (puntosxy.value.length - 1 - 0 + 1)) + 0
    if (!indices.value.includes(indicesA)) {
      indices.value.push(indicesA)
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
  ]

  console.log('so' + locations.value)
}

onMounted(() => {
  getPuntos()
})
const center = computed(() => {
  return { lat: 4.1488976313196835, lng: -73.62845863205662 }
})

function ubicacion() {
  const ubicacioness = [
    { nombre: 'punto 1', latitud: '4.124108489012096', longitud: '-73.6215742713069', acertijo: '', clave: '' , pista:'' },
    { nombre: 'punto 2', latitud: '4.1321312324108489012096', longitud: '-73.6215742713069', acertijo: '', clave: '', pista:''},
    { nombre: 'punto 3', latitud: '4.312312124108489012096', longitud: '-73.6215742713069', acertijo: '', clave: '' , pista:''},
    {
      nombre: puntosF.value[0]?.nombre?.toString(),
      latitud: puntosF.value[0]?.latitud?.toString(),
      longitud: puntosF.value[0]?.longitud?.toString(),
      acertijo: puntosF.value[0].acertijo,
      clave: puntosF.value[0].clave,
      pista: puntosF.value[0].pista,
    },
    {
      nombre: puntosF.value[1]?.nombre?.toString(),
      latitud: puntosF.value[1]?.latitud?.toString(),
      longitud: puntosF.value[1]?.longitud?.toString(),
      acertijo: puntosF.value[1].acertijo,
      clave: puntosF.value[1].clave,
      pista: puntosF.value[1].pista,
    },
    {
      nombre: puntosF.value[2]?.nombre?.toString(),
      latitud: puntosF.value[2]?.latitud?.toString(),
      longitud: puntosF.value[2]?.longitud?.toString(),
      acertijo: puntosF.value[2].acertijo,
      clave: puntosF.value[2].clave,
      pista: puntosF.value[2].pista,
    },
    {
      nombre: puntosF.value[3]?.nombre?.toString(),
      latitud: puntosF.value[3]?.latitud?.toString(),
      longitud: puntosF.value[3]?.longitud?.toString(),
      acertijo: puntosF.value[3].acertijo,
      clave: puntosF.value[3].clave,
      pista: puntosF.value[3].pista,
    },
  ]

  let punto = Math.floor(Math.random() * (ubicacioness.length - 1 - 0 + 1)) + 0

  if (
    puntosF.value.some(
      (item) =>
        item.nombre === ubicacioness[punto].nombre &&
        item.latitud === ubicacioness[punto].latitud &&
        item.longitud === ubicacioness[punto].longitud,
    )
  ) {
    alert('Felicidades has llegado a tu destino, estas en ' + ubicacioness[punto].nombre)
    const riddle = {
      key: ubicacioness[punto].clave,
      riddle: ubicacioness[punto].acertijo,
      pista: ubicacioness[punto].pista
    }
    puntosF.value = puntosF.value.filter(item => item.nombre !== ubicacioness[punto].nombre);

    // // Actualizar locations después de eliminar el punto
    
    
   
    //console.log(ubicacioness[punto].acertijo);
    localStorage.setItem('currentRiddle', JSON.stringify(riddle))
    locations.value = puntosF.value.map(item => ({ lat: parseFloat(item.latitud), lng: parseFloat(item.longitud) }));

    console.log("hola" , contador.value);
  } else {
    alert('Todavia no has llegado a tu destino')
  }


}

</script>

<template>
  <body class="fixed top-0 left-0 w-full h-full bg-cover bg-center" style="background-image: url('/src/assets/images/bg.jpg')">
    <section class="sm:h-1/5 flex">
      <router-link class="bg-black rounded-lg h-1/3 w-20 my-2 mx-2 sm:my-10 sm:mx-5" :to="{ name: 'index' }">
        <i class="pi pi-chevron-left mt-2 sm:mt-4" style="color: aliceblue"></i>
      </router-link>
    </section>
    <div class="mx-auto w-full sm:w-1/2 mt-5 sm:mt-10 mb-5 border-4 border-black rounded-lg relative h-850" style="width: 90%; max-width: 600px; height: 650px;">
      <GoogleMap
        api-key="AIzaSyBhDknILN83Fc8eLama7Wr0ihN6nQUU-Aw"
        :center="center"
        :zoom="7.4"
        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
      >
        <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
      </GoogleMap>
      <button @click="ubicacion" class="bg-[#ccba8d] rounded-lg text-lg sm:text-3xl text-black p-2 absolute bottom-5 left-5 w-32 sm:w-57 md:w-68 lg:w-83 xl:w-60">
        {{ $t('Verificar ubicación') }}
      </button>
    </div>
    <div class="absolute top-2 right-2 sm:top-5 sm:right-5">
      <button @click="showLogoutDialog" class="bg-[#ccba8d] rounded-lg text-xl sm:text-3xl text-black p-2">
        {{ $t('Cerrar sesión') }}
      </button>
    </div>
    <Dialog
      v-model:visible="logoutDialogVisible"
      header="Cerrar Sesión"
      :style="{ width: '80%', sm: '70%', md: '50%', lg: '40%', xl: '30rem' }"
      :modal="true"
      :draggable="false"
    >
      <p class="m-auto">¿Estás seguro de que deseas cerrar sesión?</p>
      <template #footer>
        <Button label="Sí" icon="pi pi-check" @click="logout" />
        <Button label="No" icon="pi pi-times" @click="hideLogoutDialog" autofocus />
      </template>
    </Dialog>
  </body>
</template>


