const obj = {
  a: 1
}
export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      id: 1,
      name: '',
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
          // 自定义存储的 key，默认是 store.$id
          key: `${obj.a}user`,
          // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
          storage: localStorage,
          // state 中的字段名，按组打包储存
          paths: ['user']
        },
        {
          // 自定义存储的 key，默认是 store.$id
          // key: 'custom storageKey',
          // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
          // storage: localStorage,
          // state 中的字段名，按组打包储存
          paths: ['token']
        }
      ]
    }
  }
)
