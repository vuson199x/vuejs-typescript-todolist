<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2>Trang chủ</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

<style>
.home {
  text-align: center;
}
.home img {
  display: block;
  margin: 0 auto;
}
</style>
