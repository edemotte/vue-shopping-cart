import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // cart: [],
    // total: 0,
    cartLength: 0,
  },
  mutations: {
    // addToCart(state, item) {
    //   state.cart.push(item);
    // },
    updateCartLength(state, cartLength) {
      state.cartLength = cartLength;
    },
  },
});
