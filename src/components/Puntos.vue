<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PuntoXy } from '@/typings'

defineProps<{
  elements: PuntoXy[]
}>()

</script> 

<template>
  
    <div v-for="(element, index) in elements" :key="index">
        <div> {{ element.nombre }}</div>
        <div> {{ element.latitud }}</div>
        <div> {{ element.longitud }}</div>
    </div>
</template>