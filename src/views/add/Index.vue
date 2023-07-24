

<template>
  <main>
    地址add一级路由
    <button @click="login">登录</button>
    <button @click="logout">退出登录</button>
  </main>
  <RouterView />
</template>

<script setup>
import { login, logout  } from '../../utils/user/index'

</script>
