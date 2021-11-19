<template>
  <div class="book">
    <h1 class="title">{{ book.name }}</h1>
    <p class="book_author">Автор: {{ book.author }}</p>
    <p class="book_library">Библиотека: {{ book.library }}</p>
    <p class="book_price">Цена: {{ book.price }}$</p>
    <p class="book_qty">Кол-во {{ book.qty }}</p>
    <input type="number" v-model="qty" />
    <button
      v-if="this.$store.getters.info.role == undefined"
      @click="addLocalStorage"
    >
      в корзину
    </button>
    <button v-if="this.$store.getters.info.role == 'user'" @click="addCart">
      в корзину
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import Toast from "vue-easy-toast";
Vue.use(Toast);

import { getQty } from "../helpers/qtyHelper";
import { addCart, openBook } from "../services/bookService";

export default {
  name: "book",
  data() {
    return {
      book: {
        name: "",
        qty: 0,
      },
      qty: 1,
    };
  },
  methods: {
    test() {
      Vue.toast("Предупреждение!!!");
    },
    getQty: getQty,
    addCart() {
      if (this.book.qty - this.qty >= 0) {
        addCart(this);
        this.book.qty = this.book.qty - this.qty;
      } else {
        console.log("Товар закончился");
      }
    },
    addLocalStorage() {
      var desired = localStorage.getItem("desired");
      if (desired == null) {
        var desired = {
          arrayDesired: [
            {
              id: this.$route.query.book,
              qty: this.qty,
            },
          ],
        };
      } else {
        desired = JSON.parse(desired);
        if (this.checkDesired(desired.arrayDesired, this.book.id)) {
          for (var i = 0; i < desired.arrayDesired.length; i++) {
            if (desired.arrayDesired[i].id == this.book.id) {
              this.book.qty = this.book.qty - this.qty;
              if (this.book.qty >= 0) {
                desired.arrayDesired[i].qty =
                  desired.arrayDesired[i].qty + Number(this.qty);
              } else {
                this.book.qty = this.book.qty + Number(this.qty);
              }
            }
          }
        } else {
          this.book.qty = this.book.qty - this.qty;
          if (this.book.qty >= 0) {
            desired.arrayDesired.push({
              id: this.book.id,
              qty: this.qty,
            });
          } else {
            this.book.qty = this.book.qty + this.qty;
          }
        }
      }

      localStorage.setItem("desired", JSON.stringify(desired));
      var info = localStorage.getItem("desired");
      info = JSON.parse(info);
    },
    checkDesired(array, id) {
      let reply = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i].id == id) {
          reply = true;
          break;
        }
      }
      return reply;
    },
  },
  async created() {
    await openBook(this);
    this.book.qty = getQty(this.book.id, this.book.qty);
  },
};
</script>
