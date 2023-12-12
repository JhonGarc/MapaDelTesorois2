<script setup lang="ts">
import { ref, onMounted,watch, computed } from 'vue'
import { getStorage, ref as storageRef, listAll, getDownloadURL, Reference } from 'firebase/storage'
import { useRouter } from 'vue-router'
const router = useRouter()
const visible = ref(false);
const { clave, acertijo } = defineProps(['clave', 'acertijo']);
const storage = getStorage()
const imagesRef = storageRef(storage, '/') // Ruta del directorio donde se encuentran las imágenes
console.log("riddle: " , localStorage.getItem("currentRiddle"))
const riddle = JSON.parse(localStorage.getItem("currentRiddle") || "")
const inputPalabra = ref('');
let imageUrls = ref<string[]>([])
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
])

async function fetchImages() {
  try {
    const result = await listAll(imagesRef)

    // Recorre la lista de elementos y obtén las URLs de descarga
    const promises = result.items.map(async (item: Reference) => {
      const url = await getDownloadURL(item)
      return url
    })

    // Espera a que todas las promesas se resuelvan
    imageUrls.value = await Promise.all(promises)
  } catch (error) {
    console.error('Error al obtener las URLs de las imágenes', error)
  }
}

onMounted(() => {
  fetchImages()
})

watch(acertijo, async (newAcertijo, oldQuestion) => {
  console.log(newAcertijo)
})


const dataAcertijo = ref({
  clave: '',
  key: riddle.key,
});



const verificarPalabra = () => {
  if(dataAcertijo.value.clave === dataAcertijo.value.key){
    alert("Haz completado el reto")
    router.push({ name: 'map' });
  }else{
    alert("No es la palabra correcta")
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/src/assets/images/bg.jpg')">
    <section class="absolute top-2 left-5">
      <router-link class="bg-black rounded-xl w-20 p-1" :to="{ name: 'map' }">
        <i class="pi pi-chevron-left text-white"></i>
      </router-link>
    </section>
    
    <div class="bg-[#b9a999] w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mx-7 p-4 rounded-xl backdrop-blur-md bg-opacity-50">
      <p class="text-3xl  md:text-4xl lg:text-5xl font-bold mb-4">Resuelve  el  acertijo</p>
      <p class="text-base font-sans sm:text-lg md:text-base lg:text-lg mb-4">{{ riddle.riddle }}</p>
      <InputText ref="inputPalabra" class="p-inputtext-lg w-full mb-4" type="text" placeholder="Digita aquí" v-model="dataAcertijo.clave"/>
  <div class="card flex justify-center my-4">
    <button class="bg-[#ead297] w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg text-3xl text-black" @click="verificarPalabra">
      {{ $t('Verificar') }}
    </button>
  </div> 
  <Button label="¿Necesitas ayuda?"  class="font-sans my-1" @click="visible = true" />

<Dialog class="bg-[#ccba8d]" v-model:visible="visible" modal header="PISTA" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <p>
       {{ riddle.pista }}
    </p>
</Dialog>
      <div class="bg-[#585858] p-4 rounded-xl">
        <p class="text-white text-lg mb-2">¡Puedes visitar estos lugares!</p>
        <div class="card my-2 mx-2">
          <Galleria
            :value="imageUrls"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            containerStyle="max-width: 740px"
          >
            <template #item="slotProps">
              <img :src="slotProps.item" alt="Imagen" class="w-full h-48 object-cover rounded" />
            </template>
          </Galleria>
        </div>
      </div>
    </div>
  </div>
</template> 
