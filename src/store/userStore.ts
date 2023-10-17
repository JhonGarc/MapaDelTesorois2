import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('clients', () => {
  const user = ref<string>('')

  return {
    user,

    // Actions
    setUser(newUser: string) {
      console.log('heres ', newUser)
      user.value = newUser
    },

    // Getters
    isUserLoggedIn: computed(() => (user.value ? true : false)),
  }
})
