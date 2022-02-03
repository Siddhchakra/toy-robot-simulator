<template>
  <div class="container d-flex flex-column justify-content-center align-items-center">
    <img class="mb-5" alt="Vue logo" src="./../assets/toy-robot.jpg" />
    <h1>Welcome to Toy Robot Simulator</h1>
    <router-link class="btn btn-primary shadow mt-3" to="/simulator">Click to Enter</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
