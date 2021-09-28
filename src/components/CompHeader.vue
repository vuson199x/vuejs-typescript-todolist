<template>
  <div class="nav" v-if="result">
    <ul>
      <li>
        <router-link to="/" active-class="active" exact="">Home</router-link>
      </li>

      <li>
        <router-link
          :to="`/tags/${result ? result.id : 1}`"
          active-class="active"
          >Tags</router-link
        >
      </li>
      <li>
        <router-link
          :to="`/category/${result ? result.id : 1}`"
          active-class="active"
          >Category</router-link
        >
      </li>
      <li>
        <router-link
          :to="`/product/${result ? result.id : 1}`"
          active-class="active"
          >Product</router-link
        >
      </li>
      <li style="float: right" active-class="active" v-on:click="Logout">
        <router-link to="/login">Đăng xuất</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../utils/interface";

@Component
export default class CompHeader extends Vue {
  isAuth = "";
  Logout(): void {
    this.$store.dispatch("AUTH/logout");
  }

  get result(): User {
    return this.$store.state.AUTH.user;
  }
}
</script>

<style lang="css" scoped src="../assets/css/header.css"></style>
