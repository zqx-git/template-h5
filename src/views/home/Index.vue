<template>
  <main>
    <h1>首页</h1>
    <div class="box"></div>
    <van-button />
    {{ userStore.doubleUser }}
    <HelloWorld />
    <van-button type="primary" @click="ccc"> num++ </van-button>
    <van-button type="primary" @click="aaa"> 说你好 {{ a }}</van-button>
    <van-button type="primary" @click="bbb"> 登录 {{ a }}</van-button>
  </main>
  <RouterView />
</template>
<script>
export default {
  meta: {
    title: 'home11',
    isRouter: true,
    auth: false
  }
}
</script>

<script setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const a = ref('1')
function aaa() {
  console.log(userStore.user)
  showToast(userStore.user.name)
}
function bbb() {
  userStore.setUser()
}
function ccc() {
  userStore.user.num++
}
</script>

<style lang="less" scoped>
main {
  h1 {
    font-size: 26px;
    color: @blue;
  }
  .box {
    margin: 10px;
    margin-left: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid blue;
    width: 300px;
    height: 200px;
  }
}
</style>
