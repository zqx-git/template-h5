export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      id: 1,
      name: '',
      num: 1,
      token: ''
    })
    const token = ref('')

    const doubleUser = computed(() => user.value.num * 2)

    function setUser() {
      user.value.name = '小明'
      console.log(user.value)
    }

    return { user, token, doubleUser, setUser }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          // key: 'user',
          storage: localStorage,
          paths: ['user', 'token']
        }
      ]
    }
  }
)
