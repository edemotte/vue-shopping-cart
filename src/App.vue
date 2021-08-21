<template>
  <div id="app">
    <ShoppingCart />
  </div>
</template>

<script>
import ShoppingCart from "./components/ShoppingCart.vue";

export default {
  name: "App",
  components: {
    ShoppingCart,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
