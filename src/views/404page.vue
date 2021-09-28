<template>
  <div class="error">
    <h3>Errors</h3>
    <p>Have some error....</p>
    <button class="button success" v-on:click="$router.push('/')">
      Back to home
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.error {
  text-align: center;
}
</style>
