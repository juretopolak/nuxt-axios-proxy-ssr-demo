<template>
  <div class="container">
    <div>
      <h3>nuxt-axios-proxy-ssr-demo</h3>
      <p v-for="product in products" :key="product.ean">
        {{ product.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products.products
    }
  },

  // mounted() {
  //   this.$store.dispatch('products/fetchProducts')
  // },

  async fetch() {
    await this.$store.dispatch('products/fetchProducts').then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error.response)
      }
    )
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
