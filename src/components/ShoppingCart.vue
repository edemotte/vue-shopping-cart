<template>
  <div>
    <header>
      <h1>{{ appTitle }}</h1>
      <!-- button show -->
      <button class="my-cart" @click.stop="openCartModal()">
        My Cart ({{ this.$store.state.cartLength }})
      </button>
    </header>

    <CartModal ref="cartModal" />

    <div class="grid">
      <div class="">
        <div class="products">
          <div class="products-my-cart">
            <h2>Products</h2>
          </div>
          <ul class="products-list">
            <li
              class="product"
              v-for="(prod, ind) in products"
              :key="'ind-' + ind"
            >
              <div class="box">
                <div class="image">
                  <!-- <img :src="getImgUrl(prod.image)" alt="" /> -->
                  <VueSlickCarousel v-bind="settings">
                    <div v-for="image in prod.images" :key="image.id">
                      <img :src="getImgUrl(image)" alt="" />
                    </div>
                  </VueSlickCarousel>
                </div>
                <h3 class="title">{{ prod.title }}</h3>
                <p class="price">{{ prod.price | currency }}</p>
                <button @click="addToCart(prod)">Add to cart</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/ShoppingCart.scss";
</style>

<script>
import CartModal from "./CartModal.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  components: {
    CartModal,
    VueSlickCarousel,
  },
  data() {
    return {
      appTitle: "My Shop",
      showModal: false,
      settings: {
        mobileFirst: true,
        dots: true,
        arrows: false,
        fade: true,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
      products: [
        {
          id: 1,
          title: "Product One",
          price: 10.5,
          images: [
            "boy_brow_open_brown_main.jpg",
            "SuperPack_ShopGrid_1_main.jpg",
          ],
        },
        {
          id: 2,
          title: "Product Two",
          price: 10,
          images: [
            "solution.jpg",
            "SuperPack_ShopGrid_1_main.jpg",
            "cloud_paint_dawn_crunchy_hover.jpg",
          ],
        },
        {
          id: 3,
          title: "Product Three",
          price: 5.5,
          images: ["solution.jpg", "cloud_paint_dawn_crunchy_hover.jpg"],
        },
        {
          id: 4,
          title: "Product Four",
          price: 20.0,
          images: [
            "SP_-_hover.jpg",
            "SuperPack_ShopGrid_1_main.jpg",
            "cloud_paint_dawn_crunchy_hover.jpg",
          ],
        },
        {
          id: 5,
          title: "Product Five",
          price: 4.5,
          images: [
            "SuperPack_ShopGrid_1_main.jpg",
            "SP_-_hover.jpg",
            "cloud_paint_dawn_crunchy_hover.jpg",
          ],
        },
        {
          id: 6,
          title: "Product Six",
          price: 5.5,
          images: [
            "cloud_paint_dawn_crunchy_hover.jpg",
            "SP_-_hover.jpg",
            "solution.jpg",
          ],
        },
        {
          id: 7,
          title: "Product Seven",
          price: 10.5,
          images: [
            "cloud_paint_dawn_crunchy_hover.jpg",
            "SP_-_hover.jpg",
            "solution.jpg",
          ],
        },
        {
          id: 8,
          title: "Product Eight",
          price: 10.5,
          images: ["solution.jpg", "SP_-_hover.jpg", "solution.jpg"],
        },
        {
          id: 9,
          title: "Product Nine",
          price: 10.5,
          images: [
            "cloud_paint_dawn_crunchy_hover.jpg",
            "SP_-_hover.jpg",
            "solution.jpg",
          ],
        },
        {
          id: 10,
          title: "Product Ten",
          price: 100.5,
          images: [
            "boy_brow_open_brown_main.jpg",
            "SP_-_hover.jpg",
            "solution.jpg",
          ],
        },
      ],
      cart: [],
      total: 0,
    };
  },
  methods: {
    updateCartLength() {
      try {
        this.$store.commit(
          "updateCartLength",
          JSON.parse(localStorage.getItem("cartItems")).length
        );
      } catch (error) {
        console.log("Error updating cart length", error);
      }
    },
    getImgUrl(imageName) {
      return require(`../assets/images/${imageName}`);
    },
    openCartModal() {
      // console.log(this.$refs.cartModal);
      this.$refs.cartModal.show();
    },
    addToCart(prod) {
      //get current state of cart from local storage
      if (localStorage.getItem("cartItems").length > 0) {
        try {
          this.cart = JSON.parse(localStorage.getItem("cartItems"));
          this.total = JSON.parse(localStorage.getItem("total"));
        } catch (error) {
          console.log("Error getting cart items length", error);
        }
      }
      // console.log("cart items length", localStorage.getItem("cartItems").length);
      // Increment total price
      this.total += prod.price;

      let inCart = false;

      // Update quantity if the item is already in the cart
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === prod.id) {
          inCart = true;
          this.cart[i].quantity++;
          break;
        }
      }

      if (!inCart) {
        this.cart.push({
          id: prod.id,
          title: prod.title,
          price: prod.price,
          quantity: 1,
        });
      }

      // this.$store.commit("addToCart", this.cart);
      // this.$store.commit("addToCart", this.total);
      localStorage.setItem("cartItems", JSON.stringify(this.cart));
      localStorage.setItem("total", JSON.stringify(this.total));
      this.updateCartLength();
      window.dispatchEvent(
        new CustomEvent("cartItems-key-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("cartItems"),
          },
        })
      );
      window.dispatchEvent(
        new CustomEvent("cartTotal-key-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("total"),
          },
        })
      );
    },
  },
  mounted() {
    console.log("mounted!");
    localStorage.setItem("cartItems", []);
  },
  filters: {
    currency(price) {
      return "$" + price.toFixed(2);
    },
  },
};
</script>
