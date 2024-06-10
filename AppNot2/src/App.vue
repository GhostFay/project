<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/log.png" width="30" height="30" />
    <nav>
      <RouterLink to="/CreateView"><button>Add New Post +  </button></RouterLink>
    </nav>
  </header>
  <main></main>
  <RouterView />
</template>

<style scoped>
body{
  background-image: url(../src/assets/img.jpg);
}
header {
  display: flex;
  justify-content: center;
  margin: 20px;
}

nav {
  margin: auto;
}

nav button {
  color: #ffffff;
  font-weight: bold;
  margin-right: 5px;
  text-decoration: none;
  padding: 6px;
  background-color: orangered;
  border-radius: 3px;
}

nav button:hover {
  color: rgb(23, 212, 6);
}
</style>
