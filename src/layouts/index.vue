<script setup lang="ts">
import ToggleDark from '@/components/utils/ToggleDark.vue'
</script>

<template>
  <nav class="w-full flex flex-row justify-between items-center py-4 px-6">
    <strong>VIRO</strong>

    <router-link :to="{ name: 'home' }">{{ $t('Home') }}</router-link>

    <div class="flex items-center justify-center gap-4">
      <ToggleDark></ToggleDark>
    </div>
  </nav>
  <div class="flex flex-col items-center py-4 mt-6">
    <router-view></router-view>
  </div>
</template>
