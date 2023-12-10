<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStorage, ref as storageRef, listAll, getDownloadURL, Reference } from 'firebase/storage'

const storage = getStorage()
const imagesRef = storageRef(storage, '/') // Ruta del directorio donde se encuentran las imágenes

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
</script>

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
    <div class="bg-[#b9a999] w-full flex flex-wrap p-4 h-[100vh] mx-2">
      <div class="bg-red-100 w-4/5 mx-7">
        <p>Resuelve el acertijo</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatum voluptatem natus ad quam a
          inventore eum velit numquam quae? Nam voluptatum maxime rerum blanditiis quaerat amet similique! Voluptatum,
          magni.
        </p>
        <InputText type="text" placeholder="Digita aquí" />
        <InputText type="text" placeholder="Digita aquí" />
        <div class="card flex justify-content-center">
          <Button label="Submit" />
        </div>
        <p>¿Necesitas ayuda?</p>
        <div class="bg-[#585858]">
          <p class="text-white">¡Puedes visitar estos lugares!</p>
          <div class="card my-2 mx-2">
            <Galleria
              :value="imageUrls"
              :responsiveOptions="responsiveOptions"
              :numVisible="5"
              containerStyle="max-width: 640px"
            >
              <template #item="slotProps">
                <img :src="slotProps.item" alt="Imagen" style="width: 100%; height: 300px; object-fit: cover" />
              </template>
            </Galleria>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
