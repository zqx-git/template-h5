<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/add">add</RouterLink>
        <RouterLink to="/address">address</RouterLink>
        <RouterLink to="/404">404</RouterLink>
        <RouterLink to="/403">403</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
// import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
header {
  max-height: 100vh;
  line-height: 1.5;
}
.logo {
  display: block;
  margin: 0 auto 200px;
}
.navcsj {
  margin-top: 200px;
  width: 100%;
  text-align: center;
  font-size: 12px;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 100px;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 200px 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    margin-left: -100px;
    margin-top: 100px;
    padding: 100px 0;
    text-align: left;
    font-size: 100px;
  }
}
</style>
