<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import Playground from '@/components/playground.vue';
</script>

<template>
  <div class="logos">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://getbootstrap.com/" target="_blank">
      <img src="/bootstrap.svg" class="logo" alt="Bootstrap logo" />
    </a>
  </div>
  <!-- <HelloWorld msg="Vite + Vue + Bootstrap" /> -->
  <Playground />

  <div class="app-footer">
    <hr />
    <div class="content">Copyright {{ new Date().getFullYear().toString() }}</div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  will-change: filter;
  transition: filter 300ms;
}
a {
  &:not(:first-child) {
    .logo {
      margin-left: 3rem;
    }
  }
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.75rem;
  padding: 0.5rem;
  text-align: left;
  opacity: 0.7;
  .content {
    margin-top: 0.5rem;
  }
}
</style>
