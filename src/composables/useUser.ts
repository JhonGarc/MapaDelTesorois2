import { useUserStore } from '@/store/userStore'
import { storeToRefs } from 'pinia'

const useUser = () => {
  const store = useUserStore()
  const { user, isUserLoggedIn } = storeToRefs(store)

  function setUserSession(user: string) {
    store.setUser(user)
  }

  function removeUserSession() {
    store.setUser('')
  }

  return {
    user,
    isUserLoggedIn,
    setUserSession,
    removeUserSession,
  }
}

export default useUser
