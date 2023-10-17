<route lang="yaml">
meta:
  layout: main
</route>

<script setup lang="ts">
import useUser from '@/composables/useUser'
import { ref } from 'vue'

const { user, isUserLoggedIn, setUserSession, removeUserSession } = useUser()

const userInput = ref('')
</script>

<template>
  <div class="px-4 py-8 md:px-6 lg:px-8">
    <div v-if="!isUserLoggedIn" class="text-gray-500 dark:text-gray-200 text-center flex flex-col gap-5">
      <h1 class="text-2xl mb-5">¡Join Our Community!</h1>

      <InputText v-model="userInput" class="dark:bg-gray-800" placeholder="Write your name" />
      <Button
        label="Join Now"
        class="font-bold px-5 py-3 shadow-md hover:bg-blue-800 bg-primary border-0 transition-all"
        @click="() => setUserSession(userInput)"
      ></Button>
    </div>
    <div v-else>
      <h1 class="text-2xl mb-5">¡You've Already Joined Our Community!</h1>

      <Chip :label="user" removable @remove="removeUserSession" />
    </div>
  </div>

  <router-link
    class="border border-gray-500 w-full max-w-[236px] py-2 rounded-md my-4 hover:bg-gray-700 transition"
    :to="{ name: 'index' }"
    >{{ $t('To Index') }}</router-link
  >
</template>
