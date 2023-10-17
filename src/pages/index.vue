<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <img class="w-sm mb-6" src="@/assets/images/logo.svg" />
  <HelloWorld :msg="$t('Hello!')" />
</template>
