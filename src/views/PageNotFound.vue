<template>
  <div
    class="container d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle"
  >
    <h1 class="text-danger mb-2 display-1">404</h1>
    <h1 class="text-danger mb-4 display-6">Page Not Found</h1>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
