<template>
  <div class="login-container">
    <div class="form-section">
      <div class="tabs-form">
        <div v-on:click="handleLogin" v-bind:class="{ active: isActive === 0 }">
          <p>Đăng nhập</p>
        </div>
        <div
          v-on:click="handleRegister"
          v-bind:class="{ active: isActive === 1 }"
        >
          <p>Đăng ký</p>
        </div>
      </div>
      <div class="login-form" v-if="isActive === 0">
        <h1>Đăng nhập</h1>
        <form @submit.prevent="login">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required />
          </div>
          <button>Đăng nhập</button>
        </form>
      </div>
      <div class="login-form" v-if="isActive === 1">
        <h1>Đăng ký</h1>
        <form @submit.prevent="register">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required />
          </div>
          <div>
            <label for="address">Địa chỉ</label>
            <input id="address" type="text" v-model="title" required />
          </div>
          <button>Đăng ký</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Login extends Vue {
  isActive = 0;
  username = "";
  password = "";
  title = "";
  login(): void {
    this.$store.dispatch("AUTH/login", {
      username: this.username,
      password: this.password,
    });

    // this.$router.push("/");
  }
  register(): void {
    console.log("this.username", this.username);
    console.log("this.password", this.password);
    this.$store.dispatch("AUTH/register", {
      username: this.username,
      password: this.password,
      title: this.title,
    });
    this.isActive = 0;
    this.username = "";
    this.password = "";
    // this.$router.push("/");
  }
  handleLogin(): void {
    this.isActive = 0;
    this.username = "";
    this.password = "";
    this.title = "";
  }
  handleRegister(): void {
    this.isActive = 1;
    this.username = "";
    this.password = "";
    this.title = "";
  }
  get result(): void {
    return this.$store.state.AUTH.user;
  }
}
</script>

<style lang="css" scoped src="../assets/css/login.css"></style>
<style lang="css" scoped src="../assets/css/global.css"></style>
