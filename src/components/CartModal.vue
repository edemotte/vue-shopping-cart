<template>
  <div class="modal-vue">
    <!-- overlay -->
    <div
      class="overlay"
      v-if="cartModalVisible"
      @click="cartModalVisible = false"
    ></div>

    <!-- modal -->
    <div class="modal" v-if="cartModalVisible">
      <button class="close" @click="cartModalVisible = false">x</button>
      <div class="cart">
        <h2>Your Cart</h2>
        <table class="cart-list" v-if="cart.length">
          <!-- else show cart is empty -->
          <thead>
            <tr>
              <th class="head-title">Product</th>
              <th class="head-price">Price</th>
              <th class="head-quantity">Quantity</th>
              <th class="head-total">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr class="cart-item" v-for="(item, id) in cart" :key="'id-' + id">
              <td>
                <h4 class="title">{{ item.title }}</h4>
              </td>
              <td>
                <div class="price">{{ item.price | currency }}</div>
              </td>
              <td>
                <div class="quantity">
                  {{ item.quantity
                  }}<span class="qty-handler"
                    ><span @click="add(item)">+</span
                    ><span @click="sub(item)">-</span></span
                  >
                </div>
              </td>
              <td>
                <div class="total">
                  {{ (item.price * item.quantity) | currency }}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3">
                <h4 class="total-title">Total</h4>
              </th>
              <th>{{ total | currency }}</th>
            </tr>
          </tfoot>
        </table>
        <div v-else>
          <h3>Cart is Empty!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartModal",
  data() {
    return {
      cartModalVisible: false,
      cart: [],
      total: JSON.parse(localStorage.total),
    };
  },
  methods: {
    show() {
      this.cartModalVisible = true;
    },
    hide() {
      this.cartModalVisible = false;
    },
    add(item) {
      this.total += item.price;
      item.quantity++;
      localStorage.setItem("total", JSON.stringify(this.total));
      this.updateCartLength();
    },
    sub(item) {
      this.total -= item.price;
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            // console.log(
            localStorage.setItem("cartItems", JSON.stringify(this.cart));
            // );
            this.updateCartLength();
            break;
          }
        }
      }
      localStorage.setItem("total", JSON.stringify(this.total));
    },
    updateCartLength() {
      try {
        this.$store.commit(
          "updateCartLength",
          JSON.parse(localStorage.getItem("cartItems")).length
        );
      } catch (error) {
        console.log("Could not update cart length", error);
      }
    },
  },
  mounted() {
    window.addEventListener("cartItems-key-localstorage-changed", (event) => {
      try {
        this.cart = JSON.parse(event.detail.storage);
      } catch (error) {
        console.log("Error while getting cart data from local storage", error);
      }
    });
    window.addEventListener("cartTotal-key-localstorage-changed", (event) => {
      try {
        this.total = JSON.parse(event.detail.storage);
      } catch (error) {
        console.log("Error getting cart total data from local storage", error);
      }
    });
  },
  filters: {
    currency(price) {
      return "$" + price.toFixed(2);
    },
  },
};
</script>
