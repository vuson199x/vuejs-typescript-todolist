<template>
  <div id="app">
    <CompHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CompHeader from "@/components/CompHeader.vue"; // @ is an alias to /src

@Component({
  components: {
    CompHeader,
  },
})
export default class App extends Vue {
  isAuth = "";
  created(): void {
    this.isAuth = this.$store.state.AUTH.user;
  }
  updated(): void {
    this.isAuth = this.$store.state.AUTH.user;
  }
}
</script>

<style lang="css" scoped src="@/assets/css/global.css"></style>
