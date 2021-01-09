export const state = () => ({
  products: []
})

export const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await this.$axios.get(
        '/fakerapi/products' // remove 'fakerapi' to make it work with SSR
      )
      console.log(response)
      commit('setProducts', response.data.data)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const mutations = {
  setProducts(state, products) {
    state.products = products
  }
}
